import RESTService from "./RESTService";
import axios from "axios";

class S3Service extends RESTService {

    constructor() {
        super('/s3');
    }

    /**
     * Handles the uploading of the user's profile picture
     * @param file
     */
    profilePic(file) {
        let url = this.baseUrl + '/upload/';
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

export default S3Service;