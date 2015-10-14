import React, {Component} from 'react';
import Emojione from 'emojione';

class EmojiText extends Component{
    constructor(props){
        super(props);
        Emojione.ascii = true;
    }

    render(){
        let html = Emojione.toImage(this.props.children);

        return(
            <span dangerouslySetInnerHTML={{__html: html}} />
        )
    }
}

export default EmojiText;