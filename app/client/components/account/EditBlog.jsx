import React, {Component, PropTypes} from 'react';
import {Row, Col, Input, ButtonInput} from 'react-bootstrap';

class EditBlog extends Component{
    constructor(props){
        super(props);
        this.state = {private: false}
    }

    _togglePrivateBlog(){
        this.setState({private: !this.state.private});
    }

    render(){

        console.log(this.state.private);

        let passwordNode;

        if(this.state.private){
            passwordNode = <div>
                                <Input type="text" label="Blog Password" placeholder="Blog Password"/>
                                <Input type="text" placeholder="Confirm Password" />
                            </div>
        }

        return(
            <form>
                <Row>
                    <Col lg={12}>
                        <Input type="text" label="Blog Title" value={this.props.username} />
                        <Input type="checkbox" label="Private Blog" checked={this.state.private} onChange={this._togglePrivateBlog.bind(this)}/>
                        {passwordNode}
                        <ButtonInput type="submit" value="Save" className="pull-right"/>
                    </Col>
                </Row>
            </form>
        )
    }
}

export default EditBlog;