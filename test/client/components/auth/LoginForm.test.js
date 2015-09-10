import React from "react";
import {expect} from "chai";
import sinon from "sinon";

import createComponent from "../createComponent.js";
import LoginForm from "../../../../app/client/components/auth/LoginForm";
import {Input, ButtonInput} from 'react-bootstrap';

describe('LoginForm component', () => {
    let loginForm;
    let _onAuthSubmitStub;

    beforeEach(() => {
        _onAuthSubmitStub = sinon.stub(LoginForm.prototype, '_onAuthSubmit');
        loginForm = createComponent(<LoginForm />);
    });

    afterEach(() => {
        LoginForm.prototype._onAuthSubmit.restore();
    });

    it('should render an email field, a password field', () => {
        let form = loginForm.props.children.props.children.props.children[0];
        expect(form.type).to.equal('form');

        let content = form.props.children;
        let inputs = content.filter(component => component.type == Input);

        expect(inputs).to.have.length(2);

        expect(inputs[0].props.name).to.equal('email');
        expect(inputs[1].props.name).to.equal('password');

    });

    it('should call _onAuthSubmit on click of submit button', () => {
        let formChildren = loginForm.props.children.props.children.props.children[0].props.children;
        let button = formChildren.filter(component => component.type == ButtonInput)[0];
        button.props.onClick();

        expect(_onAuthSubmitStub.called).to.equal(true);
    });
});