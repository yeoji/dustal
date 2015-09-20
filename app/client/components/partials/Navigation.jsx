import React from "react";
import {Link} from 'react-router';
import UserActions from "../../actions/UserActions";
import {Navbar, Nav, NavItem, Input} from 'react-bootstrap';

class Navigation extends React.Component {

    _doLogOut() {
        UserActions.doLogout();
    }

    render() {

        let loginUrl = '/auth/login';

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
                    <Link to={loginUrl}>Login</Link>
                </Nav>
            </Navbar>
        );
    }
}

Navigation.propTypes = {};

export default Navigation;