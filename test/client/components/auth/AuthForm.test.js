import React from "react";
import {expect} from "chai";
import sinon from "sinon";
import createComponent from "../createComponent.js";

import AuthForm from "../../../../app/client/components/auth/AuthForm";
import RegistrationFields from "../../../../app/client/components/auth/RegistrationFields";

describe('AuthForm component', () => {
    let authForm;
    let formType = 'login';

    let _onAuthSubmitStub;

    beforeEach(() => {
        _onAuthSubmitStub = sinon.stub(AuthForm.prototype, '_onAuthSubmit');
        authForm = createComponent(<AuthForm type={ formType }/>);
    });

    afterEach(() => {
        AuthForm.prototype._onAuthSubmit.restore();
    });

    it('should render an email field, a password field', () => {
        let content = authForm.props.children[0].props.children;
        let divs = content.filter(component => component.type == 'div');

        expect(divs).to.have.length(2);

        expect(divs[0].props.children.props.name).to.equal('email');
        expect(divs[1].props.children.props.name).to.equal('password');

    });

    it('should render a RegistrationFields component if type is register', () => {
        authForm = createComponent(<AuthForm type='register'/>);
        let regField = authForm.props.children[0].props.children.filter(component => component.type == RegistrationFields);

        expect(regField).to.have.length(1);
    });

    it('should call _onAuthSubmit on click of submit button', () => {
        let formChildren = authForm.props.children[0].props.children;
        let button = formChildren.filter(component => component.type == 'button')[0];
        button.props.onClick();

        expect(_onAuthSubmitStub.called).to.equal(true);
    });

});