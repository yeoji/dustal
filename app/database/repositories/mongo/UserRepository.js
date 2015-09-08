/**********************************
 * USER REPOSITORY
 * - FUNCTIONS:
 *      - findById(id, db);
 *      - findByEmail(email, db);
 *      - createUser(user, db);
 **********************************/

export default {
    /**
     * a standard function will be findById
     * id is the id of the user you want to find
     * db is the db instance created
     */
    findById: function (id, db) {
        return new Promise(function (resolve, reject) {
            db.model('User').findOne({_id: id}, function (err, model) {
                if (err) {
                    reject(err);
                }
                resolve(model);
            });
        });
    },

    findByEmail: function (email, db) {
        return new Promise(function (resolve, reject) {
            db.model('User').findOne({email: email}, function (err, model) {
                if (err) {
                    reject(err);
                }
                resolve(model);
            });
        });
    },

    createUser: function (user, hash, db) {
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