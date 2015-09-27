import React from 'react'
import Post from './Post';
import {Row, Col} from 'react-bootstrap';

class Blog extends React.Component{

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
                    {time : '1.49 AM', message: 'Should I buy a carrot? :rabbit2:',
                        comments: [
                            {username: "AlanYu", time: "2.30AM", message: "No! buy sushi instead :sushi::sushi:"},
                            {username: "WendyNguyen", time: "3.59 AM", message: "Yes!"}
                        ]
                    }
                ]
            },
            {date : date,
                messages : [
                    {time : '1.47 AM', message: 'hello joey',
                        comments: [
                            {username: "AlanYu", time: "1.49 AM", message: "hello alan"},
                            {username: "WendyNguyen", time: "3.59 AM", message: "hello wendy"}
                        ]
                    },
                    {time : '1.47 AM', message: 'hello alan',
                        comments: []
                    },
                    {time : '1.47 AM', message: 'hello bob',
                        comments: []
                    }
                ]
            },
            {date : date,
                messages : [
                    {time : '1.47 AM', message: 'At the supermarket :)',
                        comments: []
                    },
                    {time : '1.49 AM', message: 'omg cool $1',
                        comments: []
                    },
                    {time : '1.49 AM', message: 'Should I buy a carrot? :rabbit2:',
                        comments: [
                            {username: "AlanYu", time: "2.30AM", message: "No! buy sushi instead :sushi::sushi:"},
                            {username: "WendyNguyen", time: "3.59 AM", message: "Yes!"}
                        ]
                    }
                ]
            },
            {date : date,
                messages : [
                    {time : '1.47 AM', message: 'hello joey',
                        comments: [
                            {username: "AlanYu", time: "1.49 AM", message: "hello alan"},
                            {username: "WendyNguyen", time: "3.59 AM", message: "hello wendy"}
                        ]
                    },
                    {time : '1.47 AM', message: 'hello alan',
                        comments: []
                    },
                    {time : '1.47 AM', message: 'hello bob',
                        comments: []
                    }
                ]
            },
            {date : date,
                messages : [
                    {time : '1.47 AM', message: 'At the supermarket :)',
                        comments: []
                    },
                    {time : '1.49 AM', message: 'omg cool $1',
                        comments: []
                    },
                    {time : '1.49 AM', message: 'Should I buy a carrot? :rabbit2:',
                        comments: [
                            {username: "AlanYu", time: "2.30AM", message: "No! buy sushi instead :sushi::sushi:"},
                            {username: "WendyNguyen", time: "3.59 AM", message: "Yes!"}
                        ]
                    }
                ]
            },
            {date : date,
                messages : [
                    {time : '1.47 AM', message: 'hello joey',
                        comments: [
                            {username: "AlanYu", time: "1.49 AM", message: "hello alan"},
                            {username: "WendyNguyen", time: "3.59 AM", message: "hello wendy"}
                        ]
                    },
                    {time : '1.47 AM', message: 'hello alan',
                        comments: []
                    },
                    {time : '1.47 AM', message: 'hello bob',
                        comments: []
                    }
                ]
            }
        ];


        this.state = {posts: data};
    }

    render(){

        let postNodes = this.state.posts.map(function(post){
           return(
               <Post date={post.date} messages={post.messages}/>
           )
        });

        return(
            <div>
                <Row className="blog">
                        <Col lg={8} lgOffset={2}>
                            {postNodes}
                        </Col>
                </Row>
            </div>

        )
    }
}

export default Blog;