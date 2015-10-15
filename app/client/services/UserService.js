import RESTService from "./RESTService";
import axios from "axios";

class UserService extends RESTService {

    constructor() {
        super('/users');
    }

    /****************************************
     *           AUTH FUNCTIONS             *
     ****************************************/

    /**
     * Credentials should be an object with:
     * email and password property
     * @param credentials
     */
    login(credentials) {
        let url = this.baseUrl + '/login';
        return new Promise((resolve, reject) => {
            axios.post(url, credentials)
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

    register(user) {
        let url = this.baseUrl + '/register';
        return new Promise((resolve, reject) => {
            axios.post(url, user)
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

    logout() {
        return new Promise((resolve, reject) => {
            axios.get(this.baseUrl + '/logout')
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

    verifyNumber(verificationCode) {
        let url = this.baseUrl + '/verify';
        return new Promise((resolve, reject) => {
            axios.post(url, verificationCode)
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

    resendNumber(mobile) {
        let url = this.baseUrl + '/resend';
        return new Promise((resolve, reject) => {
            axios.post(url, mobile)
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

export default UserService;