import React from 'react';
import {Input} from 'react-bootstrap';
import {Link} from 'react-router';
import PostDate from './PostDate';
import Message from './Message';
import Comment from './Comment';
import SendMessage from './SendMessage'

class Post extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){

        let messageNodes = this.props.messages.map(function(m){

            return(
                <Message time={m.time} comments={m.comments}>{m.message}</Message>
            )
        });

        return(

            <div className="post">
                <PostDate date={this.props.date}/>
                {messageNodes}
                <SendMessage username="JoeyLee"/>
            </div>

        )
    }

}

export default Post;