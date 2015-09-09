import React from "react";
import {Link} from 'react-router';
import styles from "./AuthForm.styles";
import UserActions from "../../actions/UserActions";
import {Row, Col, Input, ButtonInput} from 'react-bootstrap';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        // Bind methods here because arrows don't work for some reason -.-
        this._onAuthSubmit = this._onAuthSubmit.bind(this);
    }

    _onAuthSubmit() {
        const user = {};
        user.email = this.refs.email.getValue();
        user.password = this.refs.password.getValue();
        UserActions.doLogin(user);
    }

    render() {

        let registerUrl = '/auth/register';

        return (
            <Row>
                <Col mdOffset={4} md={4}>
                    <div style={ { marginTop: '100px' } }>
                        <form>
                            <h1 style={ styles.heading }>rainman.</h1>
                            <Input style={styles.inputField} placeholder="E-mail" name="email" type="email" ref="email"/>
                            <Input style={styles.inputField} placeholder="Password" name="password" type="password" ref="password"/>
                            <ButtonInput style={ styles.submitButton } type="button" className="btn btn-lg btn-default btn-block" onClick={this._onAuthSubmit} value="Login"/>
                        </form>
                        <p style={ styles.paragraph } className="text-center">
                            <Link to={ registerUrl }><strong>Sign up</strong></Link> for a new account
                        </p>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default LoginForm;