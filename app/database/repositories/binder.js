import fs from "fs";
import config from "../../../app/server/config/database.json";
const dbImpl = config.db;

/**********************************************************************************
 * It is up to you to make sure you implement all functions in your repositories. *
 * A sample comment is included in bookshelf/UserRepository.                      *
 * No interfaces in Javascript :(                                                 *
 **********************************************************************************/
const repositories = {};

// add bindings here
repositories.UserRepository = new (require("./" + dbImpl + "/UserRepository"))();
repositories.BlogRepository = new (require("./" + dbImpl + "/BlogRepository"))();
repositories.PostRepository = new (require("./" + dbImpl + "/Repository"))('Post');

export default repositories;