import React from "react";
import {Row, Col, Input, ButtonInput} from "react-bootstrap";
import ProfilePicture from '../partials/ProfilePicture';

class SetupUser extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form ref="profileForm" encType="multipart/form-data">
                <Row>
                    <h2>1) Upload a profile photo</h2>
                    <Col lg={4} lgOffset={4}>
                        <ProfilePicture />
                    </Col>
                </Row>
            </form>
        );
    }
}

SetupUser.propTypes = {};

export default SetupUser;