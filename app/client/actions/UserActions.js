import alt from "../alt";
import UserService from "../services/UserService";

const UserApi = new UserService();
const altIn = alt;

class UserActions {

    doRegister(user) {
        // register user on server
        UserApi.register(user)
            .then((response) => {
                if(response.status == 200) {
                    this.dispatch(response.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    doLogin(user) {
        // tries to log in a user
        UserApi.login(user)
            .then((response) => {
                if(response.status == 200) {
                    this.dispatch(response.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    doLogout() {
        // tries to log in a user
        UserApi.logout()
            .then((response) => {
                if(response.status == 200) {
                    this.dispatch(response.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

}

export default alt.createActions(UserActions);