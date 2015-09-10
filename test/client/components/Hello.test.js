/*******************************************
 * Sample of how to test React components. *
 *******************************************/

import React from "react";
import {expect} from "chai";
import createComponent from './createComponent.js';
import Hello from "../../../app/client/components/Hello";

describe('Hello component', () => {
    it("should render the string 'Hello World'!", () => {
        const expectedStr = 'Hello World!';
        const hello = createComponent(<Hello />);

        expect(hello.props.children.type).to.equal('div');
        expect(hello.props.children.props.children.props.children).to.equal(expectedStr);
    });
});