import React from "react";
import styles from "./AuthForm.styles";
import UserActions from "../../actions/UserActions";
import {Row, Col, Input, Button, Modal, NavItem} from 'react-bootstrap';
import {Link} from 'react-router';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
    }


    _onAuthSubmit(e) {
        e.preventDefault();
        const user = {};
        user.email = this.refs.email.getValue();
        user.password = this.refs.password.getValue();

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
                            <Input style={styles.inputField} placeholder="E-mail" type="email" ref="email"/>
                            <Input style={styles.inputField} placeholder="Password" type="password" ref="password"/>
                            <Button style={ styles.submitButton } type="submit" className="btn btn-lg btn-default btn-block">Login</Button>
                        </form>
                    </Modal.Body>
                </Modal>
        );
    }
}

export default LoginForm;