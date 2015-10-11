import React from 'react';

class ContentEditable extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div id="contenteditable"
                 ref="contenteditable"
                 onInput={this.emitChange.bind(this)}
                 contentEditable
                 dangerouslySetInnerHTML={{__html: this.props.html}}>
            </div>
        );
    }

    emitChange(evt){
        let html = React.findDOMNode(this.refs.contenteditable).innerHTML;
        this.props.onChange(html);
    }
}

export default ContentEditable;
