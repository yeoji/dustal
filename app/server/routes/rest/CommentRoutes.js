import RESTRoutes from "./RESTRoutes";
import tokenHelper from "../tokenHelper";

export default class CommentRoutes extends RESTRoutes {

    constructor() {
        super('Comment');
    }

    // overrides the routes generation in RESTRoutes
    generateRoutes() {
        /**
         * We'll never need to list all comments, therefore index is not required
         * We'll never need to retrieve info on a specific comment, therefore show is not required
         * Create, delete routes needs to be overridden to verify user
         * We're not allowing editing of comments?
         */
        const apiRouter = super.generateRoutes({
            index: false,
            show: false,
            create: false,
            update: false,
            delete: false
        });

        // overrides the create route
        apiRouter.post('/', tokenHelper.verifyToken, (req, res) => {
            // check that the user associated with comment is the logged in user
            req.body.user = res.locals.user._id;
            req.db.repositories[this.model + 'Repository'].create(req.body, req.db.connection)
                .then((resource) => {
                    return res.status(200).json(resource);
                })
                .catch((err) => {
                    return res.status(500).json({
                        error: true,
                        message: "Could not create comment"
                    })
                });

        });

        // overrides the delete route
        apiRouter.delete('/:id', tokenHelper.verifyToken, (req, res) => {
            // find the comment
            const id = req.params.id;
            req.db.repositories[this.model + 'Repository'].findById(id, req.db.connection)
                .then((comment) => {
                    // check that comment being deleted is owned by the logged in user
                    // or that the blog the comment belongs to belongs to the logged in user
                    if (String(comment.user) == String(res.locals.user._id) || String(comment.post_id.user) == String(res.locals.user._id)) {

                        // delete from post document
                        let comments = comment.post_id.comments;
                        let index = comments.indexOf(id);
                        if(index >= 0) {
                            comments.splice(index, 1);

                            req.db.repositories.PostRepository.update(comment.post_id._id, {comments: comments}, req.db.connection)
                                .then((fin) => {
                                    // delete comment document
                                    req.db.repositories[this.model + 'Repository'].delete(id, req.db.connection)
                                        .then((success) => {
                                            if (success) {
                                                return res.status(200).json({
                                                    error: false,
                                                    message: 'Comment deleted successfully.'
                                                });
                                            }
                                        })
                                        .catch((err) => {
                                            return res.status(500).json({
                                                error: true,
                                                message: "Could not delete comment"
                                            });
                                        });
                                })
                                .catch((err) => {
                                    return res.status(500).json({
                                        error: true,
                                        message: "Could not delete comment"
                                    });
                                });
                        }

                    } else {
                        return res.status(401).json({
                            error: true,
                            message: 'You do not have permissions to delete this comment'
                        });
                    }
                })
                .catch((err) => {
                    return res.status(400).json({
                        error: true,
                        message: "The comment does not exist."
                    });
                });

        });

        return apiRouter;
    }

}