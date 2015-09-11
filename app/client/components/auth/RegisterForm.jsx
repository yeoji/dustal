import React from 'react';
import styles from './AuthForm.styles';
import UserActions from "../../actions/UserActions";
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Input from 'react-bootstrap/lib/Input';

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);


        // Bind methods here because arrows don't work for some reason -.-
        this._onAuthSubmit = this._onAuthSubmit.bind(this);
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
            <Row>
                <Col mdOffset={4} md={4}>
                    <div style={ { marginTop: '100px' } }>
                        <form>
                            <h1 style={ styles.heading }>rainman.</h1>
                            <Input style={styles.inputField} placeholder="First Name" className="form-control" type="text" ref="first_name"/>
                            <Input style={styles.inputField} placeholder="Last Name" className="form-control" type="text" ref="last_name"/>
                            <Input style={styles.inputField} placeholder="E-mail" className="form-control" type="email" ref="email"/>
                            <Input style={styles.inputField} placeholder="Password" className="form-control" type="password" ref="password"/>
                            <Button style={ styles.submitButton } type="button" className="btn btn-lg btn-default btn-block" onClick={this._onAuthSubmit}>Register</Button>
                        </form>
                    </div>
                </Col>
            </Row>
        );
    }
}




export default RegisterForm;