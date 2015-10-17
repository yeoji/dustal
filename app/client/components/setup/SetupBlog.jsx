import React from "react";
import {Row, Col, Input, ButtonInput} from "react-bootstrap";
import BlogActions from "../../actions/BlogActions";

class SetupBlog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {private: false}
    }

    _togglePrivateBlog() {
        this.setState({private: !this.state.private});
    }

    _onFormSubmit(e) {
        e.preventDefault();
        const form = e.target.elements;
        let data = {};

        data.name = this.props.username;
        data.title = form.blogTitle.value;
        data.private = form.private.checked;
        if(data.private) {
            data.password = form.password.value;
        }
        BlogActions.createBlog(data);
    }

    render() {

        let passwordNode;

        if (this.state.private) {
            passwordNode = <div>
                <Input type="text" name="password" label="Blog Password" placeholder="Blog Password"/>
                <Input type="text" name="confirmPassword" placeholder="Confirm Password"/>
            </div>
        }

        return (
            <form onSubmit={this._onFormSubmit.bind(this)}>
                <Row>
                    <h2>2) Set up your blog</h2>
                    <Col lg={4} lgOffset={4}>
                        <span>Your blog will be published at:</span>

                        <h3 style={{ marginBottom: '20px' }}>https://dustal.yeoji.com/{ this.props.username }</h3>
                        <Input type="text" name="blogTitle" label="Blog Title" defaultValue={this.props.username}/>
                        <Input type="checkbox" name="private" label="Private Blog" checked={this.state.private}
                               onChange={this._togglePrivateBlog.bind(this)}/>
                        {passwordNode}
                    </Col>
                </Row>
                <ButtonInput style={{margin: '20px'}} type="submit" value="Start Posting!"/>
            </form>
        );
    }
}

SetupBlog.propTypes = {};

export default SetupBlog;