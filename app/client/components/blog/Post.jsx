import React from 'react';
import {Link} from 'react-router';
import {Row, Col, Tooltip} from 'react-bootstrap';
import PostDate from './PostDate';
import Message from './Message';
import Comment from './Comment';

class Post extends React.Component{
    constructor(props) {
        super(props);

    }

    render(){

        let commentsTest = [
            {username: "BertramTruong", time: "1.49PM", message: "hello world"},
            {username: "JoeyLee", time: "2.59 PM", message: "hello joey"}
        ];

        return(

            <Row>
                <Col lg={6} lgOffset={3}>
                    <PostDate date={new Date()} />
                    <Message  time="1.47 AM" comments={commentsTest}>wtf</Message>
                    <Message  time="1.47 AM" comments={commentsTest}>hello world</Message>
                </Col>
            </Row>

        )
    }

}

export default Post;