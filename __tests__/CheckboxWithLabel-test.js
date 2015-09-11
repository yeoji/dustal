jest.dontMock('../app/client/components/CheckboxWithLabel.jsx');

import React from 'react/addons';
const CheckboxWithLabel = require('../app/client/components/CheckboxWithLabel.jsx');
var TestUtils = React.addons.TestUtils;

describe('CheckboxWithLabel', () => {

    it('changes the text after click', () => {

        // Render a checkbox with label in the document
        var checkbox = TestUtils.renderIntoDocument(
            <CheckboxWithLabel labelOn="On" labelOff="Off" />
        );

    });

});