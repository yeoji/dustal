import React from "react";
import {Link} from 'react-router';
import UserActions from "../../actions/UserActions";
import {Navbar, Nav, NavItem, Input} from 'react-bootstrap';

class Navigation extends React.Component {

    _doLogOut() {
        UserActions.doLogout();
    }

    render() {
        return (
            <Navbar>
                <Nav navbar>
                    <input type="text" className="form-control navbar-search" placeholder="search"/>
                </Nav>
                <Nav navbar right>
                    <NavItem href="#">Login</NavItem>
                </Nav>
            </Navbar>
        );
    }
}

Navigation.propTypes = {};

export default Navigation;