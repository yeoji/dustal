import alt from '../alt'
import ModalActions from '../actions/ModalActions';
import UserActions from '../actions/UserActions';

class ModalStore{
    constructor(){
        this.bindListeners({
            showLoginModal: ModalActions.showLoginModal,
            showRegisterModal: ModalActions.showRegisterModal,
            closeLoginModal: ModalActions.closeLoginModal,
            closeRegisterModal: ModalActions.closeRegisterModal,
            closeUserRegisterModal: UserActions.doRegister,
            closeUserLoginModal: UserActions.doLogin
        });

        this.showLoginModal = false;
        this.showRegisterModal = false;
    }

    showLoginModal(){
        this.showLoginModal = true;
        this.emitChange();
    }

    showRegisterModal(){
        this.showRegisterModal = true;
        this.emitChange();
    }

    closeLoginModal(){
        this.showLoginModal = false;
        this.emitChange();
    }

    closeRegisterModal(){
        this.showRegisterModal = false;
        this.emitChange();
    }

    closeUserRegisterModal(){
        this.showRegisterModal = false;
        this.emitChange();
    }

    closeUserLoginModal(){
        this.showLoginModal = false;
        this.emitChange();
    }
}

export default alt.createStore(ModalStore, 'ModalStore');