import React from "react";
import styles from "./AuthForm.styles";
import UserActions from "../../actions/UserActions";
import {Row, Col, Input, Button} from 'react-bootstrap';
import {Link} from 'react-router';

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
                            <Input style={styles.inputField} placeholder="E-mail" type="email" ref="email"/>
                            <Input style={styles.inputField} placeholder="Password" type="password" ref="password"/>
                            <Button style={ styles.submitButton } type="button" className="btn btn-lg btn-default btn-block" onClick={this._onAuthSubmit}>Login</Button>
                        </form>
                        <p style={ styles.paragraph } className="text-center">
                            <Link to={registerUrl}><strong>Sign up</strong></Link>
                            for a new account
                        </p>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default LoginForm;