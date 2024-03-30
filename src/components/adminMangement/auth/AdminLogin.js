import axios from 'axios';

export class checkIsAdmin{
    constructor(userToken,api){
        this.userToken= userToken
        this.api = api
    }

    async checkAdmin(){
        const res = axios.post(`${this.api}user/admin/login`,{},{
            headers: {
                "x-access-token": this.userToken
            }
        });
        return res;
    }
}
