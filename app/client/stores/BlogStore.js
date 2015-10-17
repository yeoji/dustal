import alt from '../alt';
import Immutable from "immutable";
import routerInstance from "../routerInstance";

class BlogStore{
    constructor(){
        let date = new Date();

        this.posts  = [
            {date : date,
                messages : [
                    {time : '1.47 AM', message: 'At the supermarket :) :hot_pepper:',
                        comments: []
                    },
                    {time : '1.49 AM', message: 'omg cool $1',
                        comments: []
                    },
                    {time : '1.49 AM', message: 'Should I buy a carrot? :rabbit2: this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text ',
                        comments: [
                            {username: "AlanYu", time: "2.30AM", message: "No! buy sushi instead :sushi::sushi:"},
                            {username: "WendyNguyen", time: "3.59 AM", message: ":D nice <3 this works perfectly now :flag_au: :hot_pepper:"},
                            {username: "AlanYu", time: "2.30AM", message: "No! buy sushi instead :sushi::sushi:"},
                            {username: "WendyNguyen", time: "3.59 AM", message: ":D nice <3 this works perfectly now :flag_au: :hot_pepper:"},
                            {username: "AlanYu", time: "2.30AM", message: "No! buy sushi instead :sushi::sushi:"},
                            {username: "WendyNguyen", time: "3.59 AM", message: ":D nice <3 this works perfectly now :flag_au: :hot_pepper:"}
                        ]
                    }
                ]
            },
            {date : date,
                messages : [
                    {time : '1.47 AM', message: 'Web design is so hard :(',
                        comments: []
                    }
                ]
            },
            {date : date,
                messages : [
                    {time : '1.49 AM', message: 'React JS is awesome :D ',
                        comments: [
                            {username: "BertramTruong", time: "2.30AM", message: "Should I buy a carrot? :rabbit2: this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text this is going to be a really long text "}
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
    }

}

export default alt.createStore(BlogStore, 'BlogStore');