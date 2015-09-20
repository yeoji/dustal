import Repository from "./Repository";

class BlogRepository extends Repository {

    constructor() {
        super('Blog');
    }

    /**
     * Finds a blog by its unique name
     * @param name
     * @param db
     * @returns {Promise}
     */
    findByName(name, db) {
        return new Promise((resolve, reject) => {
            db.model(this.model).findOne({name: name}, function (err, model) {
                if (err) {
                    reject(err);
                }
                resolve(model);
            });
        });
    }

}