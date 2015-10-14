import React, {Component, PropTypes} from 'react';
import {Row, Col, Nav, NavItem} from 'react-bootstrap';
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
        if(this.state.UserStore.user.get('mobile').country_code === countryPhone.value){
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
            user.mobileNumber = this.state.UserStore.user.get('mobile').number;
            user.countryCode = countryPhones.filter(this.findCountryByCode.bind(this))[0];
        }

        return(
            <Row className="account-wrapper">
                <Col lg={8} lgOffset={2}>
                    <Nav bsStyle="tabs" activeKey={this.state.tab} onSelect={this.handleSelect.bind(this)}>
                        <NavItem eventKey={1}>Account Overview</NavItem>
                        <NavItem eventKey={2}>Change Password</NavItem>
                        <NavItem eventKey={3}>Change Mobile</NavItem>
                    </Nav>
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

        )
    }
}

export default Account;