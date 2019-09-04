import {observable, action} from "mobx";
import axios from 'axios'

class PostStore {

    static  __instance = null;
    static getInstance() {
        if(PostStore.__instance == null)
            PostStore.__instance = new PostStore();
        return PostStore.__instance;
    }
    constructor() {
        PostStore.__instance = this;
    }

    @observable items = null;

    @action fetchItems = async () => {
        try {
            let response = await axios({
                url: 'http://localhost:8080/api/posts',
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });

            console.log(response);
            if (response.status === 200)
                this.items = response.data.data;
        } catch (error) {
            console.log(error.message);
        }
    }

    @observable current_time = null;
    @action getTime = async () =>  this.current_time = await new Date().getTime();
}

export default PostStore.getInstance();
