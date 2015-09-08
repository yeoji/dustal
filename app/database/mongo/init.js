import mongoose from "mongoose";
import config from '../../../app/server/config/database.json';
import models from "./models";

const options = {
    user: config.mongo.connection.user,
    pass: config.mongo.connection.password
};

mongoose.connect(config.mongo.connection.db, options);
mongoose.models = {};

models(mongoose);

export default mongoose;