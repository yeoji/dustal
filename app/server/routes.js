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

    /******************
     *  React Routes  *
     ******************/
    app.use('/', reactRouter);

}