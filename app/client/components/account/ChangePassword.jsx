import React, {Component, PropTypes} from 'react';
import {Input, Button, Alert} from 'react-bootstrap';
import UserActions from "../../actions/UserActions";
import UserStore from "../../stores/UserStore";

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {UserStore: UserStore.getState()};
    }

    componentDidMount(){
        UserStore.listen(this.onUserChange.bind(this));
    }

    componentWillUnmount() {
        UserStore.unlisten(this.onUserChange.bind(this));
    }

    onUserChange(state){
        this.setState({UserStore: state});
    }

    _changePassword(e) {
        e.preventDefault();
        const data = {};

        data.curr_pw = this.refs.curr_pw.getValue();
        data.new_pw = this.refs.new_pw.getValue();
        data.confirm_pw = this.refs.confirm_pw.getValue();
        UserActions.changePassword(this.props.userId, data);
    }

    render() {
        let alertNode = (
            <Alert bsStyle="success">
                Your password has been changed.
            </Alert>
        );

        return (
            <form onSubmit={this._changePassword.bind(this)}>
                {this.state.UserStore.changePwSuccess ? alertNode : ''}
                <Input placeholder="Password"
                       label="Password"
                       className="form-control"
                       type="password"
                       ref="curr_pw"/>
                <Input placeholder="New Password"
                       label="New Password"
                       className="form-control"
                       type="password"
                       ref="new_pw"/>
                <Input placeholder="Confirm Password"
                       label="Confirm Password"
                       className="form-control"
                       type="password"
                       ref="confirm_pw"/>
                <Button type="submit" className="pull-right">Change Password</Button>
            </form>
        )
    }
}

export default ChangePassword;