import { Route, DefaultRoute } from "react-router";
import React from "react";

import App from "./components/App";
import Hello from "./components/Hello";
import Blog from "./components/blog/Blog";
import Account from "./components/account/Account";
import Setup from "./components/setup/Setup";
import UserStore from './stores/UserStore';

// To pass in props to the handler
const wrapComponent = function (Component, props) {
    return React.createClass({
        render: function () {
            return React.createElement(Component, props);
        }
    });
};

function requireAuth(nextState, transition) {
    if (UserStore.getState().user.isEmpty()) {
        transition.to('/auth/login', null, {nextPathname: nextState.location.pathname});
    }
}

export default (
    <Route path="/" handler={ App }>
        <DefaultRoute handler={ Hello }/>
        <Route path="/setup" handler={ Setup } />
        <Route path="/account" handler={ Account }/>
        <Route path="/:userName" handler={ Blog }/>
        <Route path="/favicon.ico" />
    </Route>
);