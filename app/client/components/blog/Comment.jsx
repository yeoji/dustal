import React from 'react';
import {Link} from 'react-router';
import EmojiText from '../partials/EmojiText';

class Comment extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        return(
            <div className="message comment">
                <EmojiText>
                    {this.props.children}
                </EmojiText>
                <div>
                    <Link to={"/blog/" + this.props.username} className="username">{this.props.username}</Link>
                    <span className="time">{this.props.time}</span>
                </div>
            </div>
        )
    }


}

export default Comment;