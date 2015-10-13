import React, {Component, PropTypes} from 'react';
import ModalActions from "../../actions/ModalActions";
import ModalStore from '../../stores/ModalStore';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

class GlobalModal extends Component{
    constructor(props){
        super(props);
        this.state = {ModalStore: ModalStore.getState()};
    }

    componentDidMount(){
        ModalStore.listen(this.onNavigationChange.bind(this));
    }

    componentWillUnmount() {
        ModalStore.unlisten(this.onNavigationChange.bind(this));
    }

    onNavigationChange(state){

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
            </div>
        );
    }
}

export default GlobalModal;