import React, {Component, PropTypes} from 'react';
import {Row, Col, Input, ButtonInput, Alert} from 'react-bootstrap';
import BlogActions from "../../actions/BlogActions";
import BlogStore from "../../stores/BlogStore";

class EditBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {private: this.props.blog.get('private'), BlogStore: BlogStore.getState()}
    }

    componentDidMount(){
        BlogStore.listen(this.onBlogChange.bind(this));
    }

    componentWillUnmount() {
        BlogStore.unlisten(this.onBlogChange.bind(this));
    }

    onBlogChange(state) {
        this.setState({BlogStore: state});
    }

    _togglePrivateBlog() {
        this.setState({private: !this.state.private});
    }

    _onEditBlog(e) {
        e.preventDefault();
        const data = {};
        data.title = this.refs.title.getValue();
        data.private = this.refs.private.getChecked();
        if (data.private) {
            // no pw confirmation
            data.password = this.refs.password.getValue();
        }
        BlogActions.updateBlog(this.props.blog.get('name'), data);
    }

    render() {

        let passwordNode;

        if (this.state.private) {
            passwordNode = <div>
                <Input type="password" ref="password" label="Blog Password" placeholder="Blog Password"/>
                <Input type="password" ref="confirm_pw" placeholder="Confirm Password"/>
            </div>
        }

        let alertNode = (
            <Alert bsStyle="success">
                Blog details updated successfully!
            </Alert>
        );

        return (
            <form onSubmit={this._onEditBlog.bind(this)}>
                <Row>
                    <Col lg={12}>
                        {this.state.BlogStore.updateSuccess ? alertNode : ''}
                    </Col>
                    <Col lg={12}>
                        <Input type="text" ref="title" label="Blog Title" defaultValue={this.props.blog.get('title')}/>
                        <Input type="checkbox" ref="private" label="Private Blog" checked={this.state.private}
                               onChange={this._togglePrivateBlog.bind(this)}/>
                        {passwordNode}
                        <ButtonInput type="submit" value="Save" className="pull-right"/>
                    </Col>
                </Row>
            </form>
        )
    }
}

export default EditBlog;