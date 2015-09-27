import React from 'react';
import {Input} from 'react-bootstrap';

class EmojiMessage extends React.Component{
    constructor(props){
        super(props);
        this.state = {show: true}
    }

    handleClick(){

    }

    render(){
        return(
            <div className="emoji-message">
                <form>
                    <Input type="textarea"
                           placeholder="Send a message"
                           rows="5"
                           onChange={this.props.onChange}/>

                </form>
                <img onClick={this.handleClick.bind(this)} className="emoji-selector" className="emoji-selector" width="20px" height="20px" src="http://cdn.jsdelivr.net/emojione/assets/svg/1F604.svg"/>

            </div>

        )
    }
}

export default EmojiMessage;
