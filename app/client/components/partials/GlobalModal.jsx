import React, {Component, PropTypes} from 'react';
import ModalActions from "../../actions/ModalActions";
import ModalStore from '../../stores/ModalStore';

import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';
import VerificationModal from './modals/VerificationModal';

class GlobalModal extends Component{
    constructor(props){
        super(props);
        this.state = {ModalStore: ModalStore.getState()};
    }

    componentDidMount(){
        ModalStore.listen(this.onModalChange.bind(this));
    }

    componentWillUnmount() {
        ModalStore.unlisten(this.onModalChange.bind(this));
    }

    onModalChange(state){
        this.setState({ModalStore: state});
    }

    closeLogin() {
        ModalActions.closeLoginModal();
    }

    closeRegister() {
        ModalActions.closeRegisterModal();
    }

    render(){

        return(
            <div>
                <RegisterModal show={this.state.ModalStore.showRegisterModal} close={this.closeRegister.bind(this)}/>
                <LoginModal show={this.state.ModalStore.showLoginModal} close={this.closeLogin.bind(this)}/>
                <VerificationModal show={this.state.ModalStore.showVerificationModal}/>
            </div>
        );
    }
}

export default GlobalModal;