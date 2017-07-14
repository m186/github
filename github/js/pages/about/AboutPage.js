/*
 * 关于页面
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
  Platform
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewUtils from '../../utils/ViewUtils';
import GlobalStyles from '../../../res/styles/GlobalStyle';
import AboutCommon, {FLAG_ABOUT} from './AboutCommon';
import {MORE_MENU} from '../../common/MoreMenu';

export default class AboutPage extends Component{
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
                
                break;
            case 'About Author':

                break;
            case 'Web Site':

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
            {ViewUtils.getSetingItem(() => this.onClicks(MORE_MENU.WebSite), require('../my/img/website.png'), '主页')}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSetingItem(() => this.onClicks(MORE_MENU.About_Author), require('../my/img/author2.png'), '关于作者')}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSetingItem(() => this.onClicks(MORE_MENU.Feedback), require('../my/img/feedback.png'), '反馈')}
        </View>;
        return this.aboutCommon.renderView(contentView);
    }
}



