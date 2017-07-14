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
  DeviceEventEmitter,
  TouchableOpacity
} from 'react-native';
import NavigationBar from '../common/NavigationBar'; // 顶部标题栏
import ViewUtils from '../utils/ViewUtils'; // 顶部返回按钮
import FavoriteDao from '../expand/dao/FavoriteDao'; // 顶部返回按钮

const WIDTH = Dimensions.get('window').width;
const TRENDING_URL = 'https://github.com/'

export default class RepositoryDetail extends Component{
    constructor(props) {
        super(props);
        this.url = this.props.item.item.html_url ? this.props.item.item.html_url : `${TRENDING_URL}${this.props.item.item.fullName}`;
        let title = this.props.item.item.full_name ? this.props.item.item.full_name : this.props.item.item.fullName;
        // let isFavorite = this.props.item.isFavorite;
        // let favoriteIcon = isFavorite ? require('../../res/images/stars1.png') : require('../../res/images/star1.png');
        this.state = {
            url: this.url,             // webview请求的url
            title: title,              // 标题栏
            canGoBack: false,          // 是否能返回
            isFavorite: this.props.item.isFavorite,    // 是否收藏
            favoriteIcon: this.props.item.isFavorite ? require('../../res/images/stars1.png') : require('../../res/images/star1.png') // 收藏按钮图标
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

    // _go() {
    //     this.setState({
    //         url: this.state.text
    //     });
    // }

    // 监控返回层级
    _onNavigationStateChange(e) {
        this.setState({
            canGoBack: e.canGoBack
            // title: e.title,
        });
    }

    // 右侧收藏按钮事件
    _favoriteButton() {
        let isFavorite = this.state.isFavorite;
        this.onFavorite(isFavorite); // 保存收藏状态或清除收藏状态
        this.iconFlag(isFavorite);   // 收藏图标状态
    }
    // 收藏图标状态
    iconFlag(isFavorite) {
        if (isFavorite) {
            this.setState({
                isFavorite: false,
                favoriteIcon: require('../../res/images/star1.png')
            });    
        }
        else {
            this.setState({
                isFavorite: true,
                favoriteIcon: require('../../res/images/stars1.png')
            });
        }
    }
    // 保存收藏状态或清除收藏状态
    onFavorite(isFavorite) {
        let item = this.props.item.item;
        let result = item.id ? item.id.toString() : item.url;
        let favoriteDao = item.id ? new FavoriteDao('POPULAR') : new FavoriteDao('TRENDING');
        if (!isFavorite) {
            favoriteDao.saveFavoriteItem(result, JSON.stringify(item));
        }
        else {
            favoriteDao.removeFavoriteItem(result);
        }
    }

    // 右侧收藏按钮渲染
    _renderRightButton() {
        return <TouchableOpacity onPress={() => this._favoriteButton()} style={{marginRight: 10}}>
            <Image style={{width: 22, height: 22, tintColor: '#fff'}} source={this.state.favoriteIcon}/>
        </TouchableOpacity>
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
                    rightButton={this._renderRightButton()}
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
