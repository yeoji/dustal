import React, {Component, PropTypes} from 'react';


class Option extends Component{
    render(){
        var obj = this.props.option;
        return (
            <div className={this.props.className}
                 onMouseEnter={this.props.mouseEnter}
                 onMouseLeave={this.props.mouseLeave}
                 onMouseDown={this.props.mouseDown}
                 onClick={this.props.mouseDown}>
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