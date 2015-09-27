import React from "react";
import {Link} from 'react-router';
import UserActions from "../../actions/UserActions";
import {Navbar, Nav, NavItem, Input} from 'react-bootstrap';

class Navigation extends React.Component {

    constructor(props){
        super(props);
        this.state = {showLoginModal: false, showRegisterModal: false};
    }

    _doLogOut() {
        UserActions.doLogout();
    }


    render() {

        return (

                <Navbar>
                    <div className="navbar-search">
                        <Nav navbar>
                            <form className='navbar-form' action="">
                                <Input type="text" placeholder="search" className="navbar-search"/>
                            </form>
                        </Nav>
                    </div>
                    <Nav navbar right>
                        <NavItem onClick={this.props.showRegister}>Sign Up</NavItem>
                        <NavItem onClick={this.props.showLogin}>Login</NavItem>
                    </Nav>
                </Navbar>

        );
    }
}

Navigation.propTypes = {};

export default Navigation;