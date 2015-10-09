import React from 'react';
import {Link} from 'react-router';
import EmojiText from '../partials/EmojiText';

class Comment extends React.Component{
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
                    <div>
                        <span className="time">{this.props.time}</span>
                    </div>
                </div>
        )
    }


}

export default Comment;