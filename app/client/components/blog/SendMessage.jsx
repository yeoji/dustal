import React from 'react';
import {Input} from 'react-bootstrap';
import ReactEmoji from 'react-emoji';

class SendMessage extends React.Component{
    constructor(props){
        super(props);
        this.state = {html: ""};
    }

    handleChange(event){

        let emojiText = ReactEmoji.emojify(event.target.value, {emojiType: 'emojione'});

        console.log(emojiText);

        this.setState({html: emojiText});

    }

    render(){
        return(
            <form>
                <Input type="textarea" placeholder="Send a message" rows="5" onChange={this.handleChange.bind(this)}
                    value={this.state.html}
                    >
                </Input>
            </form>
        )
    }
}

export default SendMessage;