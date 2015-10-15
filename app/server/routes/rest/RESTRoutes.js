/**
 * This generates the basic REST routes for any model
 * An accompanying repository has to be made for each model
 * The options can be set so that some routes are generated
 * and some are not.
 */

import express from "express";
import _ from 'lodash';
import tokenHelper from "../tokenHelper";

export default class RESTRoutes {

    constructor(model) {
        this.apiRouter = express.Router();
        this.model = model;
        this.defaultOpts = {
            index: true,
            show: true,
            create: true,
            update: true,
            delete: true
        }
    }

    generateRoutes(options) {
        const opts = _.assign(this.defaultOpts, options);

        if (opts.index) {
            // Get all resources
            this.apiRouter.get('/', (req, res) => {
                req.db.repositories[this.model + 'Repository'].all(req.db.connection)
                    .then(function (resources) {
                        return res.status(200).json(resources);
                    })
                    .catch(function (err) {
                        return res.status(500).json({
                            error: true,
                            message: err
                        });
                    });
            });
        }

        if (opts.show) {
            // Get resource by id
            this.apiRouter.get('/:id', (req, res) => {
                const id = req.params.id;
                req.db.repositories[this.model + 'Repository'].findById(id, req.db.connection)
                    .then((resource) => {
                        return res.status(200).json(resource);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            error: true,
                            message: err
                        })
                    });
            });
        }

        if (opts.create) {
            // Create new resource
            this.apiRouter.post('/', tokenHelper.verifyToken, (req, res) => {
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
            });
        }

        if (opts.update) {
            // Update resource
            this.apiRouter.put('/:id', tokenHelper.verifyToken, (req, res) => {
                const id = req.params.id;
                req.db.repositories[this.model + 'Repository'].update(id, req.body, req.db.connection)
                    .then((resource) => {
                        return res.status(200).json(resource);
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            error: true,
                            message: err
                        })
                    });
            });
        }

        if (opts.delete) {
            // Delete resource
            this.apiRouter.delete('/:id', tokenHelper.verifyToken, (req, res) => {
                const id = req.params.id;
                req.db.repositories[this.model + 'Repository'].delete(id, req.db.connection)
                    .then((success) => {
                        if (success) {
                            return res.status(200).json({
                                error: false,
                                message: 'Resource deleted successfully.'
                            });
                        }
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            error: true,
                            message: err
                        })
                    });
            });
        }

        return this.apiRouter;
    }

}