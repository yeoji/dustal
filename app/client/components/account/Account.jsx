import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'react-bootstrap';
import AccountOverview from './AccountOverview';
import EditBlog from './EditBlog';
import ChangeMobile from './ChangeMobile';
import ChangePassword from './ChangePassword';
import UserStore from '../../stores/UserStore';
import BlogStore from '../../stores/BlogStore';
import countryPhones from '../../data/country-phone';

class Account extends Component{

    constructor(props){
        super(props);
        this.state = {tab : 1, UserStore: UserStore.getState(), BlogStore: BlogStore.getState()}
    }

    componentDidMount(){
        UserStore.listen(this.onUserChange.bind(this));
        BlogStore.listen(this.onBlogChange.bind(this));
    }

    componentWillUnmount() {
        UserStore.unlisten(this.onUserChange.bind(this));
        BlogStore.unlisten(this.onBlogChange.bind(this));
    }

    onUserChange(state){
        this.setState({UserStore: state});
    }

    onBlogChange(state) {
        this.setState({BlogStore: state});
    }

    _findCountryByCode(countryPhone){
        if(this.state.UserStore.user.get('mobile').get('country_code') === countryPhone.value){
            return countryPhone.label;
        }
    }

    _handleSelection(tab){
        this.setState({tab: tab});
    }

    _editBlog(e){
        e.preventDefault();
        this.setState({tab: 2});
    }

    render(){
        var user = {
            username: "",
            email: "",
            countryCode: {value: '', label: ''},
            mobileNumber: ""
        };

        if(Object.keys(this.state.UserStore.user.toObject()).length !== 0){
            user.username =  this.state.UserStore.user.get('username');
            user.email = this.state.UserStore.user.get('email');
            user.mobileNumber = this.state.UserStore.user.get('mobile').get('number');
            user.countryCode = countryPhones.filter(this._findCountryByCode.bind(this))[0];
        }

        let selection;


        if(this.state.tab === 2){
            selection = <EditBlog blog={this.state.BlogStore.blog}/>
        }
        else if(this.state.tab === 3){
            selection = <ChangeMobile />
        }
        else if(this.state.tab === 4){
            selection = <ChangePassword userId={this.state.UserStore.user.get('id')}/>
        }
        else{
            selection = <AccountOverview
                username={user.username}
                email={user.email}
                countryCode={user.countryCode}
                mobileNumber={user.mobileNumber}
                profileImg={this.state.UserStore.user.get('profile_img')}
                blog={this.state.BlogStore.blog}
                onClick={this._editBlog.bind(this)}
                />
        }

        return(
            <Row>
                <Col lg={8} lgOffset={2} className="settings">
                    <h3>My Account</h3>
                    <Row className="settings">
                        <Col lg={2}>
                            <ul className="settings-selection">
                                <li onClick={this._handleSelection.bind(this, 1)}><a>Account Overview</a></li>
                                <li onClick={this._handleSelection.bind(this, 2)}><a>Edit Blog</a></li>
                                <li onClick={this._handleSelection.bind(this, 3)}><a>Change Mobile</a></li>
                                <li onClick={this._handleSelection.bind(this, 4)}><a>Change Password</a></li>
                            </ul>
                        </Col>
                        <Col lg={10}>
                            <div className="settings-wrapper">
                                <Row>
                                    <Col lg={10} lgOffset={1}>
                                        {selection}
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