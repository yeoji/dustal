import alt from "../alt";
import Immutable from "immutable";
import UserActions from "../actions/UserActions";
import ModalActions from '../actions/ModalActions';
import routerInstance from "../routerInstance";

class UserStore {
    constructor() {
        this.user = Immutable.Map({});

        this.on('init', this.bootstrap);
        this.on('bootstrap', this.bootstrap);

        this.bindListeners({
            handleDoRegister: UserActions.doRegister,
            handleDoLogin: UserActions.doLogin,
            handleDoLogout: UserActions.doLogout
        });
    }

    bootstrap() {
        if (!Immutable.Map.isMap(this.user)) {
            this.user = Immutable.fromJS(this.user);
        }
    }

    handleDoRegister(user) {
        this.user = Immutable.Map(user);

        // redirect to dashboard
        routerInstance.get().transitionTo('/account');
    }

    handleDoLogin(user) {
        this.user = Immutable.Map(user);

        let path = '/' + this.user.get('username');

        if(!this.user.get('mobile').is_verified){
            path = '/account';
        }

        routerInstance.get().transitionTo(path);
    }

    handleDoLogout() {
        this.user = Immutable.Map({});

        // redirect to sign in
        routerInstance.get().transitionTo('/');
    }

}

export default alt.createStore(UserStore, 'UserStore');