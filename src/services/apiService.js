import axios from "axios";
import store from '../redux/store';

class AuthApi {
    api = null;
    constructor() {
        this.api = axios
            .create();
        this.api
            .interceptors
            .request
            .use(config => {
                config.baseURL = "http://localhost:8080/";
                config.headers = this.getHeaders();
                return config;
            });
    }

    getHeaders = () => {
        let login = store.getState().loginInfo.info;
        if (login) {
            return { 'Authorization': `Bearer ${login.clientToken}` };
        } else {
            return null;
        }
    }

    getApi = () => this.api;
}

class GeneralApi {
    api = null;
    
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:8080/'
        });
    };

    getApi = () => this.api;
}

const authApiClass = new AuthApi();
export const authApi = authApiClass.getApi();

const generalApiClass = new GeneralApi();
export const generalApi = generalApiClass.getApi();

