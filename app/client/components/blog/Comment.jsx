import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import EmojiText from '../partials/EmojiText';

class Comment extends Component{
    constructor(props){
        super(props);
    }

    render(){

        return(
                <div className="message comment">
                    <img className="img-circle display-picture comment-picture" src="../../img/dp.jpg"/>
                    <div className="username">
                        <Link to={"/blog/" + this.props.username}>{this.props.username}</Link>
                    </div>
                    <EmojiText>
                        {this.props.children}
                    </EmojiText>
                    <span className="time">{this.props.time}</span>
                </div>
        )
    }
}

Comment.propTypes = {
    username : PropTypes.string,
    time : PropTypes.string
};

export default Comment;