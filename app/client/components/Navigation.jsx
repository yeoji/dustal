import React from "react";
import {Link} from 'react-router';
import UserActions from "../actions/UserActions";

class Navigation extends React.Component {

    _doLogOut() {
        UserActions.doLogout();
    }

    render() {
        return (
            <nav className="navbar navbar-findcond navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#"></a>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="nav navbar-nav navbar-left">
                            <li><Link to="/dashboard">DASHBOARD</Link></li>
                            <li><Link to="/auth/login">LOG IN</Link></li>
                            <li><a href="#" onClick={this._doLogOut}>LOG OUT</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

Navigation.propTypes = {};

export default Navigation;