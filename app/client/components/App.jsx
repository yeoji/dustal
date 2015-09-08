import React from 'react';
import { RouteHandler } from "react-router";
import AltContainer from 'alt/AltContainer';
import UserStore from '../stores/UserStore';

import Navigation from "./Navigation";

const storesObj = {
    UserStore: UserStore
};

class App extends React.Component {
    render() {
        return (
            <AltContainer stores={ storesObj }>
                <Navigation />
                <RouteHandler { ...this.props } />
            </AltContainer>
        );
    }
}

App.propTypes = {};

export default App;