jest.dontMock('../app/client/components/auth/LoginForm.jsx');
jest.dontMock('../helpers/ReactRouterContext.js');

import React from 'react/addons';
import {Row, Col, Input, Button} from 'react-bootstrap';
var LoginForm = require('../app/client/components/auth/LoginForm.jsx');
var TestUtils = React.addons.TestUtils;
var ReactRouterContext = require('../helpers/ReactRouterContext.js');


describe('FormLogin', () => {

    LoginForm = ReactRouterContext(LoginForm, {});

    var loginForm = TestUtils.renderIntoDocument(
        <LoginForm />
    );

    it('should have 2 input', () => {
        let inputs = TestUtils.scryRenderedDOMComponentsWithTag(
            loginForm,
            'input'
        );

        expect(inputs.length).toEqual(2);
    });

});



