import React from 'react';
import EmojiText from './EmojiText';

class EmojiPreview extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="emoji-preview">
                <EmojiText>
                    {this.props.children}
                </EmojiText>
            </div>
        )
    }
}

export default EmojiPreview;