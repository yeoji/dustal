import authRoutes from "./routes/auth.routes";
import reactRouter from "./routes/react.routes";
import RESTRouter from "./routes/RESTRoutes";

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
        res.set('Content-Type', 'text/xml');
        res.send("<?xml version='1.0' encoding='UTF-8'?><Response><Message>I'm hungry!</Message></Response>");
    });

    /******************
     *  React Routes  *
     ******************/
    app.use('/', reactRouter);

}