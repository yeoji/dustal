import React from 'react';
import Comment from './Comment';
import EmojiMessage from '../partials/EmojiMessage'
import moment from 'moment';


class SendMessage extends React.Component{
    constructor(props){
        super(props);
        this.state = {message: "", date: moment()};
    }

    render(){
        return(
            <div className="send-message">
                <EmojiMessage />
            </div>
        )
    }
}

export default SendMessage;