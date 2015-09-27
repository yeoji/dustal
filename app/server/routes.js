import authRoutes from "./routes/auth.routes";
import reactRouter from "./routes/react.routes";
import RESTRouter from "./routes/rest/RESTRoutes";
import BlogRouter from "./routes/rest/BlogRoutes";
import PostRouter from "./routes/rest/PostRoutes";
import CommentRouter from "./routes/rest/CommentRoutes";
import SmsHandler from "./services/sms/SmsHandler";

export default function (app, passport) {

    /*****************
     *  Auth Routes  *
     *****************/
    authRoutes(app, passport);

    /****************
     *  API Routes  *
     ****************/
    app.get('/testlol', (req, res) => {
        req.db.repositories.UserRepository.all(req.db.connection)
            .then((resp) => {
                return res.json(resp);
            })
            .catch((err) => {
                return res.json(err);
            });
    });

    app.use('/api/blogs', new BlogRouter().generateRoutes());
    app.use('/api/posts', new PostRouter().generateRoutes());
    app.use('/api/comments', new CommentRouter().generateRoutes());

    // sms callback url
    app.post('/handler/sms', (req, res) => {
        SmsHandler.receiveSms(req)
            .then(() => {
                // send an empty response
                res.type('xml');
                return res.end("<Response></Response>");
            });
    });

    /******************
     *  React Routes  *
     ******************/
    app.use('/', reactRouter);

}