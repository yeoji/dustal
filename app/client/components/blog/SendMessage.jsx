import React from 'react';
import Comment from './Comment';
import EmojiMessage from '../partials/EmojiMessage'
import moment from 'moment';


class SendMessage extends React.Component{
    constructor(props){
        super(props);
        this.state = {message: "", date: moment()};
    }

    componentDidMount() {
        setInterval(this.tick.bind(this), 1000000); // Call a method on the mixin
    }

    tick(){
        let currentTime = this.state.date.add('1', 'seconds');
        this.setState({date: currentTime});
    }

    handleChange(event){
        this.setState({message: event.target.value});
    }

    render(){
        return(
            <div className="send-message">
                <Comment username={this.props.username} time={this.state.date.format('h:mm A')}>{this.state.message}</Comment>
                <EmojiMessage onChange={this.handleChange.bind(this)} />
            </div>
        )
    }
}

export default SendMessage;