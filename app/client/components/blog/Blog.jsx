import React, {Component} from 'react'
import Post from './Post';
import {Row, Col} from 'react-bootstrap';

class Blog extends Component {

    constructor(props){
        super(props);

        let date = new Date();

        //test data can be deleted
        var data = [
            {date : date,
                messages : [
                    {time : '1.47 AM', message: 'At the supermarket :)',
                        comments: []
                    },
                    {time : '1.49 AM', message: 'omg cool $1',
                        comments: []
                    },
                    {time : '1.49 AM', message: 'Should I buy a carrot? :rabbit2: this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text ',
                        comments: [
                            {username: "AlanYu", time: "2.30AM", message: "No! buy sushi instead :sushi::sushi:"},
                            {username: "WendyNguyen", time: "3.59 AM", message: ":D nice <3 this works perfectly now :flag_au: :hot_pepper:"}
                        ]
                    }
                ]
            },
            {date : date,
                messages : [
                    {time : '1.49 AM', message: '',
                        comments: [
                            {username: "BertramTruong", time: "2.30AM", message: "It's a piece of shit :smirk:"}
                        ]
                    },
                    {time : '1.47 AM', message: 'Web design is so hard :(',
                        comments: []
                    }
                ]
            },
            {date : date,
                messages : [
                    {time : '1.49 AM', message: 'React JS is awesome :D ',
                        comments: [
                            {username: "BertramTruong", time: "2.30AM", message: "It's a piece of shit :smirk:"}
                        ]
                    },
                    {time : '1.47 AM', message: 'Web design is so hard :(',
                        comments: []
                    }
                ]
            },
            {date : date,
                messages : [
                    {time : '1.49 AM', message: 'React JS is awesome :D ',
                        comments: [
                            {username: "BertramTruong", time: "2.30AM", message: "It's a piece of shit :smirk:"}
                        ]
                    },
                    {time : '1.47 AM', message: 'Web design is so hard :(',
                        comments: []
                    }
                ]
            }
        ];


        this.state = {posts: data};
    }

    render(){

        //break up the first posts and other posts
        let firstPost = <Post date={this.state.posts[0].date} messages={this.state.posts[0].messages} first={true}/>

        let posts = this.state.posts.slice(1, this.state.posts.length);

        let postNodes = posts.map(function(post, i){
            return(
                <Post date={post.date} messages={post.messages} first={false}/>
            );
        });

        return(
            <div>
                <Row className="blog">
                    <Col lg={6} lgOffset={3}>
                        {firstPost}
                        {postNodes}
                    </Col>
                </Row>
            </div>

        )
    }
}

export default Blog;