import {
    AsyncStorage
} from 'react-native';

export default class DataRepository{
    fetchRepository(url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalRepository(url) // 先调用本地数据
            .then(result => {
                if(result) 
                {
                    resolve(result);
                }
                else       // 如果获取本地数据为空则变为获取网络数据
                {
                    this.fetchNetRepository(url)
                    .then(_result => {
                        resolve(_result);
                    })
                    .catch(error => {
                        reject(error);
                    });
                }
            })
            .catch((error) => { // 如果获取本地数据出错则变为获取网络数据
                this.fetchNetRepository(url)
                .then(_result => {
                    resolve(_result);
                })
                .catch(error => {
                    reject(error);
                });
            });

        });
    }

    // 获取本地数据
    fetchLocalRepository(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url)
            .then(res => res.json())
            .then(result => {
                resolve(result);
            })
            .then(error => {
                reject(error);
            });
        })
    }

    // 获取网络数据
    fetchNetRepository(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
            .then(res => res.json())
            .then(result => {
                if (!result) 
                {
                    reject(new Error('response is null'));
                    return;
                }
                resolve(result.items);
                this.saveResponsitory(url, result.items);
            })
            .then(error => {
                reject(error);
            });
        });
    }

    // 缓存数据至本地
    saveResponsitory(url, items) {
        if (!url || !data) return;
        let item = {
            items: items,
            update_data: new Date().getTime()
        }
        AsyncStorage.setItem(url, JSON.stringify(item))
        .then(() => {

        })
        .catch(() => {

        })
    }

    // 判断数据是否过时
    checkData(longTime) {
        let cDate = new Date();
        let tDate = new Date();
        tDate.setTime(longTime);
        if(cDate.getMonth() !== tDate.getMonth()) return;
        if(cDate.getDay() !== tDate.getDay()) return;
        if(cDate.getHours() - tDate.getHours() > 4) return;
        return true;
    }
}