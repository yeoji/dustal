import alt from "../alt";
import S3Service from "../services/S3Service";

const UploadApi = new S3Service();

class UploadActions {

    uploadProfilePic(file) {
        UploadApi.profilePic(file)
            .then((response) => {
                this.dispatch(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }

}

export default alt.createActions(UploadActions);