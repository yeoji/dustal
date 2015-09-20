import React from "react";
import {Link} from 'react-router';
import {Nav} from 'react-bootstrap';

class Footer extends React.Component {

    render() {

        let aboutUrl = '/about';
        let exploreUrl = '/explore';
        let newsUrl = '/news';
        let contactUrl = '/news';

        return (

                    <Nav navbar ulClassName="footer">
                        <li><Link to={aboutUrl}>About</Link></li>
                        <li><Link to={exploreUrl}>Explore</Link></li>
                        <li><Link to={newsUrl}>News</Link></li>
                        <li><Link to={contactUrl}>Contact Us</Link></li>
                    </Nav>

        );
    }
}



export default Footer;