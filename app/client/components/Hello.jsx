import React from "react";
import styles from "./auth/AuthForm.styles";
import {Row, Col, Button, Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router';
import Footer from "./partials/Footer";
class Hello extends React.Component {

    render() {

        let registerUrl = '/auth/register';

        return (
            <div>
                <Row>
                    <Jumbotron className="welcome text-center">
                        <Link to={registerUrl}><Button bsSize="large" className="welcome-button">Join Now</Button></Link>
                    </Jumbotron>
                </Row>
                <Row>
                    <Col lg={4}>
                        <div className="text-center features">
                            <h4>Express your thoughts</h4>
                            <p>Our focus is on convenient sharing of short blurbs via SMS so more time is spent enjoying your day.</p>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="text-center features">
                            <h4>Reflect on your day</h4>
                            <p>Most days are lived with no recollection of anything that has happened. Life should be remembered, and moments reflected upon</p>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="text-center features">
                            <h4>Accessible whereever you are</h4>
                            <p>Wherever you are, sharing your experiences will be right at your fingertips. All you have to do is press send.</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Footer />
                </Row>

            </div>
        );
    }
}

Hello.propTypes = {
    UserStore: React.PropTypes.object
};

export default Hello;