import React, {Component, PropTypes} from 'react';
import {Input} from 'react-bootstrap';
import {Link} from 'react-router';
import PostDate from './PostDate';
import Message from './Message';
import Comment from './Comment';

class Post extends Component{
    constructor(props) {
        super(props);
    }
    render(){

        let messageNodes = this.props.messages.map(function(m, i){

            return(
                <Message key={i} time={m.time} comments={m.comments}>{m.message}</Message>
            )
        });

        return(

            <div className="post clearfix">
                <PostDate date={this.props.date}/>
                {messageNodes}
            </div>

        )
    }
}

Post.propTypes = {
    date: PropTypes.object,
    messages: PropTypes.arrayOf(PropTypes.object)
};

export default Post;