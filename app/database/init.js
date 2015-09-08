import knex from "knex";
import config from '../../app/server/config/database.json';
import Bookshelf from 'bookshelf';
import models from "./models";

const dbConf = config.bookshelf[config.bookshelf.db];
const knexConfig = knex(dbConf);

let bookshelf = new Bookshelf(knexConfig);
bookshelf.models = {};

// Register models
models(bookshelf);

export default bookshelf;