/**
 * This is the generic repository for Bookshelf
 * A model is passed in when instantiating
 * eg. new Repository('User')
 */

export default class Repository {

    constructor(model) {
        this.model = model;
    }

    all(db) {
        return db.models[this.model].fetchAll();
    }

    /**
     * a standard function will be findById
     * id is the id of the user you want to find
     * db is the db instance created
     */
    findById(id, db) {
        return db.models[this.model].forge({id: id}).fetch();
    }

    create(data, db) {
        return new Promise((resolve, reject) => {
            const model = db.models[this.model].forge(data);
            model.save().then(function (saved) {
                resolve(saved);
            });
        });
    }

    update(id, data, db) {
        return new Promise((resolve, reject) => {
            const model = db.models[this.model].forge({id: id});
            model.save(data, {patch: true}).then(function (updated) {
                resolve(updated);
            });
        });
    }

    delete(id, db) {
        return db.models[this.model].forge({id: id}).fetch()
            .then(function(model) {
                return model.destroy();
            });
    }

}