import React from 'react';
import { RouteHandler } from "react-router";
import AltContainer from 'alt/AltContainer';
import UserStore from '../stores/UserStore';
import Navigation from "./partials/Navigation";
import {Grid} from 'react-bootstrap';

const storesObj = {
    UserStore: UserStore
};

class App extends React.Component {
    render() {

        return (
        <div>
            <Navigation />
            <Grid fluid>
                <AltContainer stores={ storesObj }>
                    <RouteHandler { ...this.props } />
                </AltContainer>
            </Grid>
        </div>
        );
    }
}

App.propTypes = {};
export default App;