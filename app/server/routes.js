import authRoutes from "./routes/auth.routes";
import reactRouter from "./routes/react.routes";
import RESTRouter from "./routes/rest/RESTRoutes";
import BlogRouter from "./routes/rest/BlogRoutes";
import PostRouter from "./routes/rest/PostRoutes";
import CommentRouter from "./routes/rest/CommentRoutes";
import uploadRouter from "./routes/upload.routes";
import {SmsHandler, getCallCode} from "./services/sms/SmsService";

export default function (app, passport) {

    /*****************
     *  Auth Routes  *
     *****************/
    authRoutes(app, passport);

    /****************
     *  API Routes  *
     ****************/
    app.use('/api/blogs', new BlogRouter().generateRoutes());
    app.use('/api/posts', new PostRouter().generateRoutes());
    app.use('/api/comments', new CommentRouter().generateRoutes());
    app.use('/api/users', new RESTRouter('User').generateRoutes({index: false, create: false, delete: false}));

    // routes that handle uploads
    app.use('/api/uploads', uploadRouter);

    // sms callback url
    app.post('/handler/sms', (req, res) => {
        SmsHandler.receiveSms(req)
            .then(() => {
                // send an empty response
                res.type('xml');
                return res.end("<Response></Response>");
            })
            .catch((err) => {
                return res.status(500).json(err);
            });
    });

    /******************
     *  React Routes  *
     ******************/
    app.use('/', reactRouter);

}