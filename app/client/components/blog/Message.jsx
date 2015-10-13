import React, {Component, PropTypes} from 'react';
import CommentList from './CommentList';
import ReactEmoji from 'react-emoji';

class Message extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <div className="message user-message clearfix pull-right">
                    <span>
                        {ReactEmoji.emojify(this.props.children, {emojiType: 'emojione'})}
                    </span>
                    <div>
                        <span className="time">{this.props.time}</span>
                    </div>
                </div>
                <CommentList comments={this.props.comments}/>
            </div>
        )
    }
}
Message.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
    time: PropTypes.string
};

export default Message;