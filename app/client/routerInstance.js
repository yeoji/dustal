/**
 * This saves the router instance so we can access it anywhere
 * for transitions and redirections
 * @type {null}
 * @private
 */

let _router = null;

export default {
    set: (router) => _router = router,
    get: () => _router
}