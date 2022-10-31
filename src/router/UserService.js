import axios from "axios";

const USER_API_BASE_URL = '193.40.255.30'

class UserService{
    getUsers(){
        return axios.get(USER_API_BASE_URL);
    }
}

export default new UserService()