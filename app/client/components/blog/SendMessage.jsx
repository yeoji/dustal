import React from 'react';
import {Input} from 'react-bootstrap';
import Comment from './Comment';
import moment from 'moment';


class SendMessage extends React.Component{
    constructor(props){
        super(props);
        this.state = {message: "", date: moment()};
    }

    componentDidMount() {
        setInterval(this.tick.bind(this), 1000); // Call a method on the mixin
    }

    tick(){
        console.log('render');
        let currentTime = this.state.date.add('1', 'seconds');
        this.setState({date: currentTime});
    }

    handleChange(event){
        this.setState({message: event.target.value});
    }

    render(){
        return(
            <div className="send-message">
                <Comment username={this.props.username} time={this.state.date.format('h:m A')}>{this.state.message}</Comment>
                <form>
                    <Input type="textarea" placeholder="Send a message" rows="5" onChange={this.handleChange.bind(this)} />
                </form>
            </div>
        )
    }
}

export default SendMessage;