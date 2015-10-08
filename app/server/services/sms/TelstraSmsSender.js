import secrets from "../../config/secrets";
import axios from "axios";
import moment from "moment";

const baseUrl = 'https://api.telstra.com/v1';
let _token = {};

/**
 * Check token validity
 * returns true if the token is still valid
 * @returns {boolean}
 */
const checkToken = () => {
    /* check if the token expiration is after current time */
    return (Object.keys(_token).length > 0 && _token.expires.isAfter());
};

/**
 * This function requests an OAuth token from Telstra
 * @returns {deferred.promise|*}
 */
const getToken = function () {
    let url = baseUrl + '/oauth/token?';
    url += 'client_id=' + secrets.telstraKey;
    url += '&client_secret=' + secrets.telstraSecret;
    url += '&grant_type=client_credentials&scope=SMS';

    return new Promise((resolve, reject) => {
        axios.get(url).then(function (res) {
            _token.value = res.data.access_token;
            _token.expires = moment().add(res.data.expires_in, "s");
            resolve(res.data);
        }, function (err) {
            reject(err);
        });
    });

};

/**
 * This sends a POST request to the Telstra API to send an SMS
 * @param number
 * @param msg
 */
const sendSMS = function (number, msg) {
    const url = baseUrl + '/sms/messages';
    const data = JSON.stringify({
        to: number,
        body: msg
    });

    if(checkToken()) {
        return new Promise((resolve, reject) => {
            axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + _token.value
                }
            })
                .then((res) => {
                    resolve(res.data);
                });
        });
    } else {
        getToken().then((res) => {
            return new Promise((resolve, reject) => {
                axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + res.access_token
                    }
                })
                    .then((res) => {
                        resolve(res.data);
                    });
            });
        });
    }
};

export default sendSMS;
