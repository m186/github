/* 
 * 详情页 WebView
 * RepositoryDetail
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView,
  TextInput,
  Image,
  Dimensions,
  DeviceEventEmitter
} from 'react-native';
import NavigationBar from '../common/NavigationBar'; // 顶部标题栏
import ViewUtils from '../utils/ViewUtils'; // 顶部返回按钮

const WIDTH = Dimensions.get('window').width;
const TRENDING_URL = 'https://github.com/'
export default class RepositoryDetail extends Component{
    constructor(props) {
        super(props);
        this.url = this.props.item.html_url ? this.props.item.html_url : `${TRENDING_URL}${this.props.item.fullName}`;
        let title = this.props.item.full_name ? this.props.item.full_name : this.props.item.fullName;
        this.state = {
            url: this.url,
            text: '',
            title: title,
            canGoBack: false
        }
    }
  
    _Back() {
        if(this.state.canGoBack) {
            this.webView.goBack();
        } else {
            this.props.navigator.pop();
        }
    }

    _go() {
        this.setState({
            url: this.state.text
        });
    }

    _onNavigationStateChange(e) {
        this.setState({
            canGoBack: e.canGoBack
            // title: e.title,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    style={styles.bgColor}
                    leftButton={ViewUtils.leftButton(() => this._Back())}
                    statusBar={{
                        backgroundColor: '#2196f3'
                    }}
                />
                <WebView 
                    ref={webView => this.webView = webView}  // 获取webView进行返回
                    source={{uri: this.state.url}}           // url
                    startInLoadingState={true}               // loading图标
                    onNavigationStateChange={(e) => this._onNavigationStateChange(e)}
                />
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
        backgroundColor: '#2196f3',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10
    },
    textInput: {
        height: 30, 
        width: WIDTH-120,
        borderWidth: 1,
        padding: 4
    }
});
