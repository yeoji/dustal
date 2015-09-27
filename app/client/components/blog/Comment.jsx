import React from 'react';
import {Link} from 'react-router';
import ReactEmoji from 'react-emoji';

class Comment extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="message comment">
                <p>
                    {ReactEmoji.emojify(this.props.children)}
                </p>
                <div>
                    <Link to={"/blog/" + this.props.username} className="username">{this.props.username}</Link>
                    <span className="time">{this.props.time}</span>
                </div>
            </div>
        )
    }


}

export default Comment;