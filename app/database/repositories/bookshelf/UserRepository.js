/**********************************
 * USER REPOSITORY
 * - FUNCTIONS:
 *      - findById(id, db);
 *      - findByEmail(email, db);
 *      - create(user, hash, db);
 *      - all(db);
 *      - delete(id, db);
 **********************************/

export default {
    /**
     * a standard function will be findById
     * id is the id of the user you want to find
     * db is the db instance created
     */
    findById: function (id, db) {
        return db.models.User.forge({id: id}).fetch();
    },

    findByEmail: function (email, db) {
        return db.models.User.forge({email: email}).fetch();
    },

    create: function (user, hash, db) {
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
    },
    /**
     * Fetch all models
     * @param db
     */
    all: function (db) {
        return db.models.User.fetchAll();
    },

    delete: function (id, db) {
        return db.models.User.forge({id: id}).fetch()
            .then(function(user) {
                return user.destroy();
            });
    }
}