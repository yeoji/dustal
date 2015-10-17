import React, {Component, PropTypes} from 'react';
import {Input, Button} from 'react-bootstrap';
import Select from 'react-select';
import UserActions from '../../actions/UserActions';
import UserStore from '../../stores/UserStore';
import CustomOption from '../partials/flags/CustomOption';
import CustomValue from '../partials/flags/CustomSingleValue';
import countryPhones from '../../data/country-phone';

class ChangeMobile extends Component{
    constructor(props){
        super(props);
        this.state = {tab: 2, countryCode: "AU", mobileNumber: "", UserStore: UserStore.getState()};
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

    _countryChange(val) {
        this.setState({countryCode: val});
    }

    _onResendNumber(e){
        e.preventDefault();

        const mobile = {};
        mobile.country_code = this.state.countryCode;
        mobile.number = this.refs.mobile_number.getValue();

        UserActions.resendNumber(mobile);

    }

    render(){
        return(
            <form onSubmit={this._onResendNumber.bind(this)}>
                <Select
                    ref="country_code"
                    value={this.state.countryCode}
                    options={countryPhones}
                    optionComponent={CustomOption}
                    singleValueComponent={CustomValue}
                    clearable={false}
                    onChange={this._countryChange.bind(this)}
                    />
                <Input placeholder="Mobile Number"
                       className="form-control"
                       type="text"
                       ref="mobile_number"
                       defaultValue={this.state.mobileNumber}/>
                <Button type="submit" className="pull-right">Resend Code</Button>
            </form>
        )
    }
}

export default ChangeMobile;