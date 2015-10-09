import React from 'react';
import UserActions from "../../actions/UserActions";
import {Modal, Tabs, Tab, Input, Button} from 'react-bootstrap';
import countryPhones from '../../data/country-phone';

class RegisterModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tab: 1};
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

    handleSelect(tab) {
        this.setState({tab});
    }

    nextTab(){
        this.setState({tab: this.state.tab + 1});
    }

    render() {

        let countryNodes = countryPhones.map(function(country){
            return(
                <option value={country.country_code}>
                    {country.country_name + " (" + country.call_code + ")"}
                </option>
            )
        });

        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this._onAuthSubmit.bind(this)}>
                            <Tabs activeKey={this.state.tab} onSelect={this.handleSelect.bind(this)}>
                                <Tab eventKey={1} title="Personal Information">
                                    <Input placeholder="First Name" className="form-control" type="text" ref="first_name"/>
                                    <Input placeholder="Last Name" className="form-control" type="text" ref="last_name"/>
                                    <Input placeholder="E-mail" className="form-control" type="email" ref="email"/>
                                    <Input placeholder="Password" className="form-control" type="password" ref="password"/>
                                    <Button type="button" className="btn btn-lg btn-default btn-block" onClick={this.nextTab.bind(this)}>Next</Button>
                                </Tab>
                                <Tab eventKey={2} title="Mobile Verfication">
                                    <Input type="select">
                                        {countryNodes}
                                    </Input>
                                    <Input placeholder="Number" className="form-control" type="text" ref="number"/>
                                    <Button type="submit" className="btn btn-lg btn-default btn-block">Register</Button>
                                </Tab>
                            </Tabs>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default RegisterModal;