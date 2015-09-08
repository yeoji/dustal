import React from "react";
import {Link} from 'react-router';
import styles from "./AuthForm.styles";
import RegistrationFields from "./RegistrationFields";

import UserActions from "../../actions/UserActions";

class AuthForm extends React.Component {

    constructor(props) {
        super(props);

        this.type = this.props.type;

        // Bind methods here because arrows don't work for some reason -.-
        this._onAuthSubmit = this._onAuthSubmit.bind(this);
    }

    _onAuthSubmit() {
        const user = {};
        user.email = React.findDOMNode(this.refs.email).value;
        user.password = React.findDOMNode(this.refs.password).value;

        if (this.type == 'register') {
            let regFields = this.refs.regField;
            user.first_name = React.findDOMNode(regFields.refs.first_name).value;
            user.last_name = React.findDOMNode(regFields.refs.last_name).value;

            UserActions.doRegister(user);
        } else {
            UserActions.doLogin(user);
        }
    };

    render() {
        let capType = this.type.charAt(0).toUpperCase() + this.type.substring(1);
        let registerUrl = '/auth/register';

        let registerLink = (
            <p style={ styles.paragraph } className="text-center">
                <Link to={ registerUrl }><strong>Sign up</strong></Link> for a new account
            </p>
        );

        return (
            <div style={ { marginTop: '100px' } }>
                <form style={ styles.authForm } role="form">
                    <h1 style={ styles.heading }>rainman.</h1>
                    { (this.type == 'register' ? <RegistrationFields ref="regField" /> : '') }
                    <div className="form-group">
                        <input style={ styles.inputField } className="form-control" placeholder="E-mail" name="email"
                               type="email" ref="email" autofocus/>
                    </div>
                    <div className="form-group">
                        <input style={ styles.inputField } className="form-control" placeholder="Password"
                               name="password" type="password" ref="password" />
                    </div>
                    <button style={ styles.submitButton } className="btn btn-lg btn-default btn-block"
                            type="button" onClick={this._onAuthSubmit}>{ capType }</button>
                </form>
                { (this.type == 'login' ? registerLink : '') }
            </div>
        );
    }
}

AuthForm.propTypes = {
    UserStore: React.PropTypes.object,
    type: React.PropTypes.string
};

export default AuthForm;