/* 
 * 详情页 WebView
 * 官网
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
  Dimensions
} from 'react-native';
import NavigationBar from '../common/NavigationBar'; // 顶部标题栏
import ViewUtils from '../utils/ViewUtils'; // 顶部返回按钮

const WIDTH = Dimensions.get('window').width;

export default class WebViewPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,             // webview请求的url
            title: this.props.title,              // 标题栏
            canGoBack: false,          // 是否能返回
        }
    }
  
    // 左侧返回按钮
    _Back() {
        if(this.state.canGoBack) {
            this.webView.goBack();
        } else {
            this.props.navigator.pop();
        }
    }

    // 监控返回层级
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
