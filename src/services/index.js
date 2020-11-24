import axios from 'axios';
import { BASE_URL } from '../config/index'

import { setPageData } from '../libs/utils'

class Service {
    constructor() {
        this.instance = axios.create({
            baseURL: BASE_URL,
            timeout: 6000,
            
        });

        this.instance.interceptors.response.use((response) => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(response);
                }, 2000);
            })
        })
    }
    getNewsList(type, count) {
        return new Promise((resolve, reject) => {
            this.instance({
                url: '/juhe/getNewsList',
                method: 'POST',
                data: {
                    field: type
                }
            }).then(response => {
                const pageData = setPageData(response.data.result.data, count);
                console.log(pageData);
                resolve(pageData);
            }).catch(error => {
                console.log(error);
                reject(error);
            })
        })
    }
}

export default  new Service();