import queryString from 'query-string'; // 解析json数据
import _ from 'lodash'; // 用来拼接对象

export default class HttpUtils{
    // GET请求
    static get(url, params) {
        if (params) url += '?' + queryString.stringify(params);
        return new Promise((resolve, reject) => {
            fetch(url)
            .then(res => res.json())
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    // POST请求
    static post(url, params) {
        const header = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const bodys = _.extend(header, {
            body: JSON.stringify(params)
        })
        return new Promise((resolve, reject) => {
            fetch(url, bodys)
            .then(res => res.json())
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
}