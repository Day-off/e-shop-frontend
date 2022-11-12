import axios from "axios";

const POST_API_BASE_URL = '193.40.255.30'

class PostService{
    getPosts(){
        return axios.get(POST_API_BASE_URL);
    }
}

export default new PostService()