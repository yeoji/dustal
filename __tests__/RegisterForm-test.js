jest.dontMock('../app/client/components/auth/RegisterForm.jsx');

import React from 'react/addons';
var RegisterForm = require('../app/client/components/auth/RegisterForm.jsx');
var TestUtils = React.addons.TestUtils;

describe('RegisterForm', () => {

    var registerForm = TestUtils.renderIntoDocument(
        <RegisterForm />
    );

    it('should have 4 input', () => {
        let inputs = TestUtils.scryRenderedDOMComponentsWithTag(
            registerForm,
            'input'
        );

        expect(inputs.length).toEqual(4);
    });

});



