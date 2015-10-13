import React from 'react';
import { RouteHandler } from "react-router";
import {Grid} from 'react-bootstrap';
import AppActions from "../actions/AppActions";
import Navigation from "./partials/Navigation";
import GlobalModal from "./partials/GlobalModal";



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
                    <RouteHandler/>
                </Grid>
                <GlobalModal />
            </div>
        );
    }
}

export default App;