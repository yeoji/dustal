import React, {Component, PropTypes} from 'react';


class Option extends Component{
    render(){
        var obj = this.props.option;
        var gravatarStyle = {
            borderRadius: 3,
            display: 'inline-block',
            marginRight: 10,
            position: 'relative',
            top: -2,
            verticalAlign: 'middle'
        };
        return (
            <div className={this.props.className}>
                <span className={"flag-icon flag-icon-" + obj.value + " flag-icon-squared"}></span>
                {obj.label}
            </div>
        );
    }
}

Option.propTypes = {
    option: PropTypes.object,
    className: PropTypes.string
};

export default Option;