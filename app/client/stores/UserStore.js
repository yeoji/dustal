import alt from "../alt";
import Immutable from "immutable";
import UserActions from "../actions/UserActions";
import routerInstance from "../routerInstance";

class UserStore {
    constructor() {
        this.user = Immutable.Map({});

        this.on('init', this.bootstrap);
        this.on('bootstrap', this.bootstrap);

        this.bindListeners({
            handleDoRegister: UserActions.DO_REGISTER,
            handleDoLogin: UserActions.DO_LOGIN,
            handleDoLogout: UserActions.DO_LOGOUT
        });
    }

    bootstrap() {
        if (!Immutable.Map.isMap(this.user)) {
            this.user = Immutable.fromJS(this.user);
        }
    }

    handleDoRegister(user) {
        this.user = Immutable.Map(user);
        this.emitChange();

        // redirect to dashboard
        routerInstance.get().transitionTo('/');
    }

    handleDoLogin(user) {
        this.user = Immutable.Map(user);
        this.emitChange();

        // redirect to dashboard
        routerInstance.get().transitionTo('/' + this.user.get('username'));
    }

    handleDoLogout() {
        this.user = Immutable.Map({});
        this.emitChange();

        // redirect to sign in
        routerInstance.get().transitionTo('/');
    }

}

export default alt.createStore(UserStore, 'UserStore');