/* 
 * 
 * WebViewTest
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
import NavigationBar from './js/common/NavigationBar'; // 顶部标题栏

const WIDTH = Dimensions.get('window').width;
const URL = 'http://www.imooc.com';
export default class WebViewTest extends Component{
    constructor(props) {
        super(props);
        this.state = {
            url: URL,
            text: '',
            title: '',
            canGoBack: false
        }
    }
  
    _goback() {
        if(this.state.canGoBack) {
            this.webView.goBack();
        } else {
            DeviceEventEmitter.emit('showToast', '已至顶部，不可再返回');
        }
    }

    _go() {
        this.setState({
            url: this.state.text
        });
    }

    _onNavigationStateChange(e) {
        this.setState({
            canGoBack: e.canGoBack,
            title: e.title,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'WebView'}
                    style={styles.bgColor}
                    statusBar={{
                        backgroundColor: '#2196f3'
                    }}
                />
                <View style={styles.row}>
                    <Text onPress={() => this._goback()}>返回</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder={URL}
                        onChangeText={(text) => this.setState({text})}
                    />
                    <Text onPress={() => this._go()}>GO</Text>
                </View>
                <WebView 
                    ref={webView => this.webView = webView}  // 获取webView进行返回
                    source={{uri: this.state.url}}           // url
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
        backgroundColor: '#2196f3'
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
