import React from "react";
import styles from "./AuthForm.styles";

class RegistrationFields extends React.Component {

    render() {
        return (
            <div>
                <div className="form-group">
                    <input style={ styles.inputField } className="form-control" placeholder="First Name"
                           ref="first_name" name="first_name" type="text" autofocus/>
                </div>
                <div className="form-group">
                    <input style={ styles.inputField } className="form-control" placeholder="Last Name" ref="last_name"
                           name="last_name" type="text"/>
                </div>
            </div>
        );
    }
}

RegistrationFields.propTypes = {};

export default RegistrationFields;