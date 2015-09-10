import React from "react";
import {expect} from "chai";
import sinon from "sinon";

import createComponent from "../createComponent.js";
import RegisterForm from "../../../../app/client/components/auth/RegisterForm";
import {Input, ButtonInput} from 'react-bootstrap';

describe('RegisterForm component', function () {
    let regForm;
    let _onAuthSubmitStub;

    beforeEach(() => {
        _onAuthSubmitStub = sinon.stub(RegisterForm.prototype, '_onAuthSubmit');
        regForm = createComponent(<RegisterForm />);
    });

    afterEach(() => {
        RegisterForm.prototype._onAuthSubmit.restore();
    });

    it('should render names fields, an email field, a password field', () => {
        let form = regForm.props.children.props.children.props.children;
        expect(form.type).to.equal('form');

        let content = form.props.children;
        let inputs = content.filter(component => component.type == Input);
        expect(inputs).to.have.length(4);

        expect(inputs[0].ref).to.equal('first_name');
        expect(inputs[1].ref).to.equal('last_name');
        expect(inputs[2].ref).to.equal('email');
        expect(inputs[3].ref).to.equal('password');

    });

    it('should call _onAuthSubmit on click of submit button', () => {
        let formChildren = regForm.props.children.props.children.props.children.props.children;
        let button = formChildren.filter(component => component.type == ButtonInput)[0];
        button.props.onClick();

        expect(_onAuthSubmitStub.called).to.equal(true);
    });
});