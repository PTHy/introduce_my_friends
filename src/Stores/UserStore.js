import {observable, action} from "mobx";
import axios from 'axios'

class UserStore {
    static  __instance = null;
    static getInstance() {
        if(UserStore.__instance == null)
            UserStore.__instance = new UserStore();
        return UserStore.__instance;
    }
    constructor() {
        UserStore.__instance = this;
    }

    @observable user = null;

    @action edit = async (user) => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/api/users',
                method: 'put',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                data: {
                    id: user.id,
                    account: user.account,
                    password: user.password,
                    email: user.email,
                    username: user.name
                },
                timeout: 3000
            });

            console.log(response);
            if (response.status === 200) {
                if (!response.data.data)
                    return false;

                this.user = null;
                return true;
            }

            return false;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    @action register = async (user) => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/api/users/register',
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                data: {
                    account: user.account,
                    password: user.password,
                    email: user.email,
                    username: user.name
                },
                timeout: 3000
            });

            console.log(response);
            if (response.status === 200) {
                if (!response.data.data)
                    return false;

                return true;
            }

            return false;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    };

    @action logout = () => {
        this.user = null;
    };

    @action login = async (user) => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/api/users/login',
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                data: JSON.stringify(user),
                timeout: 3000
            });

            if (response.status === 200) {

                if (!response.data)
                    return false;

                this.user = response.data;
                return true;
            }

            return false;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }
}

export default UserStore.getInstance();
