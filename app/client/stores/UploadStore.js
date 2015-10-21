import alt from "../alt";
import Immutable from "immutable";
import routerInstance from "../routerInstance";
import UploadActions from "../actions/UploadActions";

class UploadStore {
    constructor() {
        this.profileImg = '';

        this.bindListeners({
            handleUploadProfile: UploadActions.uploadProfilePic
        });
    }

    handleUploadProfile(data) {
        this.profileImg = data.location;
        this.emitChange();
    }

}

export default alt.createStore(UploadStore, 'UploadStore');