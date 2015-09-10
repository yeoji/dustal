import React from "react";
import styles from "./auth/AuthForm.styles";
import {Row} from 'react-bootstrap';

class Hello extends React.Component {

    render() {
        return (
            <Row className='show-grid'>
                <div style={{marginTop: '100px'}} className="text-center">
                    <h1 style={ styles.heading }>Hello World!</h1>
                </div>
            </Row>
        );
    }
}

Hello.propTypes = {
    UserStore: React.PropTypes.object
};

export default Hello;