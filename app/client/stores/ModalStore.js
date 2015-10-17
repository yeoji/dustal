import alt from '../alt'
import ModalActions from '../actions/ModalActions';
import UserActions from '../actions/UserActions';

class ModalStore{
    constructor(){
        this.bindListeners({
            showLoginModal: ModalActions.showLoginModal,
            showRegisterModal: ModalActions.showRegisterModal,
            showVerificationModal: ModalActions.showVerificationModal,
            closeLoginModal: ModalActions.closeLoginModal,
            closeRegisterModal: ModalActions.closeRegisterModal,
            UserRegisterModal: UserActions.doRegister,
            UserLoginModal: UserActions.doLogin,
            handleVerifiedNumber: UserActions.verifyNumber
        });

        this.showLoginModal = false;
        this.showRegisterModal = false;
        this.showVerificationModal = false;
    }

    showLoginModal(){
        this.showLoginModal = true;
    }

    showRegisterModal(){
        this.showRegisterModal = true;
    }

    showVerificationModal(){
        this.showVerificationModal = true;
    }

    closeLoginModal(){
        this.showLoginModal = false;
    }

    closeRegisterModal(){
        this.showRegisterModal = false;
    }

    UserRegisterModal(user){
        this.showRegisterModal = false;
        this.emitChange();

        if(!user.mobile.is_verified){
            this.showVerificationModal = true;
        }
    }

    UserLoginModal(user){
        this.showLoginModal = false;
        this.emitChange();

        if(!user.mobile.is_verified){
            this.showVerificationModal = true;
        }
    }

    handleVerifiedNumber(status){
        if(!status.error){
            this.showVerificationModal = false;
            this.emitChange();
        }
    }
}

export default alt.createStore(ModalStore, 'ModalStore');