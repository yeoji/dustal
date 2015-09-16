/**********************************
 * USER REPOSITORY
 * - FUNCTIONS:
 *      - findById(id, db);
 *      - findByEmail(email, db);
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
        return db.models.User.forge({email: email}).fetch();
    }

    // this overrides the generic repository's create
    create(user, hash, db) {
        return new Promise(function (resolve, reject) {
            const newUser = db.models.User.forge({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: hash
            });
            newUser.save().then(function (savedUser) {
                resolve(savedUser);
            });
        });
    }
}

export default UserRepository;