import React, {Component, PropTypes} from 'react';

class SingleValue extends Component{
    render () {
        var obj = this.props.value;
        var gravatarStyle = {
            borderRadius: 3,
            display: 'inline-block',
            marginRight: 10,
            position: 'relative',
            top: -2,
            verticalAlign: 'middle'
        };

        return (
            <div className="Select-placeholder">
                <span className={"flag-icon flag-icon-" + obj.value + " flag-icon-squared"}></span>
                {obj.label}
            </div>
        );
    }
}

SingleValue.propTypes = {
    value: PropTypes.object
};

export default SingleValue;
