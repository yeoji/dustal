import RESTService from "./RESTService";
import axios from "axios";

class UploadService extends RESTService {

    constructor() {
        super('/uploads');
    }

    /**
     * Handles the uploading of the user's profile picture
     * @param file
     */
    profilePic(file, username) {
        let url = this.baseUrl + '/profile/' + username;
        return new Promise((resolve, reject) => {
            axios.post(url, file)
                .then((response) => {
                    if(response.status == 200) {
                        resolve(response.data);
                    }
                    reject(response.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}

export default UploadService;