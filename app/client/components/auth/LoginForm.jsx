import React from "react";
import {Link} from 'react-router';
import styles from "./AuthForm.styles";
import UserActions from "../../actions/UserActions";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        // Bind methods here because arrows don't work for some reason -.-
        this._onAuthSubmit = this._onAuthSubmit.bind(this);
    }

    _onAuthSubmit() {
        const user = {};
        user.email = React.findDOMNode(this.refs.email).value;
        user.password = React.findDOMNode(this.refs.password).value;
        UserActions.doLogin(user);
    };

    render() {

        let registerUrl = '/auth/register';

        return (
            <div style={ { marginTop: '100px' } }>
                <form style={ styles.authForm } role="form">
                    <h1 style={ styles.heading }>rainman.</h1>
                    <div className="form-group">
                        <input style={ styles.inputField } className="form-control" placeholder="E-mail" name="email"
                               type="email" ref="email" autofocus/>
                    </div>
                    <div className="form-group">
                        <input style={ styles.inputField } className="form-control" placeholder="Password"
                               name="password" type="password" ref="password" />
                    </div>
                    <button style={ styles.submitButton } className="btn btn-lg btn-default btn-block"
                            type="button" onClick={this._onAuthSubmit}>Login</button>
                </form>
                <p style={ styles.paragraph } className="text-center">
                    <Link to={ registerUrl }><strong>Sign up</strong></Link> for a new account
                </p>
            </div>
        );
    }
}

export default LoginForm;