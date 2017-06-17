/* 
 * 初始化设置页面
 * setup
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import WellcomePage from './WellcomePage';
import Navigator from 'react-native-deprecated-custom-components/src/Navigator';

function setup() {
    // 进行一些初始化配置
    class Root extends Component{
        _renderScene(route, navigator) {
            let Component = route.component;
            return (
                <Component navigator = {navigator} {...route.params}/>
            );
        }
        render() {
            return (
                <Navigator
                    initialRoute = {{component: WellcomePage}}
                    renderScene = {(route, navigator) => this._renderScene(route, navigator)}
                />
            );
        }
    }
    return <Root />
}

module.exports = setup;