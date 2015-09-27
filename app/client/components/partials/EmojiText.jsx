import React from 'react';
import Emojione from 'emojione';

class EmojiText extends React.Component{
    constructor(props){
        super(props);
        Emojione.ascii = true;
    }

    render(){
        let html = Emojione.toImage(this.props.children);

        console.log(html);

        return(
            <span className="emoji-text" dangerouslySetInnerHTML={{__html: html}} />

        )
    }
}

export default EmojiText;