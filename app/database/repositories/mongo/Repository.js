/**
 * This is the generic repository for Mongo
 * A model is passed in when instantiating
 * eg. new Repository('User')
 */

export default class Repository {

    constructor(model) {
        this.model = model;
    }

    all(db) {
        return new Promise((resolve, reject) => {
            db.model(this.model).find({}, function(err, models) {
                if(err) {
                    reject(err);
                }
                resolve(models);
            });
        });
    };

    /**
     * a standard function will be findById
     * id is the id of the user you want to find
     * db is the db instance created
     */
    findById(id, db) {
        return new Promise((resolve, reject) => {
            db.model(this.model).findOne({_id: id}, function (err, model) {
                if (err) {
                    reject(err);
                }
                resolve(model);
            });
        });
    }

    create(data, db) {
        return new Promise((resolve, reject) => {
            const schema = db.model(this.model);
            const model = new schema(data);
            model.save(function (err) {
                if (err) {
                    reject(err);
                }
                resolve(model);
            });
        });
    }

    update(id, data, db) {
        return new Promise((resolve, reject) => {
            db.model(this.model).update({_id: id}, data, {}, function (err, raw) {
                if (err) reject(err);
                resolve(raw);
            });
        });
    }

    delete(id, db) {
        return new Promise((resolve, reject) => {
            db.model(this.model).findOne({_id: id}, function (err, model) {
                if (err) {
                    reject(err);
                }
                resolve(model.remove(function() {}));
            });
        });
    }

}