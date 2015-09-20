import RESTRoutes from "./RESTRoutes";
import bcrypt from "bcrypt-nodejs";
import tokenHelper from "../tokenHelper";

export default class BlogRoutes extends RESTRoutes {

    constructor() {
        super('Blog');
    }

    // overrides the routes generation in RESTRoutes
    generateRoutes() {
        /**
         * The show route needs to be overriden to use username instead of id
         * The update and delete routes are the same
         */
        const apiRouter = super.generateRoutes({show: false, update: false, delete: false});

        // The show specific blog route
        apiRouter.get('/:name', (req, res) => {
            const name = req.params.name;
            req.db.repositories[this.model + 'Repository'].findByName(name, req.db.connection)
                .then((blog) => {
                    // if private, send unauthorized so client can show password page
                    if(blog.private) {
                        return res.status(401).json({
                            error: true,
                            message: 'Blog is private',
                            blog: {
                                title: blog.title,
                                name: blog.name
                            }
                        });
                    }
                    return res.status(200).json(blog.toJSON());
                })
                .catch((err) => {
                    return res.status(500).json({
                        error: true,
                        message: err
                    })
                });
        });

        // The update specific blog route
        apiRouter.put('/:name', tokenHelper.verifyToken, (req, res) => {
            const name = req.params.name;
            req.db.repositories[this.model + 'Repository'].findByName(name, req.db.connection)
                .then((blog) => {
                    // check that the user owns the blog
                    // @TODO: should we populate the users in the blog document or leave it as IDs
                    if(blog.users.indexOf(res.locals.user._id) >= 0) {
                        req.db.repositories[this.model + 'Repository'].update(blog._id, req.body, req.db.connection)
                            .then((resource) => {
                                return res.status(200).json(resource.toJSON());
                            })
                            .catch((err) => {
                                return res.status(500).json({
                                    error: true,
                                    message: err
                                })
                            });
                    } else {
                        res.status(401).json({
                            error: true,
                            message: 'You do not have permissions to update this blog.'
                        });
                    }
                });
        });

        // The delete specific blog route
        apiRouter.delete('/:name', (req, res) => {
            const name = req.params.name;
            req.db.repositories[this.model + 'Repository'].findByName(name, req.db.connection)
                .then((blog) => {
                    // check that the user owns the blog
                    // @TODO: should we populate the users in the blog document or leave it as IDs
                    if(blog.users.indexOf(res.locals.user._id) >= 0) {
                        req.db.repositories[this.model + 'Repository'].delete(blog._id, req.db.connection)
                            .then((resource) => {
                                if (!resource) {
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
                    } else {
                        res.status(401).json({
                            error: true,
                            message: 'You do not have permissions to delete this blog.'
                        });
                    }
                });
        });

        // This is the route for getting permissions to view a private blog
        apiRouter.post('/:name/auth', (req, res) => {
            const name = req.params.name;
            req.db.repositories[this.model + 'Repository'].findByName(name, req.db.connection)
                .then((blog) => {
                    if(blog.private) {
                        if (bcrypt.compareSync(req.body.password, blog.password)) {
                            return res.status(200).json(blog.toJSON());
                        }
                        return res.status(401).json({
                            error: true,
                            message: 'You do not have permissions to view this blog.'
                        });
                    } else {
                        return res.status(200).json(blog.toJSON());
                    }
                });
        });
    }

}