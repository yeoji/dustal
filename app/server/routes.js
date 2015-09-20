import authRoutes from "./routes/auth.routes";
import reactRouter from "./routes/react.routes";
import RESTRouter from "./routes/rest/RESTRoutes";
import BlogRouter from "./routes/rest/BlogRoutes";
import SmsHandler from "./services/sms/SmsHandler";

export default function (app, passport) {

    /*****************
     *  Auth Routes  *
     *****************/
    authRoutes(app, passport);

    /****************
     *  API Routes  *
     ****************/
    app.use('/api/blogs', new BlogRouter().generateRoutes());

    // sms callback url
    app.post('/handler/sms', (req, res) => {
        SmsHandler.receiveSms(req)
            .then(() => {
                // send an empty response
                res.type('xml');
                res.send("<Response></Response>");
            });
    });

    /******************
     *  React Routes  *
     ******************/
    app.use('/', reactRouter);

}