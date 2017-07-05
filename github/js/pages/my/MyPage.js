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
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import HttpUtils from '../../common/HttpUtils';
import CustomKeyPage from './CustomKeyPage';
import SortKeyPage from './SortKeyPage';
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';

export default class MyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: ''
        }
    }
    
    _customPage(flag) { // 自定义标签页
        this.props.navigator.push({
            component: CustomKeyPage,
            params: {
                ...this.props,
                flag: flag
            }
        });
    }

     _sortPage(flag) { // 标签排序
        this.props.navigator.push({
            component: SortKeyPage,
            params: {
                ...this.props,
                flag: flag
            }
        });
    }

    _customPages(flag) { // 标签移除
        this.props.navigator.push({
            component: CustomKeyPage,
            params: {
                ...this.props,
                flag: flag,
                isRemove: true
            }
        });
    }

    render() {
        let flagLanguage = FLAG_LANGUAGE.flag_language,
            flagKey = FLAG_LANGUAGE.flag_key;
        return (
            <View style={styles.container}>
                <NavigationBar 
                    style={styles.bgColor}
                    title={'My'}
                    statusBar={{
                        backgroundColor: '#2196f3'
                    }}
                />
                <Text style={{padding: 20, fontSize: 20}} onPress={() => this._customPage(flagKey)}>自定义标签页</Text>
                <Text style={{padding: 20, fontSize: 20}} onPress={() => this._customPage(flagLanguage)}>自定义语言页</Text>
                <Text style={{padding: 20, fontSize: 20}} onPress={() => this._sortPage(flagKey)}>自定义标签排序</Text>
                <Text style={{padding: 20, fontSize: 20}} onPress={() => this._sortPage(flagLanguage)}>自定义语言排序</Text>
                <Text style={{padding: 20, fontSize: 20}} onPress={() => this._customPages(flagKey)}>自定标签移除</Text>
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
        backgroundColor: '#000'
    }
});

 