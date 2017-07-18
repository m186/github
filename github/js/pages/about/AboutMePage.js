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

export default class AboutMePage extends Component{
    constructor(props) {
        super(props);
        this.aboutCommon = new AboutCommon(props, (dic) => this.updateState(dic), FLAG_ABOUT.flag_about);
        this.state = {};
    }

    updateState(dic) {
        this.setState(dic);
    }

    onClicks(tab) {
        let TargetComponent,params = {...this.props, flag: tab};
        switch(tab) {
            case 'Feedback':
                var url = 'mailto://1263464197@qq.com';
                Linking.canOpenURL(url)
                    .then(supported => {
                        if (!supported) {
                            console.log('Can\'t handle url: ' + url);
                        } else {
                            return Linking.openURL(url);
                        }
                    })
                    .catch(err => console.error('An error occurred', err));
                break;
            case 'About Author':

                break;
            case 'Web Site':
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

    render() {
        let contentView = <View>
            {ViewUtils.getSetingItem(() => this.onClicks(MORE_MENU.WebSite), require('../my/img/website.png'), '主页', require('../my/img/arrowDowns.png'))}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSetingItem(() => this.onClicks(MORE_MENU.About_Author), require('../my/img/author4.png'), '关于作者', require('../my/img/arrowDowns.png'))}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSetingItem(() => this.onClicks(MORE_MENU.Feedback), require('../my/img/feedback.png'), '反馈', require('../my/img/arrowDowns.png'))}
        </View>;
        return this.aboutCommon.renderView(contentView);
    }
}



