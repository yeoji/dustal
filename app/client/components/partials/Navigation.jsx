import React, {PropTypes, Component} from "react";
import {Link} from 'react-router';
import {Navbar, NavBrand, CollapsibleNav, Nav, NavItem, Input} from 'react-bootstrap';
import UserActions from "../../actions/UserActions";
import UserStore from '../../stores/UserStore';
import ModalActions from "../../actions/ModalActions";
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';

class Navigation extends Component {

    constructor(props){
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

    showLogin() {
        ModalActions.showLoginModal();
    }

    showRegister() {
        ModalActions.showRegisterModal();
    }

    doLogOut() {
        UserActions.doLogout();
        ModalActions.closeLoginModal();
    }

    render() {
        var Brand = (
            <Link className="navbar-brand" to="/">Dust</Link>
        );

        var loginNode, registerNode;

        let loggedIn = Object.keys(this.state.UserStore.user.toObject()).length !== 0;


        //check if it is an empty object
        if(loggedIn){
            loginNode = <NavItem onClick={this.doLogOut.bind(this)}>Logout</NavItem>;
        }
        else{
            loginNode = <NavItem onClick={this.showLogin.bind(this)}>Login</NavItem>;
        }

        if(!loggedIn){
            registerNode = <NavItem onClick={this.showRegister.bind(this)}>Sign Up</NavItem>;
        }

        return (
                <Navbar toggleNavKey={0} brand={Brand}>
                    <CollapsibleNav eventKey={0}>
                        <Nav navbar>
                            <form className='navbar-form hidden-xs' action="">
                                <Input type="text" placeholder="search"/>
                            </form>
                        </Nav>
                        <Nav navbar right>
                            {registerNode}
                            {loginNode}
                        </Nav>
                    </CollapsibleNav>
                </Navbar>

        );
    }
}

export default Navigation;