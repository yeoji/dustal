import React from "react";
import {Link} from 'react-router';

class Navigation extends React.Component {
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
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

Navigation.propTypes = {};

export default Navigation;