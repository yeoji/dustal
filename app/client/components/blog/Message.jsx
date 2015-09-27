import React from 'react';
import CommentList from './CommentList';
import ReactEmoji from 'react-emoji';

class Message extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){

        return(
            <div>
                <div className="message user-message">
                    <p>
                        {ReactEmoji.emojify(this.props.children, {emojiType: 'emojione'})}
                    </p>
                    <div>
                        <span className="time">{this.props.time}</span>
                    </div>
                </div>
                <CommentList comments={this.props.comments}/>
            </div>
        )
    }
}

export default Message;