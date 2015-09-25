import React from "react";
import {Link} from 'react-router';
import UserActions from "../../actions/UserActions";
import {Navbar, Nav, NavItem, Input} from 'react-bootstrap';
import Login from '../auth/LoginForm';
import Register from '../auth/RegisterForm';

class Navigation extends React.Component {

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

        return (
            <div>
                <Navbar>
                    <div className="navbar-search">
                        <Nav navbar>
                            <form className='navbar-form' action="">
                                <Input type="text" placeholder="search" className="navbar-search"/>
                            </form>
                        </Nav>
                    </div>
                    <Nav navbar right>
                        <NavItem onClick={this.openRegister.bind(this)}>Sign Up</NavItem>
                        <NavItem onClick={this.openLogin.bind(this)}>Login</NavItem>
                    </Nav>
                </Navbar>
                <Login show={this.state.showLoginModal} close={this.closeLogin.bind(this)}/>
                <Register show={this.state.showRegisterModal} close={this.closeRegister.bind(this)}/>
            </div>
        );
    }
}

Navigation.propTypes = {};

export default Navigation;