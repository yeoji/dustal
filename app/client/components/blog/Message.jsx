import React from 'react';
import CommentList from './CommentList';

class Message extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){

        return(
            <div>
                <div className="message post">
                    <p>
                        {this.props.children}
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