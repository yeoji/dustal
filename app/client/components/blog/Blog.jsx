import React, {Component} from 'react'
import Post from './Post';
import {Row, Col} from 'react-bootstrap';
import BlogStore from '../../stores/BlogStore';


class Blog extends Component {

    constructor(props){
        super(props);

        let date = new Date();
        this.state = {BlogStore: BlogStore.getState()};
    }

    render(){

        let posts = this.state.BlogStore.posts;

        let postNodes = posts.map(function(post, i){
            return(
                <Post date={post.date} messages={post.messages} first={false}/>
            );
        });

        return(
            <div>
                <Row className="blog">
                    <Col lg={6} lgOffset={3}>
                        {postNodes}
                    </Col>
                </Row>
            </div>

        )
    }
}

export default Blog;