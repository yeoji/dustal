import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import UploadActions from "../../actions/UploadActions";
import UploadStore from "../../stores/UploadStore";

class ProfilePicture extends Component{
    constructor(props){
        super(props);
        this.state = {profileImg: this.props.img || "http://placehold.it/150x150"};
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

    _onDrop(files) {
        let file = files[0];

        const data = new FormData();
        data.append('profile', file);
        UploadActions.uploadProfilePic(data);
    }

    render(){
        return(

            <div className="form-group">
                <Dropzone onDrop={this._onDrop.bind(this)} className="profile-picture">
                    <img src={this.state.profileImg} />
                </Dropzone>
                <span className="help-block">Try dropping your picture above, or click to upload.</span>
            </div>

        )
    }
}

export default ProfilePicture;