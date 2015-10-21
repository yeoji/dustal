import RESTRoutes from "./RESTRoutes";
import tokenHelper from "../tokenHelper";
import bcrypt from "bcrypt-nodejs";

export default class UserRoutes extends RESTRoutes {

    constructor() {
        super('User');
    }

    // overrides the routes generation in RESTRoutes
    generateRoutes() {
        const apiRouter = super.generateRoutes({
            index: false,
            show: false,
            create: false,
            update: false,
            delete: false
        });

        // overriding update route
        apiRouter.put('/:id', tokenHelper.verifyToken, (req, res) => {
            const id = req.params.id;
            // check that the user being updated is the current logged in user
            if (res.locals.user._id == id) {
                // if there is a password change
                if (req.body.new_pw && (req.body.new_pw == req.body.confirm_pw)
                    && bcrypt.compareSync(req.body.curr_pw, res.locals.user.password)) {

                    req.body.password = bcrypt.hashSync(req.body.new_pw);
                    delete req.body.new_pw;
                    delete req.body.confirm_pw;
                    delete req.body.curr_pw;
                }

                req.db.repositories.UserRepository.update(id, req.body, req.db.connection)
                    .then((raw) => {
                        return res.status(200).json({
                            error: false,
                            message: 'User updated successfully!'
                        });
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            error: true,
                            message: 'Could not update user.'
                        });
                    });
            } else {
                return res.status(401).json({
                    error: true,
                    message: 'You are not logged in as the user.'
                });
            }
        });

        return apiRouter;
    }

}