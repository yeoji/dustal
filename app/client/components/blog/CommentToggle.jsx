import React, {Component, PropTypes} from 'react';

class CommentToggle extends Component{
    constructor(props){
        super(props);

    }


    render(){

        let displayText = this.props.show ? 'Hide comments' : 'Show comments';

        return(
            <a className="comment-toggle" onClick={this.props.onClick}>{displayText}</a>
        );
    }
}


export default CommentToggle;