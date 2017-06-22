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
    render() {
        return (
        <View style={styles.container}>
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'Popular'}
                    title="最热"
                    selectedTitleStyle={{color: '#2196f3'}}
                    renderIcon={() => <Image style={styles.image} source={require('../../res/images/populars.png')} />}
                    renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196f3'}]} source={require('../../res/images/populars.png')} />}
                    onPress={() => this.setState({ selectedTab: 'Popular' })}>
                    <PopularPage {...this.props}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'Trending'}
                    title="趋势"
                    selectedTitleStyle={{color: '#2196f3'}}
                    renderIcon={() => <Image style={styles.image} source={require('../../res/images/trending.png')} />}
                    renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196f3'}]} source={require('../../res/images/trending.png')} />}
                    onPress={() => this.setState({ selectedTab: 'Trending' })}>
                    <TrendingPage />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'Favorite'}
                    title="收藏"
                    selectedTitleStyle={{color: '#2196f3'}}
                    renderIcon={() => <Image style={styles.image} source={require('../../res/images/love.png')} />}
                    renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196f3'}]} source={require('../../res/images/love.png')} />}
                    onPress={() => this.setState({ selectedTab: 'Favorite' })}>
                    <ListViews />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'My'}
                    title="我的"
                    selectedTitleStyle={{color: '#2196f3'}}
                    renderIcon={() => <Image style={styles.image} source={require('../../res/images/git.png')} />}
                    renderSelectedIcon={() => <Image style={[styles.image, {tintColor: '#2196f3'}]} source={require('../../res/images/git.png')} />}
                    onPress={() => this.setState({ selectedTab: 'My' })}>
                    <MyPage {...this.props}/>
                </TabNavigator.Item>
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