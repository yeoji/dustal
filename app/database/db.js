import config from '../../app/server/config/database.json';
import repoBinder from "./repositories/binder";
const passportConfig = require("../server/config/passport");

export default function (passport) {
    const db = require('../../' + config[config.db].init);
    const database = {
        connection: db,
        repositories: repoBinder
    };

    passportConfig(passport, database);

    return database;
}