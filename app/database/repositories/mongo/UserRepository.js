/**********************************
 * USER REPOSITORY
 * - FUNCTIONS:
 *      - findById(id, db);
 *      - findByEmail(email, db);
 *      - findByMobileNo(mobile, db);
 *      - create(user, hash, db);
 *      - all(db);
 *      - delete(id, db);
 **********************************/

import Chance from "chance";
import Repository from "./Repository";

const chance = new Chance();

class UserRepository extends Repository {

    constructor() {
        super('User');
    }

    findByEmail(email, db) {
        return new Promise(function (resolve, reject) {
            db.model('User').findOne({email: email}, function (err, model) {
                if (err) {
                    reject(err);
                }
                resolve(model);
            });
        });
    }

    findByMobileNo(code, mobile, db) {
        return new Promise(function (resolve, reject) {
            db.model('User').findOne({mobile: {
                country_code: code,
                number: mobile
            }}).populate('blogs').exec(function (err, model) {
                if (err) {
                    reject(err);
                }
                resolve(model);
            });
        });
    }

    // this overrides the create method in generic repository
    create(user, hash, db) {
        return new Promise(function (resolve, reject) {
            const userSchema = db.model('User');
            /* add verification code */
            user.mobile.verification_code = chance.natural({min: 1000, max: 9999});
            const newUser = new userSchema({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                username: user.username,
                mobile: user.mobile,
                password: hash
            });
            newUser.save(function (err) {
                if (err) {
                    reject(err);
                }
                resolve(newUser);
            });
        });
    }

    /**
     * Handles the removal of a blog_id from the user's document
     * @param user_id
     * @param blog_id
     * @param db
     */
    removeBlog(user_id, blog_id, db) {
        return new Promise((resolve, reject) => {

            this.findById(user_id, db)
                .then((user) => {
                    let blogs = user.blogs;
                    let index = blogs.indexOf(blog_id);
                    if(index >= 0) {
                        blogs.splice(index, 1);
                    }

                    this.update(user_id, {blogs: blogs}, db)
                        .then((result) => {
                            resolve(result);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                })
                .catch((err) => {
                    reject(err)
                });
        });
    }
}

export default UserRepository;