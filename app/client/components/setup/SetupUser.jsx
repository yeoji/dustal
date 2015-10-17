import React from "react";
import {Row, Col, Input, ButtonInput} from "react-bootstrap";
import UploadActions from "../../actions/UploadActions";
import UploadStore from "../../stores/UploadStore";

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
        this.setState({profileImg: '/uploads/' + state.profileImg});
    }

    _onFileChange() {
        const form = React.findDOMNode(this.refs.profileForm);

        const data = new FormData();
        data.append('profile', form.elements.profile.files[0]);
        UploadActions.uploadProfilePic(data, this.props.user.get('username'));
    }

    render() {
        return (
            <form ref="profileForm" encType="multipart/form-data">
                <Row style={{ margin: '30px' }}>
                    <h2 style={{marginTop: '0px'}}>1) Upload a profile photo</h2>
                    <Col lg={4} lgOffset={4}>
                        <img src={this.state.profileImg}/>
                        <Input type="file" name="profile" ref="profile" onChange={this._onFileChange.bind(this)}/>
                    </Col>
                </Row>
            </form>
        );
    }
}

SetupUser.propTypes = {};

export default SetupUser;