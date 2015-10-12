import React, {Component} from 'react';
import $ from 'jquery';
import moment from 'moment';
import {Input} from 'react-bootstrap';
import GeminiScrollbar from 'react-gemini-scrollbar';
import Comment from '../blog/Comment';
import EmojiPreview from './EmojiPreview';
import EmojiSelector from './EmojiSelector';
import AppStore from '../../stores/AppStore';


class EmojiMessage extends React.Component{
    constructor(props){
        super(props);
        this.state = {message: "", showSelector: false, app: AppStore.getState()};
    }

    componentDidMount() {
        AppStore.listen(this.handleClick.bind(this));
    }

    componentWillUnmount() {
        AppStore.unlisten(this.handleClick.bind(this));
    }

    handleClick(event) {
        var target = $(event.target);

        if((!target.is('.emoji-selector') && this.state.showSelector) || target.is('.emoji-picker')){
            this.setState({showSelector: !this.state.showSelector});
        }
    }

    handleChange(event){
        this.setState({message: event.target.value});
    }

    render(){
        return(
            <div className="emoji-wrapper">
                <Comment username="BobLee">{this.state.message}</Comment>

                <div className="emoji-message">
                    <form>
                        <Input type="textarea"
                               placeholder="Send a message"
                               rows="5"
                               onChange={this.handleChange.bind(this)}/>
                    </form>
                    <img className="emoji-picker"
                         width="20px" height="20px"
                         src="http://cdn.jsdelivr.net/emojione/assets/svg/1F604.svg"/>
                    <EmojiSelector show={this.state.showSelector} />
                </div>

            </div>
        )
    }
}



export default EmojiMessage;
