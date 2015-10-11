import React, {Component, PropTypes} from 'react';
import moment from 'moment';

class PostDate extends Component{

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

PostDate.propTypes = {
    date: PropTypes.object
}

export default PostDate;