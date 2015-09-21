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

import Repository from "./Repository";

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

    findByMobileNo(mobile, db) {
        return new Promise(function (resolve, reject) {
            db.model('User').findOne(function () {
                return ((this.mobile.country_code + this.mobile.number) == mobile);
            }).populate('blogs').exec(function (err, model) {
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
            const newUser = new userSchema({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
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
}

export default UserRepository;