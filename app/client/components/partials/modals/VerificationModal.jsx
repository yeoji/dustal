import React, {Component, PropTypes} from 'react';
import {Modal, Tabs, Tab, Input, Button} from 'react-bootstrap';
import Select from 'react-select';
import UserActions from '../../../actions/UserActions';
import UserStore from '../../../stores/UserStore';
import CustomOption from '../flags/CustomOption';
import CustomValue from '../flags/CustomSingleValue';
import countryPhones from '../../../data/country-phone';

class VerificationModal extends Component{
    constructor(props){
        super(props);
        this.state = {countryCode: "AU", mobileNumber: "", UserStore: UserStore.getState()};
    }

    componentDidMount(){
        UserStore.listen(this.onUserChange.bind(this));
    }

    componentWillUnMount(){
        UserStore.listen(this.onUserChange.bind(this));
    }

    onUserChange(state){
        this.setState({UserStore: state});

        if(Object.keys(this.state.UserStore.user.toObject()).length !== 0){
            this.setState({
                countryCode: this.state.UserStore.user.get('mobile').country_code,
                mobileNumber: this.state.UserStore.user.get('mobile').number
            })
        }
    }

    countryChange(val) {
        this.setState({countryCode: val});
    }

    _onAuthSubmit(e) {
        e.preventDefault();
        const user = {};
    };

    close(){
        return;
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
                    <form onSubmit={this._onVerifyNumber.bind(this)}>
                        <Select
                            ref="country_code"
                            value={this.state.countryCode}
                            options={countryPhones}
                            optionComponent={CustomOption}
                            singleValueComponent={CustomValue}
                            clearable={false}
                            onChange={this.countryChange.bind(this)}
                            />
                        <Input placeholder="Mobile Number"
                               className="form-control"
                               type="text"
                               ref="mobile_number"
                               value={this.state.mobileNumber}/>
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