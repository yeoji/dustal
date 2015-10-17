import React, {Component, PropTypes} from 'react';
import CommentList from './CommentList';
import EmojiText from '../partials/EmojiText';

class Message extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <div className="message user-message">
                    <img className="img-circle display-picture message-picture" src="../../img/dp.jpg"/>
                    <EmojiText>
                        {this.props.children}
                    </EmojiText>
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