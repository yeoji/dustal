import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';

class ProfilePicture extends Component{
    constructor(props){
        super(props);
    }

    _onDrop(files) {
        this.props.onChange(files);
    }

    render(){
        return(

            <div className="form-group">
                <Dropzone onDrop={this._onDrop.bind(this)} className="profile-picture">
                    <img src={this.props.profileImg} />
                </Dropzone>
                <span className="help-block">Try dropping your picture above, or click to upload.</span>
            </div>

        )
    }
}

export default ProfilePicture;