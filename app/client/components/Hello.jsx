import React from "react";
import styles from "./auth/AuthForm.styles";

class Hello extends React.Component {

    render() {
        let string;
        if(!this.props.UserStore.user) {
            string = 'World';
        } else {
            string = this.props.UserStore.user.get('first_name');
        }

        return (
            <div style={{marginTop: '100px'}} className="text-center">
                <h1 style={ styles.heading }>Hello {string}!</h1>
            </div>
        );
    }
}

Hello.propTypes = {
    UserStore: React.PropTypes.object
};

export default Hello;