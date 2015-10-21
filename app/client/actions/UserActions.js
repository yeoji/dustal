import alt from "../alt";
import UserService from "../services/UserService";

const UserApi = new UserService();
const altIn = alt;

class UserActions {

    doRegister(user) {
        // register user on server
        UserApi.register(user)
            .then((data) => {
                this.dispatch(data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    doLogin(user) {
        // tries to log in a user
        UserApi.login(user)
            .then((data) => {
                this.dispatch(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    doLogout() {
        // tries to log in a user
        UserApi.logout()
            .then((data) => {
                this.dispatch(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    verifyNumber(verificationCode){
        UserApi.verifyNumber(verificationCode)
            .then((data) => {
                this.dispatch(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    resendNumber(mobile){
        UserApi.resendNumber(mobile)
            .then((data) => {
                this.dispatch(data.mobile);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    updateProfilePictures(){
        this.dispatch();
    }

    changePassword(id, data) {
        UserApi.updateResource(id, data)
            .then((response) => {
                this.dispatch(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

}

export default alt.createActions(UserActions);