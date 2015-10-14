import React, {Component, PropTypes} from 'react';

class CommentToggle extends Component{
    constructor(props){
        super(props);

    }

    handleClick(e){
        e.preventDefault();
        this.props.onClick();
    }

    render(){

        let displayText = this.props.showComments ? 'Hide comments' : 'Show comments';

        return(
            <a className="comment-toggle" onClick={this.handleClick.bind(this)}>{displayText}</a>
        );
    }
}


export default CommentToggle;