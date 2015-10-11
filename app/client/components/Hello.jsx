import React, {Component, PropTypes} from "react";
import {Row, Col, Button, Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router';
import RegisterModal from './partials/RegisterModal';
import Footer from "./partials/Footer";
class Hello extends Component {

    constructor(props){
        super();
        this.state = {showRegisterModal: false};
    }

    closeRegister() {
        this.setState({ showRegisterModal: false });
    }

    openRegister() {
        this.setState({ showRegisterModal: true });
    }

    render() {

        let registerUrl = '/auth/register';

        return (
            <div>
                <RegisterModal show={this.state.showRegisterModal} close={this.closeRegister.bind(this)}/>
                <Row>
                    <Jumbotron className="welcome text-center">
                        <Button bsSize="large" className="welcome-button" onClick={this.openRegister.bind(this)}>Join Now</Button>
                    </Jumbotron>
                </Row>
                <Row>
                    <Col lg={4} lgOffset={4}>
                        <div className="features">
                            <h4>Express your thoughts</h4>
                            <p>Personal blogs allow you to share what's on your mind;
                                but most blogging services require an effort to sit down and type out a long post.
                                Our focus is on convenient sharing of short blurbs via SMS
                                so more time is spent enjoying your day.</p>
                        </div>
                        <div className="features">
                            <h4>Reflect on your day</h4>
                            <p>Most days are lived with no recollection of anything that has happened.
                                Our service provides an unobtrusive way to build a habit of recording the littlest things;
                                and piecing them into something bigger.
                                Life should be remembered, and moments reflected upon.</p>
                        </div>
                        <div className="features">
                            <h4>Accessible wherever you are</h4>
                            <p>Convenient, effortless, unobtrusive. Our SMS-based platform
                                allows posting worldwide, whenever you want; as it requires absolutely no internet connection.
                                Wherever you are, sharing your experiences will be right at your fingertips.
                                All you have to do is press send.</p>
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
    UserStore: PropTypes.object
};

export default Hello;