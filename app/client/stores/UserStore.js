import alt from "../alt";
import Immutable from "immutable";
import UserActions from "../actions/UserActions";
import ModalActions from '../actions/ModalActions';
import UploadActions from "../actions/UploadActions";
import routerInstance from "../routerInstance";

class UserStore {
    constructor() {
        this.user = Immutable.Map({});
        this.changePwSuccess = false;

        this.on('init', this.bootstrap);
        this.on('bootstrap', this.bootstrap);

        this.bindListeners({
            handleDoRegister: UserActions.doRegister,
            handleDoLogin: UserActions.doLogin,
            handleDoLogout: UserActions.doLogout,
            handleVerifyNumber: UserActions.verifyNumber,
            handleResendNumber: UserActions.resendNumber,
            handleUploadProfile: UploadActions.uploadProfilePic,
            handleChangePassword: UserActions.changePassword
        });
    }

    bootstrap() {
        if (!Immutable.Map.isMap(this.user)) {
            this.user = Immutable.fromJS(this.user);
        }
        this.changePwSuccess = false;
    }

    handleDoRegister(user) {
        this.user = Immutable.fromJS(user);

        // redirect to dashboard
        routerInstance.get().transitionTo('/account');
    }

    handleDoLogin(user) {
        this.user = Immutable.fromJS(user);
        this.emitChange();

        let path = '/' + this.user.get('username');
        if(!this.user.get('mobile').get('is_verified')){
            path = '/setup';
        }
        
        routerInstance.get().transitionTo(path);
    }

    handleDoLogout() {
        this.user = Immutable.Map({});

        // redirect to sign in
        routerInstance.get().transitionTo('/');
    }


    handleVerifyNumber(verify){
        //nothing
        if(!verify.error) {
            const oldMobile = this.user.get('mobile');
            this.user = this.user.set('mobile', oldMobile.set('is_verified', true));
            //this.emitChange();
        }
    }

    handleResendNumber(mobile){
        this.user = this.user.set('mobile', Immutable.Map(mobile));
        this.emitChange();
    }

    handleUploadProfile(data) {
        this.user = this.user.set('profile_img', data.location);
        this.emitChange();
    }

    handleChangePassword() {
        this.changePwSuccess = true;
        this.emitChange();
    }

}

export default alt.createStore(UserStore, 'UserStore');