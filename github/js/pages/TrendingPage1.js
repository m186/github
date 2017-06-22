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
import TrendingUtils from '../common/TrendingUtils'; // trending数据爬取
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'; // 顶部可滑动导航 

const WIDTH = Dimensions.get('window').width;
const URL = 'https://github.com/trending/';
export default class TrendingPage extends Component{
    constructor(props) {
        super(props);
        this.trending = new TrendingUtils()
        this.state = {
           data: ''
        }
    }

    _onLoad() {
        let url = `${URL}${this.text}`;
        this.trending.get(url)
            .then((data)=> {
                this.setState({
                    data: JSON.stringify(data)
                });
            })
            .catch((error)=> {
                this.setState({
                    data: JSON.stringify(error)
                });
            });
    }
  
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'Trending'}
                    style={styles.bgColor}
                    statusBar={{
                        backgroundColor: '#2196f3'
                    }}
                />
                <TextInput
                    style={{height: 40}}
                    placeholder="请输入..."
                    onChangeText={(text) => this.text = text}
                />
                <View >
                    <Text onPress={() => this._onLoad()}>
                        加载数据
                    </Text>
                    <Text style={{height: 400}}>{this.state.data}</Text>
                </View>
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
