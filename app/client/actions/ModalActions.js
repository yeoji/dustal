import alt from '../alt';

class ModalActions{
    showLoginModal(){
        this.dispatch();
    }

    closeLoginModal(){
        this.dispatch();
    }

    showRegisterModal(){
        this.dispatch();
    }

    closeRegisterModal(){
        this.dispatch();
    }
}

export default alt.createActions(ModalActions);