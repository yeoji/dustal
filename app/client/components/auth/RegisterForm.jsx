import React from 'react';
import {Link} from 'react-router';
import styles from './AuthForm.styles';
import UserActions from "../../actions/UserActions";

class RegisterForm extends React.Component {

    constructor(props) {
        super(props);


        // Bind methods here because arrows don't work for some reason -.-
        this._onAuthSubmit = this._onAuthSubmit.bind(this);
    }

    _onAuthSubmit() {
        const user = {};
        user.first_name = React.findDOMNode(this.refs.first_name).value;
        user.last_name = React.findDOMNode(this.refs.last_name).value;
        user.email = React.findDOMNode(this.refs.email).value;
        user.password = React.findDOMNode(this.refs.password).value;

        UserActions.doRegister(user);

    };

    render() {
        return (
            <div style={ { marginTop: '100px' } }>
                <form style={ styles.authForm } role="form">
                    <h1 style={ styles.heading }>rainman.</h1>
                    <div className="form-group">
                        <input style={ styles.inputField } className="form-control" placeholder="First Name"
                               ref="first_name" name="first_name" type="text" autofocus/>
                    </div>
                    <div className="form-group">
                        <input style={ styles.inputField } className="form-control" placeholder="Last Name" ref="last_name"
                               name="last_name" type="text"/>
                    </div>
                    <div className="form-group">
                        <input style={ styles.inputField } className="form-control" placeholder="E-mail" name="email"
                               type="email" ref="email" autofocus/>
                    </div>
                    <div className="form-group">
                        <input style={ styles.inputField } className="form-control" placeholder="Password"
                               name="password" type="password" ref="password" />
                    </div>
                    <button style={ styles.submitButton } className="btn btn-lg btn-default btn-block"
                            type="button" onClick={this._onAuthSubmit}>Register</button>
                </form>
            </div>
        );
    }
}

export default RegisterForm;