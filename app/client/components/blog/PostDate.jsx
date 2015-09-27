import React from 'react';

class PostDate extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        return(
            <h4 className="date">{this.props.date.toUTCString()}</h4>
        );
    }
}

export default PostDate;