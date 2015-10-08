import React from 'react';
import { RouteHandler } from "react-router";
import AltContainer from 'alt/AltContainer';
import UserStore from '../stores/UserStore';
import Navigation from "./partials/Navigation";
import {Grid} from 'react-bootstrap';
import AppActions from "../actions/AppActions";

const storesObj = {
    UserStore: UserStore
};



class App extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        window.addEventListener('click', this.handleClick.bind(this));

    }

    handleClick(e){
        AppActions.updateClicks(e);
    }

    render() {

        return (
        <div>
            <Navigation/>
            <Grid fluid>
                <AltContainer stores={ storesObj }>
                    <RouteHandler { ...this.props }/>
                </AltContainer>
            </Grid>
        </div>
        );
    }
}

App.propTypes = {};
export default App;