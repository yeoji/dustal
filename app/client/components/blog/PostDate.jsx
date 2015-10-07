import React from 'react';
import moment from 'moment';

class PostDate extends React.Component{

    constructor(props){
        super(props);
    }

    render(){



        return(
            <div className="date text-center">

                    {moment(this.props.date).format("Do MMMM YYYY")}

            </div>
        );
    }
}

export default PostDate;