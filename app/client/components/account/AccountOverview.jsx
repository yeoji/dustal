import React, {Component, PropTypes} from 'react';
import Select from 'react-select';
import {Row, Col, Input, ButtonInput} from 'react-bootstrap';
import CustomOption from '../partials/flags/CustomOption';
import CustomValue from '../partials/flags/CustomSingleValue';
import ProfilePicture from '../partials/ProfilePicture';

class AccountOverview extends Component{
    constructor(props){
        super(props);
    }

    render(){

        return(
            <form className="account-overview">
                <Row>
                    <Col lg={12}>
                        <ProfilePicture />
                        <Input type="text" label="Username" value={this.props.username} disabled/>
                        <Input type="text" label="Email" value={this.props.email} disabled/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <div className="form-group">
                            <label className="control-label">
                                <span>Country Code</span>
                            </label>
                            <div className="Select-control">
                                <CustomValue value={this.props.countryCode}/>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <Input type="text" label="Mobile Number" value={this.props.mobileNumber} disabled/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Input type="text" label="Blog Title" value="" disabled/>
                        <Input type="checkbox" label="Private Blog" checked readOnly />
                        <ButtonInput type="submit" value="Edit Blog" className="pull-right" onClick={this.props.onClick}/>
                    </Col>
                </Row>
            </form>

        )
    }
}

export default AccountOverview;