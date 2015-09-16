import fs from "fs";
import config from "../../../app/server/config/database.json";
const dbImpl = config.db;

/**********************************************************************************
 * It is up to you to make sure you implement all functions in your repositories. *
 * A sample comment is included in bookshelf/UserRepository.                      *
 * No interfaces in Javascript :(                                                 *
 **********************************************************************************/
const repositories = {};

// autobind the repositories
const repoPath = __dirname + '/' + dbImpl + '/';
const files = fs.readdirSync(repoPath);

for (var file of files) {
    // get rid of .js extension
    // assuming that there will only be one '.' in the filename
    const split = file.split('.');
    repositories[split[0]] = require(repoPath + file);
}

export default repositories;