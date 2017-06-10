/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import NavigationBar from '../common/NavigationBar';
// import Navigator from 'react-native-deprecated-custom-components/src/Navigator';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        selectedTab: 'Popular'
        }
    }
    render() {
        return (
        <View style={styles.container}>
            <NavigationBar 
                title={'最热'}
                style={styles.bgColor}
                statusBar={{backgroundColor: '#2196f3'}}
            />
            <TabNavigator>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Popular'}
                title="最热"
                selectedTitleStyle={{color: 'skyblue'}}
                renderIcon={() => <Image style={styles.image} source={require('../../res/images/populars.png')} />}
                renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'skyblue'}]} source={require('../../res/images/populars.png')} />}
                onPress={() => this.setState({ selectedTab: 'Popular' })}>
                <View style={styles.page1}><Text>Popular Page</Text></View>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Trending'}
                title="趋势"
                selectedTitleStyle={{color: 'skyblue'}}
                renderIcon={() => <Image style={styles.image} source={require('../../res/images/trending.png')} />}
                renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'skyblue'}]} source={require('../../res/images/trending.png')} />}
                onPress={() => this.setState({ selectedTab: 'Trending' })}>
                <View style={styles.page2}><Text>Trending Page</Text></View>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'Favorite'}
                title="收藏"
                selectedTitleStyle={{color: 'skyblue'}}
                renderIcon={() => <Image style={styles.image} source={require('../../res/images/love.png')} />}
                renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'skyblue'}]} source={require('../../res/images/love.png')} />}
                onPress={() => this.setState({ selectedTab: 'Favorite' })}>
                <View style={styles.page3}><Text>Favorite Page</Text></View>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'My'}
                title="我的"
                selectedTitleStyle={{color: 'skyblue'}}
                renderIcon={() => <Image style={styles.image} source={require('../../res/images/git.png')} />}
                renderSelectedIcon={() => <Image style={[styles.image, {tintColor: 'skyblue'}]} source={require('../../res/images/git.png')} />}
                onPress={() => this.setState({ selectedTab: 'My' })}>
                <View style={styles.page4}><Text>My Page</Text></View>
            </TabNavigator.Item>
            </TabNavigator>
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