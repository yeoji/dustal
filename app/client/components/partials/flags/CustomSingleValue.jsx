import React, {Component, PropTypes} from 'react';

class SingleValue extends Component{

    constructor(props) {
        super(props);
    }

    render () {
        var obj = this.props.value;

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
