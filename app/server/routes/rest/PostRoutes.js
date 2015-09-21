import RESTRoutes from "./RESTRoutes";
import tokenHelper from "../tokenHelper";

export default class PostRoutes extends RESTRoutes {

    constructor() {
        super('Post');
    }

    // overrides the routes generation in RESTRoutes
    generateRoutes() {
        /**
         * We'll never need to list all posts, therefore index is not required
         * We'll never need to show a specific post, therefore show is not required
         * Create, delete routes needs to be overridden to check that the user owns the blog
         * We're not allowing editing of posts?
         */
        const apiRouter = super.generateRoutes({
            index: false,
            show: false,
            create: false,
            update: false,
            delete: false
        });

        // overriding create route
        apiRouter.post('/', tokenHelper.verifyToken, (req, res) => {
            // check that the blog belongs to user
            // @TODO: not sure if res.locals.user is populated; assumed not here
            if ((res.locals.user.blogs.indexOf(req.body.blog_id) >= 0) && (req.body.user == res.locals.user._id)) {
                req.db.repositories[this.model + 'Repository'].create(req.body, req.db.connection)
                    .then((resource) => {
                        return res.status(200).json(resource);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            error: true,
                            message: err
                        })
                    });
            }

            return res.status(401).json({
                error: true,
                message: 'You do not have permissions to post to this blog'
            });
        });

        // overriding delete route
        apiRouter.delete('/:id', tokenHelper.verifyToken, (req, res) => {
            // find the post
            const id = req.params.id;
            req.db.repositories[this.model + 'Repository'].findById(id, req.db.connection)
                .then((post) => {
                    // check that blog belongs to user
                    // @TODO: not sure if post is populated so assumed not atm
                    if (res.locals.user.blogs.indexOf(post.blog_id) >= 0) {

                        req.db.repositories[this.model + 'Repository'].delete(id, req.db.connection)
                            .then((resource) => {
                                if (!resource.id) {
                                    return res.status(200).json({
                                        error: false,
                                        message: 'Resource deleted successfully.'
                                    });
                                }

                                return res.status(500).json({
                                    error: true,
                                    message: 'Could not delete resource'
                                });
                            })
                            .catch((err) => {
                                return res.status(500).json({
                                    error: true,
                                    message: err
                                });
                            });

                    }

                    return res.status(401).json({
                        error: true,
                        message: 'You do not have permissions to delete this post'
                    });
                })
                .catch((err) => {
                    return res.status(500).json({
                        error: true,
                        message: err
                    });
                });
        });

        return apiRouter;
    }

}