
import React, { Component } from 'react';
import {
    AsyncStorage
} from 'react-native';
import keys from '../../../res/data/key.json';
import langs from '../../../res/data/langs.json';

const FAVORITE_KEY = 'favorite_';
export default class FavoriteDao{
    constructor(flag) {
        this.flag = flag;
        this.favoriteKey = `${FAVORITE_KEY}${flag}`;
    }

    /*
     * 保存收藏项目状态
     * key: 项目id或名称
     * value: 收藏的项目
     * cb: 回调
    */
    saveFavoriteItem(key, value, cb) {
        AsyncStorage.setItem(key, value, (error) => {
            if(!error) {
                this.updateFavoriteKey(key, true);
            }
        });
    }

    /*
     * 更新favorite key集合
     * key: 项目id或名称
     * isAdd: 标识（判断是true增加还是false删除）
    */
    updateFavoriteKey(key, isAdd) {
        AsyncStorage.getItem(this.favoriteKey, (error, result) => {
            if(!error) {
                var favoriteKeys = [];
                if(result) {
                    favoriteKeys = JSON.parse(result);
                }
                var index = favoriteKeys.indexOf(key);
                if(isAdd) {
                    if(index === -1) favoriteKeys.push(key);
                }
                else {
                    if(index !== -1) {
                        favoriteKeys.forEach((_item, _index) => {
                            if (_item == key) favoriteKeys.splice(_index, 1);
                        })
                    }
                }
                AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));
            }
        });
    }

    /*
     * 取消收藏
     * key: 项目id或名称
    */
    removeFavoriteItem(key) {
        AsyncStorage.removeItem(key, (error, result) => {
            if(!error) {
                this.updateFavoriteKey(key, false);
            }
        });
    }

    /*
     * 获取所有收藏项目对应的 key 
    */
    getFavoriteItem() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.favoriteKey, (error, result) => {
                if(!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (_error) {
                        reject(_error);
                    }
                }
                else {
                    reject(error);
                }
            });
        });
    }

    /*
     * 获取所有收藏项目 
    */
    getAllItems() {
        return new Promise((resolve, reject) => {
            this.getFavoriteItem().then((keys) => {
                var items = [];
                if(keys) {
                    AsyncStorage.multiGet(keys, (error, stores) => {
                        try {
                            stores.map((result, index, arr) => {
                                var value = result[1];
                                if(value) items.push(value);
                            });
                            resolve(items);
                        } catch (error) {
                            reject(error);
                        }
                    });
                } 
                else {
                    resolve(items);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }
}