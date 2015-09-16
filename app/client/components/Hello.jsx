import React from "react";
import styles from "./auth/AuthForm.styles";
import {Row, Button, Grid, Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router';

class Hello extends React.Component {

    render() {

        let registerUrl = '/auth/register';

        return (
            <Row>
                <Jumbotron className="welcome text-center">
                    <Button bsSize="large" className="welcome-button" href={registerUrl}>Join Now</Button>
                </Jumbotron>
            </Row>
        );
    }
}

Hello.propTypes = {
    UserStore: React.PropTypes.object
};

export default Hello;