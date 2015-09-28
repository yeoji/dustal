import Repository from "./Repository";
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

}

export default PostRepository;