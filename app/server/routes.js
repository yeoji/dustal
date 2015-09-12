import authRoutes from "./routes/auth.routes";
import reactRouter from "./routes/react.routes";

export default function (app, passport) {

    /*****************
     *  Auth Routes  *
     *****************/
    authRoutes(app, passport);

    /****************
     *  API Routes  *
     ****************/


    /******************
     *  React Routes  *
     ******************/
    app.use('/', reactRouter);

}