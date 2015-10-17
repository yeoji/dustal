import React, {Component, PropTypes} from 'react';
import {Modal, Tabs, Tab, Input, Button} from 'react-bootstrap';
import Select from 'react-select';
import UserActions from '../../../actions/UserActions';
import ChangeMobile from '../../account/ChangeMobile';

class VerificationModal extends Component{
    constructor(props){
        super(props);
        this.state = {tab: 2, countryCode: "AU", mobileNumber: ""};
    }

    close(){
        return;
    }

    _handleSelectTab(tab) {
        this.setState({tab});

    }

    _onVerifyNumber(e) {
        e.preventDefault();
        const obj = {};
        obj.verification_code = this.refs.verification_code.getValue();

        this.refs.verification_code.getInputDOMNode().value = "";

        UserActions.verifyNumber(obj);
    }

    render() {


        return (
            <Modal show={this.props.show} onHide={this.close.bind(this)}>
                <Modal.Header>
                    <Modal.Title>Verify Number</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs activeKey={this.state.tab} onSelect={this._handleSelectTab.bind(this)}>
                        <Tab eventKey={1} title="Mobile Details">
                            <ChangeMobile />
                        </Tab>
                        <Tab eventKey={2} title="Verify Mobile">
                            <form onSubmit={this._onVerifyNumber.bind(this)}>
                                <Input placeholder="Verification Code"
                                       className="form-control"
                                       help="You will first need to verify your number before your blog is created."
                                       type="text"
                                       ref="verification_code" />
                                <Button type="submit" className="btn btn-lg btn-default btn-block">Confirm</Button>
                            </form>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>



        );
    }
}

export default VerificationModal;