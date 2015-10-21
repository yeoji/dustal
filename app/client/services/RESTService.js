import axios from "axios";

class RESTService {

    /**
     * url param is passed in: incl. the '/'
     * ie. base url of '/users'
     */
    constructor(url) {
        this.baseUrl = '/api' + url;
    }

    // Get all resources
    getAllResource() {
        axios.get(this.baseUrl)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (response) {
                console.log(response);
            });
    }

    // Retrieve one resource by id
    findResource(id) {
        let url = this.baseUrl + '/' + id;

        axios.get(url)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (response) {
                console.log(response);
            });
    }

    // Create a resource
    createResource(data) {
        return axios.post(this.baseUrl, data);
    }

    // Update a specified resource
    updateResource(id, data) {
        let url = this.baseUrl + '/' + id;

        axios.put(url, data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (response) {
                console.log(response);
            });
    }

    // Delete a specified resource
    deleteResource(id) {
        let url = this.baseUrl + '/' + id;

        axios.delete(url)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (response) {
                console.log(response);
            });
    }
}

export default RESTService;