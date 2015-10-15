import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import AccountOverview from './AccountOverview';
import UserStore from '../../stores/UserStore';
import countryPhones from '../../data/country-phone';

class Account extends Component{

    constructor(props){
        super(props);
        this.state = {tab : 1, UserStore: UserStore.getState()}
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

    handleSelect(selectedKey) {
        this.setState({tab: selectedKey});
    }

    findCountryByCode(countryPhone){

        if(this.state.UserStore.user.get('mobile').get('country_code') === countryPhone.value){
            return countryPhone.label;
        };
    }

    render(){
        var user = {
            username: "",
            email: "",
            countryCode: "",
            mobileNumber: ""
        };

        if(Object.keys(this.state.UserStore.user.toObject()).length !== 0){
            user.username =  this.state.UserStore.user.get('username');
            user.email = this.state.UserStore.user.get('email');
            user.mobileNumber = this.state.UserStore.user.get('mobile').get('number');
            user.countryCode = countryPhones.filter(this.findCountryByCode.bind(this))[0];
        }
        return(
            <Row>
                <Col lg={8} lgOffset={2} className="settings">
                    <h3>My Account</h3>
                    <Row className="settings">
                        <Col lg={2}>
                            <ul className="settings-selection">
                                <li><a>Account Overview</a></li>
                                <li><a>Edit Blog</a></li>
                                <li><a>Change Mobile</a></li>
                                <li><a>Change Number</a></li>
                            </ul>
                        </Col>
                        <Col lg={10}>
                            <div className="settings-wrapper">
                                <Row>
                                    <Col lg={10} lgOffset={1}>
                                        <AccountOverview
                                            username={user.username}
                                            email={user.email}
                                            countryCode={user.countryCode}
                                            mobileNumber={user.mobileNumber}
                                            />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>

        )

    }
}

export default Account;