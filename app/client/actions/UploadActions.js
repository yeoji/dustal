import alt from "../alt";
import UploadService from "../services/UploadService";

const UploadApi = new UploadService();

class UploadActions {

    uploadProfilePic(file, username) {
        UploadApi.profilePic(file, username)
            .then((response) => {
                this.dispatch(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }

}

export default alt.createActions(UploadActions);