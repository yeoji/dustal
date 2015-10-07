import React from 'react';

class CommentToggle extends React.Component{
    constructor(props){
        super(props);

    }

    handleClick(e){
        this.props.onToggle();
    }

    render(){

        let displayText = this.props.showComments ? 'Hide comments' : 'Show comments';

        return(

            <a className="comment-toggle" onClick={this.handleClick.bind(this)}>{displayText}</a>


        );
    }
}

export default CommentToggle;