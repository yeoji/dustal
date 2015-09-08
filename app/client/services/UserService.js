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
        return axios.post(url, credentials);
    }

    register(user) {
        let url = this.baseUrl + '/register';
        return axios.post(url, user);
    }

    logout() {
        return axios.get(this.baseUrl + '/logout');
    }

}

export default UserService;