import React from 'react';
import moment from 'moment';

class PostDate extends React.Component{

    constructor(props){
        super(props);
    }

    render(){



        return(
            <div className="date text-center">
                <h4>
                    {moment(this.props.date).format("Do MMMM YYYY")}
                </h4>
            </div>
        );
    }
}

export default PostDate;