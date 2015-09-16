import mongoose from "mongoose";
import config from '../../../app/server/config/database.json';
import models from "./models";

const options = {
    user: config.mongo.connection.user,
    pass: config.mongo.connection.password
};

const mongoUri = process.env.MONGOLAB_URI || config.mongo.connection.db;

mongoose.connect(mongoUri, options);
mongoose.models = {};

models(mongoose);

export default mongoose;