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
            <div className="comment-toggle">
                <span>
                    <a onClick={this.handleClick.bind(this)}>{displayText}</a>
                </span>
            </div>
        );
    }
}

export default CommentToggle;