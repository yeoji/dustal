import React from "react";
import {Row, Col, Input, ButtonInput} from "react-bootstrap";
import UploadActions from "../../actions/UploadActions";
import UploadStore from "../../stores/UploadStore";
import ProfilePicture from '../partials/ProfilePicture';

class SetupUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {profileImg: "http://placehold.it/150x150"};
    }

    componentDidMount(){
        UploadStore.listen(this.onUploadChange.bind(this));
    }

    componentWillUnmount() {
        UploadStore.unlisten(this.onUploadChange.bind(this));
    }

    onUploadChange(state){
        this.setState({profileImg: state.profileImg});
    }

    _onFileChange(files) {

        let file = files[0];

        const data = new FormData();
        data.append('profile', file);
        UploadActions.uploadProfilePic(data, this.props.user.get('username'));
    }

    render() {
        return (
            <form ref="profileForm" encType="multipart/form-data">
                <Row>
                    <h2>1) Upload a profile photo</h2>
                    <Col lg={4} lgOffset={4}>
                        <ProfilePicture onChange={this._onFileChange.bind(this)} profileImg={this.state.profileImg}/>
                    </Col>
                </Row>
            </form>
        );
    }
}

SetupUser.propTypes = {};

export default SetupUser;