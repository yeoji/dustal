/*******************************************************
 * Creates the React component using shallow rendering *
 * so we don't need to have a DOM in order to test.    *
 *******************************************************/

import React from "react/addons";
const TestUtils = React.addons.TestUtils;

function createComponent(component) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(component);
    return shallowRenderer.getRenderOutput();
}

export default createComponent;
