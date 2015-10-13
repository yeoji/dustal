import React, {Component, PropTypes} from 'react';
import Comment from './Comment';
import CommentToggle from './CommentToggle';

class CommentList extends Component{
    constructor(props){
        super(props);
        this.state = {comments: this.props.comments, showComments: false}
    }

    loadComments(){

        if(!this.state.showComments){

            //do ajax here
            let loadComments = [
                {username: "Bob", time: "1.49AM", message: "hello alan"},
                {username: "Bob", time: "3.59 AM", message: "hello wendy"}
            ];

            let comments = loadComments.concat(this.state.comments);
            this.setState({comments: comments});
        }
        else{
            this.setState({comments: this.props.comments});
        }

        this.setState({showComments: !this.state.showComments});
    }

    render(){
        let commentNodes = this.state.comments.map(function(comment){
            return(
                <Comment username={comment.username} time="1.47 AM">{comment.message}</Comment>
            )
        });


        return(
            <div className="commentList">
                {(() => {
                    if(this.state.comments.length !== 0){
                        return(
                            <CommentToggle onClick={this.loadComments.bind(this)} showComments={this.state.showComments}/>
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