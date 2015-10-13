import React, {PropTypes, Component} from "react";
import {Link} from 'react-router';
import {Navbar, NavBrand, CollapsibleNav, Nav, NavItem, Input} from 'react-bootstrap';
import UserActions from "../../actions/UserActions";
import UserStore from '../../stores/UserStore';
import ModalActions from "../../actions/ModalActions";
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

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
        this.state.UserStore = state;
    }

    showLogin() {
        ModalActions.showLoginModal();
    }

    showRegister() {
        ModalActions.showRegisterModal();
    }

    doLogOut() {
        UserActions.doLogout();
    }

    render() {
        var Brand = (
            <Link className="navbar-brand" to="/">Dust</Link>
        );

        var loginNode;

        //check if it is an empty object
        if(Object.keys(this.state.UserStore.user.toObject()).length === 0){
            loginNode = <NavItem onClick={this.showLogin.bind(this)}>Login</NavItem>;
        }
        else{
            loginNode = <NavItem onClick={this.doLogOut.bind(this)}>Logout</NavItem>;
        }

        return (
            <div>
                <Navbar toggleNavKey={0} brand={Brand}>
                    <CollapsibleNav eventKey={0}>
                        <Nav navbar>
                            <form className='navbar-form' action="">
                                <Input type="text" placeholder="search" className="navbar-search"/>
                            </form>
                        </Nav>
                        <Nav navbar right>
                            <NavItem onClick={this.showRegister.bind(this)}>Sign Up</NavItem>
                            {loginNode}
                        </Nav>
                    </CollapsibleNav>
                </Navbar>
            </div>
        );
    }
}

export default Navigation;