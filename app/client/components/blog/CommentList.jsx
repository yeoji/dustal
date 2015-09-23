import React from 'react';
import Comment from './Comment';
import CommentToggle from './CommentToggle';

class CommentList extends React.Component{
    constructor(props){
        super(props);
        this.state = {comments: this.props.comments, showComments: false}
    }

    loadComments(){

        if(!this.state.showComments){

            //do ajax here
            let commentsTest = [
                {username: "AlanYu", time: "1.49AM", message: "hello alan"},
                {username: "WendyNguyen", time: "3.59 AM", message: "hello wendy"}
            ];

            let comments = commentsTest.concat(this.state.comments);
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
                <Comment username={comment.username} time={comment.time}>{comment.message}</Comment>
            )
        });

        return(
            <div className="commentList">
                <CommentToggle onToggle={this.loadComments.bind(this)} showComments={this.state.showComments}/>
                {commentNodes}
            </div>
        )
    }
}

export default CommentList;