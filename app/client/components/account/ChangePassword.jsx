import React, {Component, PropTypes} from 'react';
import {Input, Button} from 'react-bootstrap';

class ChangePassword extends Component{
    constructor(props){
        super(props);
    }

    _changePassword(){

    }

    render(){
        return(
            <form onSubmit={this._changePassword.bind(this)}>
                <Input placeholder="Password"
                       label="Password"
                       className="form-control"
                       type="text"
                       ref="mobile_number"/>
                <Input placeholder="New Password"
                       label="New Password"
                       className="form-control"
                       type="text"
                       ref="mobile_number"/>
                <Input placeholder="Confirm Password"
                       label="Confirm Password"
                       className="form-control"
                       type="text"
                       ref="mobile_number"/>
                <Button type="submit" className="pull-right">Change Password</Button>
            </form>
        )
    }
}

export default ChangePassword;