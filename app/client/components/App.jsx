import React from 'react';
import { RouteHandler } from "react-router";
import AltContainer from 'alt/AltContainer';
import UserStore from '../stores/UserStore';
import Navigation from "./Navigation";
import {Grid} from 'react-bootstrap';

const storesObj = {
    UserStore: UserStore
};

class App extends React.Component {
    render() {
        return (
            <Grid>
                <AltContainer stores={ storesObj }>
                    <Navigation />
                    <RouteHandler { ...this.props } />
                </AltContainer>
            </Grid>
        );
    }
}

App.propTypes = {};

export default App;