/*
 * 关于作者页面
 * about
*/
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Platform,
  Linking
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewUtils from '../../utils/ViewUtils';
import GlobalStyles from "../my/GlobalStyle";
import AboutCommon, {FLAG_ABOUT} from './AboutCommon';
import {MORE_MENU} from '../../common/MoreMenu';
import WebViewPage from '../WebViewPage';
import {FLAG} from '../my/myConfig/MyConfig';

export default class AboutMePage extends Component{
    constructor(props) {
        super(props);
        this.aboutCommon = new AboutCommon(props, (dic) => this.updateState(dic), FLAG_ABOUT.flag_about);
        this.state = {
            isShowA: false,
            isShowB: false
        };
    }

    updateState(dic) {
        this.setState(dic);
    }

    onClicks(tab) {
        let TargetComponent,params = {...this.props, flag: tab};
        switch(tab) {
            case 'Contact':
                this.setState({
                    isShowB: !this.state.isShowB
                });
                break;
            case 'Blog':
                TargetComponent = WebViewPage;
                params.url = FLAG.BLOG.items.url;
                params.title = FLAG.BLOG.items.GITHUB;
                break;
            case 'QQ':
                TargetComponent = WebViewPage;
                params.url = 'http://www.devio.org/io/GitHubPopular';
                params.title = 'GitHubPopular';
                break;
            case 'Wechar':
                TargetComponent = WebViewPage;
                params.url = 'http://www.devio.org/io/GitHubPopular';
                params.title = 'GitHubPopular';
                break;
        }

        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
                params: params 
            });
        }
    }

    /**
     * 获取点击后的动态图标
     * @param {*} isSure 
     */
    _getClickIcon(isSure) {
        return isSure ? require('../my/img/arrow_more.png') : require('../my/img/arrowDowns.png');
    }

    _render() {
        return (
            <View style={{marginLeft: 10}}>
                <View style={GlobalStyles.line}/>
                {ViewUtils.getSetingItem(() => this.onClicks(MORE_MENU.QQ), require('../my/img/qq.png'), FLAG.CONTACT.items.QQ.title, require('../my/img/arrow_more.png'))}
                <View style={GlobalStyles.line}/>
                {ViewUtils.getSetingItem(() => this.onClicks(MORE_MENU.WeChat), require('../my/img/wechat.png'), FLAG.CONTACT.items.WeChat.title, require('../my/img/arrow_more.png'))}
                <View style={GlobalStyles.line}/>
            </View>
        )
    }

    render() {
        let isSureA = this.state.isShowA;
        let isSureB = this.state.isShowB;
        let contentView = <View>
            {ViewUtils.getSetingItem(() => this.onClicks(MORE_MENU.Blog), require('../my/img/website.png'), FLAG.BLOG.name, require('../my/img/arrow_more.png'))}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSetingItem(() => this.onClicks(MORE_MENU.Contact), require('../my/img/author4.png'), FLAG.CONTACT.name, this._getClickIcon(isSureB))}
            {
                isSureB ? this._render() : null
            }
        </View>;
        return this.aboutCommon.renderView(contentView);
    }
}




