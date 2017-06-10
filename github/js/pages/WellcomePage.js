import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import Navigator from 'react-native-deprecated-custom-components/src/Navigator';
import HomePage from './HomePage';

export default class WellcomePage extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.timer = setTimeout(() => {
            this.props.navigator.resetTo({ // resetTo重新定义路由，将主页之前的路由抛弃，使主页成为第一路由
                component: HomePage
            })
        }, 2000);
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar 
                    title={'欢迎'}
                    style={styles.bgColor}
                    statusBar={{
                        backgroundColor: '#eee'
                    }}
                />
                <Text>欢迎</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    bgColor: {
        backgroundColor: '#eee'
    }
});
