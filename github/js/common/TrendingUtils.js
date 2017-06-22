/* 
 * fetch网络请求组件
 * TrendingUtils
 * 
*/
import {
    AsyncStorage
} from 'react-native';
import queryString from 'query-string'; // 解析json数据
import _ from 'lodash'; // 用来拼接对象
import GitHubTrending from 'GitHubTrending'; 

export default class TrendingUtils{
    constructor(flag) {
        this.flag = flag;
        this.trending = new GitHubTrending();
    }

    // GET请求
    get(url) {
        return new Promise((resolve, reject) => {
            this.getLocalData(url)
                .then((res) => {
                    if (res) {
                        resolve(res);
                    }
                    else {
                        this.fetchNetData(url)
                            .then(result => {
                                resolve(result);
                            })
                            .catch(error => {
                                reject(error);
                            })
                    }
                })
                .catch((err) => {
                    this.fetchNetData(url)
                        .then(result => {
                            resolve(result);
                        })
                        .catch(error => {
                            reject(error);
                        })
                });
        });
    }

    // 获取本地数据
    getLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    try{
                        resolve(data);
                    }catch(e) {
                        reject(new Error('responseData is null'));
                    }
                }
            });
        });
    }

    // 获取网络数据
    fetchNetData(url) {
        return new Promise((resolve, reject) => {
            this.trending.fetchTrending(url)
                .then(result => {
                    if (!result) {
                        reject(new Error('responseData is null'));
                        return;
                    }
                    resolve(result);
                    this.saveResponsitory(url, result);
                })
                .catch((error)=> {
                    reject(error);
                });
        })
    }

    // 缓存数据
    saveResponsitory(url, result) {
        if (!url || !result) return;
        let item = {
            items: result,
            update_data: new Date().getTime()
        }
        AsyncStorage.setItem(url, JSON.stringify(item));
    }

    // 判断数据是否过时
    checkData(longTime) {
        return;
        let cDate = new Date();
        let tDate = new Date();
        tDate.setTime(longTime);
        if(cDate.getMonth() !== tDate.getMonth()) return;
        if(cDate.getDay() !== tDate.getDay()) return;
        if(cDate.getHours() - tDate.getHours() > 4) return;
        return true;
    }
}