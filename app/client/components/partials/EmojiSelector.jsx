import React from 'react';
import Emojione from 'emojione';
import GeminiScrollbar from 'react-gemini-scrollbar'

class EmojiSelector extends React.Component{

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

export default EmojiSelector;