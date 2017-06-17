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
} from 'react-native';

export default class ViewUtils extends Component{
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
        marginLeft: 10
    }
});