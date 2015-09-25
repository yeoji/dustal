import React from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

class GlobalModal extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        return(
            <div>
                <LoginModal show={this.props.displayLogin} close={this.props.closeLogin}/>
                <RegisterModal show={this.props.displayRegister} close={this.props.closeRegister}/>
            </div>
        )

    }
}

export default GlobalModal;