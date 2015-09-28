import Repository from "./Repository";
import CommentRepository from "./CommentRepository";
import moment from "moment";

class PostRepository extends Repository {

    constructor() {
        super('Post');
    }

    /**
     * Finds all posts that belongs to a specific blog_id
     * @param blogId
     * @param db
     * @param day
     * @returns {Promise}
     */
    findByBlogId(blogId, db, day = false) {
        return new Promise((resolve, reject) => {
            let query = db.model(this.model).find({
                blog_id: blogId
            });

            if (day) {
                query.gte('timestamp', moment(day).startOf('day')).lt('timestamp', moment(day).endOf('day'));
            }

            query.populate('comments').exec(function (err, model) {
                if (err) {
                    reject(err);
                }
                resolve(model);
            });
        });
    }

    /**
     * Override the base repository's delete function
     * so we can remove all associated comments
     * @param id
     * @param db
     */
    delete(id, db) {
        return new Promise((resolve, reject) => {
            // delete all attached comments
            CommentRepository.deleteByPost(id, db);

            db.model(this.model).remove({_id: id}, function (err) {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    /**
     * Deletes all posts that belongs to a blog
     * @param blog_id
     * @param db
     */
    deleteByBlogId(blog_id, db) {
        return new Promise((resolve, reject) => {
            // remove all comments
            this.findByBlogId(blog_id, db)
                .then((posts) => {
                    for(var post of posts) {
                        CommentRepository.deleteByPost(post._id, db);
                    }
                });

            db.model(this.model).remove({blog_id: blog_id}, function (err) {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }

}

export default PostRepository;