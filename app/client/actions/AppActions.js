import alt from "../alt";

class AppActions {

    updateClicks(e) {
       this.dispatch(e.target);
    }
}

export default alt.createActions(AppActions);