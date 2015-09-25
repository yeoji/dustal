import React from 'react';
import { RouteHandler } from "react-router";
import AltContainer from 'alt/AltContainer';
import UserStore from '../stores/UserStore';
import Navigation from "./partials/Navigation";
import LoginModal from './partials/LoginModal';
import RegisterModal from './partials/RegisterModal';
import {Grid} from 'react-bootstrap';

const storesObj = {
    UserStore: UserStore
};



class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {showLoginModal: false, showRegisterModal: false};
    }

    closeLogin() {
        this.setState({ showLoginModal: false });
    }

    openLogin() {
        this.setState({ showLoginModal: true });
    }

    closeRegister() {
        this.setState({ showRegisterModal: false });
    }

    openRegister() {
        this.setState({ showRegisterModal: true });
    }

    render() {

        return (
        <div>
            <Navigation showLogin={this.openLogin.bind(this)} showRegister={this.openRegister.bind(this)}/>
            <Grid fluid>
                <AltContainer stores={ storesObj }>
                    <RouteHandler { ...this.props } showLogin={this.openLogin.bind(this)} showRegister={this.openRegister.bind(this)}/>
                </AltContainer>
            </Grid>
            <LoginModal show={this.state.showLoginModal} close={this.closeLogin.bind(this)}/>
            <RegisterModal show={this.state.showRegisterModal} close={this.closeRegister.bind(this)}/>
        </div>
        );
    }
}

App.propTypes = {};
export default App;