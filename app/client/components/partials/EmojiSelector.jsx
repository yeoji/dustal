import React, {Component, PropTypes} from 'react';
import Emojione from 'emojione';
import GeminiScrollbar from 'react-gemini-scrollbar'

class EmojiSelector extends Component{

    constructor(props){
        super(props);
    }

    render(){

        if(!this.props.show){
            return null;
        }

        let emojis = ':hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: :hot_pepper: ';

        let html = Emojione.toImage(emojis);

        return(
            <GeminiScrollbar className="emoji-selector">
                <div dangerouslySetInnerHTML={{__html: html}}>
                </div>
            </GeminiScrollbar>
        )
    }
}

EmojiSelector.propTypes = {
    show : PropTypes.bool
}

export default EmojiSelector;