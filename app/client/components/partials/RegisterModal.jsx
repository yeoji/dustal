import React from 'react';
import UserActions from "../../actions/UserActions";
import {Modal, Input, Button} from 'react-bootstrap';

class RegisterModal extends React.Component {

    constructor(props) {
        super(props);
    }

    _onAuthSubmit() {
        console.log('here');

        const user = {};
        user.first_name = this.refs.first_name.getValue();
        user.last_name = this.refs.last_name.getValue();
        user.email = this.refs.email.getValue();
        user.password = this.refs.password.getValue();

        console.log(user);

        UserActions.doRegister(user);

    };

    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this._onAuthSubmit.bind(this)}>
                            <Input placeholder="First Name" className="form-control" type="text" ref="first_name"/>
                            <Input placeholder="Last Name" className="form-control" type="text" ref="last_name"/>
                            <Input placeholder="E-mail" className="form-control" type="email" ref="email"/>
                            <Input placeholder="Password" className="form-control" type="password" ref="password"/>
                            <Button type="submit" className="btn btn-lg btn-default btn-block">Register</Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default RegisterModal;