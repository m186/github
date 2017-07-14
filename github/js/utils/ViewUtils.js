/*
 * 顶部左右按钮
 * ViewUtils
*/
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

export default class ViewUtils extends Component{
    /**
     *  获取MyPage页的item
     * @param {*} callback 单击item的回调
     * @param {*} icon  左侧图标
     * @param {*} text  显示的文本
     * @param {*} tintStyle 图标着色
     * @param {*} expandableIcon 右侧图标 
     */
    static getSetingItem(callback, icon, text, expandableIcon) {
        return (
            <TouchableOpacity onPress={callback}>
                <View style={[styles.item, {backgroundColor: '#fff', justifyContent: 'space-between', padding: 10, height: 60}]}>
                    <View style={styles.item}>
                        <Image style={{marginLeft:16, width: 20, height: 20, marginRight: 10, tintColor: '#2196f3'}} source={icon}/>
                        <Text style={{color: '#666'}}>{text}</Text>
                    </View>
                    <Image style={{width: 28, height: 28, marginRight: 5, tintColor: '#2196f3'}} source={expandableIcon ? expandableIcon : require('../pages/my/img/arrow_more.png')}/>
                </View>
            </TouchableOpacity>
        );
    }

    static leftButton(callback) {
        return (
            <TouchableOpacity onPress={callback} >
                <Image
                    style={styles.leftButton} 
                    source={require('../../res/images/arrows.png')}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        // alignItems: 'center'
    },
    leftButton: {
        width: 22, 
        height: 22,
        marginLeft: 10,
        tintColor: '#fff'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between'
    },
});