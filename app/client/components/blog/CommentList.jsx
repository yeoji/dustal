import React, {Component, PropTypes} from 'react';
import Comment from './Comment';
import CommentToggle from './CommentToggle';

class CommentList extends Component{
    constructor(props){
        super(props);
        this.state = {showComments: false};
    }


    _showComments(e){
        e.preventDefault();
        console.log('here');
        this.setState({showComments: !this.state.showComments});
    }

    render(){
        let commentNodes = this.props.comments.map(function(comment, i){
            return(
                <Comment key={i} username={comment.username} time="1.47 AM">{comment.message}</Comment>
            )
        });

        //if it's larger than 2 and we don't want to show all comments comments
        if(this.props.comments.length > 2 && !this.state.showComments){
            let length = commentNodes.length;
            commentNodes = commentNodes.slice(length - 2, length);
        }

        return(
            <div className="commentList">
                {(() => {
                    if(this.props.comments.length > 2){
                        return(
                            <CommentToggle onClick={this._showComments.bind(this)} show={this.state.showComments}/>
                        )
                    }
                })()}
                {commentNodes}
            </div>
        )
    }
}

CommentList.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object)
};



export default CommentList;