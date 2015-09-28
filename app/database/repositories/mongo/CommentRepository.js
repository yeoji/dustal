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

    /**
     * Deletes all comments with the specified post id
     * @param post_id
     * @param db
     */
    deleteByPost(post_id, db) {
        return new Promise((resolve, reject) => {
           db.model(this.model).remove({post_id: post_id}, function (err) {
               if (err) {
                   reject(err);
               }
               resolve(true);
           });
        });
    }

}

export default CommentRepository;