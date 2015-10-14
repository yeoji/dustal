import React, {Component, PropTypes} from 'react';
import {Modal, Tabs, Tab, Input, Button} from 'react-bootstrap';
import Select from 'react-select';
import CustomOption from '../flags/CustomOption';
import CustomValue from '../flags/CustomSingleValue';
import countryPhones from '../../../data/country-phone';

class VerificationModal extends Component{
    constructor(props){
        super(props);
        this.state = {country_code: "AU"};
    }

    countryChange(val) {
        this.setState({country_code: val});
    }

    _onAuthSubmit(e) {
        e.preventDefault();
        const user = {};
    };

    close(){
        return;
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.close.bind(this)}>
                <Modal.Header>
                    <Modal.Title>Verify Number</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this._onAuthSubmit.bind(this)}>
                        <Select
                            ref="country_code"
                            value={this.state.country_code}
                            options={countryPhones}
                            optionComponent={CustomOption}
                            singleValueComponent={CustomValue}
                            clearable={false}
                            onChange={this.countryChange.bind(this)}
                            />
                        <Input placeholder="Mobile Number"
                               className="form-control"
                               type="text"
                               ref="mobile_number" />
                        <Input placeholder="Verification Code"
                               className="form-control"
                               help="You will first need to verify your number before your blog is created."
                               type="text"
                               ref="verification_code" />
                        <Button type="submit" className="btn btn-lg btn-default btn-block">Confirm</Button>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default VerificationModal;