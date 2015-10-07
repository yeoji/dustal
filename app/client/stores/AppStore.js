import alt from '../alt';
import AppActions from '../actions/AppActions';

class AppStore{
    constructor(){
        this.target = null;

        this.bindListeners({
            handleClickedComponent: AppActions.UPDATE_CLICKS
        });
    }

    handleClickedComponent(component){
        this.target = component;
    }
}


export default alt.createStore(AppStore, 'AppStore');