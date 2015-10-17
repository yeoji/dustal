import React from "react";
import {Row, Col} from "react-bootstrap";
import SetupUser from "./SetupUser";
import SetupBlog from "./SetupBlog";
import UserStore from '../../stores/UserStore';

class Setup extends React.Component {

    constructor(props){
        super(props);
        this.state = {UserStore: UserStore.getState()}
    }

    componentDidMount(){
        UserStore.listen(this.onUserChange.bind(this));
    }

    componentWillUnmount() {
        UserStore.unlisten(this.onUserChange.bind(this));
    }

    onUserChange(state){
        this.setState({UserStore: state});
    }

    render() {
        return (
            <Row className="text-center">
                <Col lg={12}>
                    <h1>Welcome to Dustal!</h1>
                    <p>Please follow the instructions below to set up your blog</p>
                    <br/>
                    <SetupUser user={this.state.UserStore.user} />
                    <SetupBlog username={this.state.UserStore.user.get('username')} />
                </Col>
            </Row>
        );
    }
}

Setup.propTypes = {

};

export default Setup;