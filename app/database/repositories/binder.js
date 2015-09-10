import config from "../../../app/server/config/database.json";
const dbImpl = config.db;

/**********************************************************************************
 * It is up to you to make sure you implement all functions in your repositories. *
 * A sample comment is included in bookshelf/UserRepository.                      *
 * No interfaces in Javascript :(                                                 *
 **********************************************************************************/

// @TODO: possible to search for and autobind?
// add any repositories you need and bind them here
export default {
    UserRepository: require('./' + dbImpl + '/UserRepository')
}