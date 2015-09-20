import authRoutes from "./routes/auth.routes";
import reactRouter from "./routes/react.routes";
import RESTRouter from "./routes/RESTRoutes";
import SmsHandler from "./services/sms/SmsHandler";

export default function (app, passport) {

    /*****************
     *  Auth Routes  *
     *****************/
    authRoutes(app, passport);

    /****************
     *  API Routes  *
     ****************/
    //app.use('/api/test', new RESTRouter('Test').generateRoutes({}));
    app.post('/sms/test', (req, res) => {
        SmsHandler.receiveSms(req);
    });

    /******************
     *  React Routes  *
     ******************/
    app.use('/', reactRouter);

}