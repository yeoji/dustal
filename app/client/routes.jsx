import { Route, DefaultRoute } from "react-router";
import React from "react";

import App from "./components/App";
import Hello from "./components/Hello";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import UserStore from './stores/UserStore';

// To pass in props to the handler
const wrapComponent = function(Component, props) {
    return React.createClass({
        render: function() {
            return React.createElement(Component, props);
        }
    });
};

function requireAuth(nextState, transition) {
    if (UserStore.getState().user.isEmpty()) {
        transition.to('/auth/login', null, { nextPathname: nextState.location.pathname });
    }
}

export default (
    <Route path="/" handler={ App }>
        <DefaultRoute handler={ Hello } />
        <Route name="auth" path="/auth">
            <Route name="login" handler={ LoginForm } />
            <Route name="register" handler={ RegisterForm } />
        </Route>
    </Route>
);