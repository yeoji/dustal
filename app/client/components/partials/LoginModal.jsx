import React from 'react';
import ModalActions from '../../actions/ModalActions';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import {Input, Button, Modal, NavItem} from 'react-bootstrap';
import {Link} from 'react-router';

class LoginModal extends React.Component {

    constructor(props) {
        super(props);
    }

    _onAuthSubmit(e) {
        e.preventDefault();
        const user = {};
        user.email = this.refs.email.getValue();
        user.password = this.refs.password.getValue();

        this.refs.email.getInputDOMNode().value = "";
        this.refs.password.getInputDOMNode().value = "";

        UserActions.doLogin(user);
    }

    render() {

        return (
            <Modal show={this.props.show} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this._onAuthSubmit.bind(this)}>
                        <Input placeholder="E-mail" type="email" ref="email"/>
                        <Input placeholder="Password" type="password" ref="password"/>
                        <Button type="submit" className="btn btn-lg btn-default btn-block">Login</Button>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default LoginModal;