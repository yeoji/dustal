import React, {PropTypes, Component} from "react";
import {Link} from 'react-router';
import {Navbar, NavBrand, CollapsibleNav, Nav, NavItem, Input} from 'react-bootstrap';
import UserActions from "../../actions/UserActions";
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';


class Navigation extends Component {

    constructor(props){
        super(props);
        this.state = {showLoginModal: false, showRegisterModal: false};
    }

    _doLogOut() {
        UserActions.doLogout();
    }

    closeLogin() {
        this.setState({ showLoginModal: false });
    }

    openLogin() {
        this.setState({ showLoginModal: true });
    }

    closeRegister() {
        this.setState({ showRegisterModal: false });
    }

    openRegister() {
        this.setState({ showRegisterModal: true });
    }

    render() {
        var Brand = (
            <Link className="navbar-brand" to="/">Dust</Link>
        );

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
                            <NavItem onClick={this.openRegister.bind(this)}>Sign Up</NavItem>
                            <NavItem onClick={this.openLogin.bind(this)}>Login</NavItem>
                        </Nav>
                    </CollapsibleNav>
                </Navbar>
                <RegisterModal show={this.state.showRegisterModal} close={this.closeRegister.bind(this)}/>
                <LoginModal show={this.state.showLoginModal} close={this.closeLogin.bind(this)}/>
            </div>
        );
    }
}

export default Navigation;