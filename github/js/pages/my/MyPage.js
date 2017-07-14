/*
 * 我的页面
 * MyPage
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
  Image
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import HttpUtils from '../../common/HttpUtils';
import CustomKeyPage from './CustomKeyPage';
import SortKeyPage from './SortKeyPage';
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import {MORE_MENU} from '../../common/MoreMenu';
import GlobalStyles from '../../../res/styles/GlobalStyle';
import ViewUtils from '../../utils/ViewUtils';
import AboutPage from '../about/AboutPage';

export default class MyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: ''
        }
    }

    onClicks(tab) {
        let TargetComponent,params = {...this.props, flag: tab};
        switch(tab) {
            case 'Custom Language':
                TargetComponent = CustomKeyPage;
                params.flag = FLAG_LANGUAGE.flag_language;
                break;
            case 'Sort Language':
                TargetComponent = SortKeyPage;
                params.flag = FLAG_LANGUAGE.flag_language;
                break;
            case 'Custom Key':
                TargetComponent = CustomKeyPage;
                params.flag = FLAG_LANGUAGE.flag_key;
                break;
            case 'Sort Key':
                TargetComponent = SortKeyPage;
                params.flag = FLAG_LANGUAGE.flag_key;
                break;
            case 'Remove Key':
                TargetComponent = CustomKeyPage;
                params.flag = FLAG_LANGUAGE.flag_key;
                params.isRemove = true;
                break;
            case 'About Author':

                break;
            case 'About':
                TargetComponent = AboutPage;
                break;
            case 'Custom Theme':

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
        var navigationBar = <NavigationBar 
            style={styles.bgColor}
            title={'My'}
            statusBar={{
                backgroundColor: '#2196f3'
            }}
        />;
        return (
            <View style={styles.container}>
                {navigationBar}
                <ScrollView>
                    <TouchableOpacity onPress={() => this.onClicks(MORE_MENU.About)}>
                        <View style={[styles.item, {backgroundColor: '#fff', justifyContent: 'space-between', padding: 10, height: 80}]}>
                            <View style={styles.item}>
                                <Image style={{marginLeft:10, width: 32, height: 32, marginRight: 10, tintColor: '#2196f3'}} source={require('../../../res/images/populars.png')}/>
                                <Text style={{color: '#666'}}>GitHub Popular</Text>
                            </View>
                            <Image style={{width: 28, height: 28, marginRight: 5, tintColor: '#2196f3'}} source={require('./img/arrow_more.png')}/>
                        </View>
                    </TouchableOpacity>
                    <View style={GlobalStyles.line}/>
                    {/*趋势管理*/}
                    <Text style={styles.textStyle}>趋势管理</Text>
                    <View style={GlobalStyles.line}/>
                    {ViewUtils.getSetingItem(() => this.onClicks(MORE_MENU.Custom_Language), require('./img/listCheck.png'), '自定义语言')}
                    <View style={GlobalStyles.line}/>
                    <View style={GlobalStyles.line}/>
                    {ViewUtils.getSetingItem(() => this.onClicks(MORE_MENU.Sort_Language), require('./img/sort.png'), '语言排序')}
                    <View style={GlobalStyles.line}/>
                    {/*标签管理*/}
                    <Text style={styles.textStyle}>标签管理</Text>
                    <View style={GlobalStyles.line}/>
                    {ViewUtils.getSetingItem(() => this.onClicks(MORE_MENU.Custom_Key), require('./img/listCheck.png'), '自定义标签')}
                    <View style={GlobalStyles.line}/>
                    {ViewUtils.getSetingItem(() => this.onClicks(MORE_MENU.Sort_Key), require('./img/sort.png'), '标签排序')}
                    <View style={GlobalStyles.line}/>
                    <View style={GlobalStyles.line}/>
                    {ViewUtils.getSetingItem(() => this.onClicks(MORE_MENU.Remove_Key), require('./img/remove.png'), '标签移除')}
                    <View style={GlobalStyles.line}/>
                    {/*设置*/}
                    <Text style={styles.textStyle}>设置</Text>
                    <View style={GlobalStyles.line}/>
                    {ViewUtils.getSetingItem(() => this.onClicks(MORE_MENU.Custom_Theme), require('./img/theme.png'), '自定义主题')}
                    <View style={GlobalStyles.line}/>
                    {ViewUtils.getSetingItem(() => this.onClicks(MORE_MENU.About_Author), require('./img/author.png'), '关于作者')}
                    <View style={GlobalStyles.line}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        // alignItems: 'center'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between'
    },
    text: {
        fontSize: 20
    },
    bgColor: {
        backgroundColor: '#2196f3'
    },
    rowBox: {
        padding: 10
    },
    ageBox: {
        marginTop: 10,
        marginBottom: 10
    },
    line: {
        height: 1,
        backgroundColor: '#eee',
    },
    textStyle: {
        color: 'gray', 
        marginLeft: 10, 
        marginTop: 10, 
        marginBottom: 5, 
        fontSize: 12
    }
});

 