import Repository from "./Repository";

class CommentRepository extends Repository {

    constructor() {
        super('Comment');
    }

    /**
     * Finds a comment by its ID
     * This overrides the base repository function
     * @param id
     * @param db
     * @returns {Promise}
     */
    findById(id, db) {
        return new Promise((resolve, reject) => {
            db.model(this.model).findOne({_id: id}).populate('post_id').exec(function (err, model) {
                if (err) {
                    reject(err);
                }
                resolve(model);
            });
        });
    }

}

export default CommentRepository;