import React from 'react';
import styles from './AuthForm.styles';
import UserActions from "../../actions/UserActions";
import {Modal, Input, Button} from 'react-bootstrap';

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
    }

    _onAuthSubmit() {
        const user = {};
        user.first_name = this.refs.first_name.getValue();
        user.last_name = this.refs.last_name.getValue();
        user.email = this.refs.email.getValue();
        user.password = this.refs.password.getValue();

        UserActions.doRegister(user);

    };

    render() {
        return (

            <Modal show={this.props.show} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this._onAuthSubmit.bind(this)}>
                        <Input style={styles.inputField} placeholder="First Name" className="form-control" type="text" ref="first_name"/>
                        <Input style={styles.inputField} placeholder="Last Name" className="form-control" type="text" ref="last_name"/>
                        <Input style={styles.inputField} placeholder="E-mail" className="form-control" type="email" ref="email"/>
                        <Input style={styles.inputField} placeholder="Password" className="form-control" type="password" ref="password"/>
                        <Button style={ styles.submitButton } type="button" className="btn btn-lg btn-default btn-block" onClick={this._onAuthSubmit}>Register</Button>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default RegisterForm;