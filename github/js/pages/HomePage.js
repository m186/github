/**
 * Sample React Native App
 * 导航页面
 * HomePage
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  DeviceEventEmitter
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Toast, {DURATION} from 'react-native-easy-toast';
import NavigationBar from '../common/NavigationBar';
import PopularPage from './PopularPage';
import ListViews from '../../ListViews';
import WebViewTest from '../../WebViewTest';
// import SortKeyPage from './my/SortKeyPage';
import MyPage from './my/MyPage';
import FavoritePage from './FavoritePage';
import TrendingPage from './TrendingPage';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Popular'
        }
    }

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('showToast', (text) => {
            this.toast.show(text, DURATION.LENGTH_LONG);
        });
    }

    componentWillUnmount() {
        this.listener && this.listener.remove();
    }

    _renderTab(Component, selectTitle, title, source) { // 四个tab标签结构相同，封装成一个公用函数
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectTitle}
                title= {title}
                selectedTitleStyle={{color: '#2196f3'}}
                renderIcon={() => <Image style={styles.image} source={source} />}
                renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196f3'}]} source={source} />}
                onPress={() => this.setState({ selectedTab: selectTitle })}>
                <Component {...this.props}/>
            </TabNavigator.Item>
        );
    }

    render() {
        return (
        <View style={styles.container}>
            <TabNavigator>
                {this._renderTab(PopularPage, 'Popular', '最热', require('../../res/images/populars.png'))}
                {this._renderTab(TrendingPage, 'Trending', '趋势', require('../../res/images/trending.png'))}
                {this._renderTab(FavoritePage, 'Favorite', '收藏', require('../../res/images/love.png'))}
                {this._renderTab(MyPage, 'My', '我的', require('../../res/images/git.png'))}
            </TabNavigator>
            <Toast ref={toast => this.toast = toast}/>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    page1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    page2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    page3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    page4: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    image: {
        height: 22,
        width: 22
    },
    bgColor: {
        backgroundColor: '#2196f3'
    }
});