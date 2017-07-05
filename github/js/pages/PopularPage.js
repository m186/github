/* 
 * 获取数据，渲染列表，添加顶部可滑动导航
 * PopularPage，ScrollableTabView
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  ListView,
  RefreshControl,
  TouchableOpacity,
  Image,
  Dimensions,
  DeviceEventEmitter
} from 'react-native';
import NavigationBar from '../common/NavigationBar'; // 顶部标题栏
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'; // 顶部可滑动导航  
import RepositoryCell from '../common/RepositoryCell'; // 渲染listView列表页
import HttpUtils from '../common/HttpUtils';
import CustomKeyPage from './my/CustomKeyPage';
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import FavoriteDao from '../expand/dao/FavoriteDao';
import RepositoryDetail from './RepositoryDetail';
import ProjectModel from '../model/ProjectModel';
import Utils from '../utils/Utils';

// import Navigator from 'react-native-deprecated-custom-components/src/Navigator';
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const WIDTH = Dimensions.get('window').width;

var favoriteDao = new FavoriteDao('POPULAR');
export default class PopularPage extends Component{
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {
            language: []
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.languageDao.fetch()
            .then((result) => {
                this.setState({
                    language: result
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    _rightButton() {
        return (
            <TouchableOpacity onPress={() => this._more()} >
                <Image
                    style={styles.rightButton} 
                    source={require('../../res/images/more.png')}
                />
            </TouchableOpacity>
        );
    }

    _more() {
        this.props.navigator.push({
            component: CustomKeyPage,
            params: {...this.props}
        });
    }

    /*_leftButton() {
        return (
            <TouchableOpacity onPress={() => this._serch()} >
                <Image
                    style={styles.leftButton} 
                    source={require('../../res/images/serch.png')}
                />
            </TouchableOpacity>
        );
    }*/

    _serch() {

    }
  
    render() {
        let content = this.state.language.length > 0
        ? <ScrollableTabView
            tabBarBackgroundColor="#2196f3"
            tabBarInactiveTextColor="mintcream"
            tabBarActiveTextColor="#fff"
            tabBarUnderlineStyle={{backgroundColor:'#e7e7e7', height: 1}}
            renderTabBar={() => <ScrollableTabBar/>}
        >
            {
                this.state.language.map((result, i, arr) => {
                    return result.checked ? <PopularTab key={i} tabLabel={result.name} {...this.props}>{result.name}</PopularTab> : null;
                })
            }
        </ScrollableTabView>
        : null;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'Popular'}
                    style={styles.bgColor}
                    rightButton={this._rightButton()}
                    statusBar={{
                        backgroundColor: '#2196f3'
                    }}
                />
                {content}
            </View>
        );
    }
}
// leftButton={this._leftButton()}

class PopularTab extends Component{
    constructor(props) {
        super(props);
        this.httpUtils = new HttpUtils();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            isLoading: true,
            dataSource: ds,
            favoriteKeys: []
        }
        this._onRefresh()
    }

    componentDidMount() {
        this._getData();
    }

    // 更新Project 每条的收藏状态
    flushFavorite() {
        let projectModels = [];
        let items = this.items;
        this.items.forEach((result, index) => {
            projectModels.push(new ProjectModel(result, Utils.checkFavorite(result, this.state.favoriteKeys)));
        });
        this.updateState({
            dataSource: this.getDataSource(projectModels),
            isLoading: false
        });
    }

    // 获取每条的dataSource数据
    getDataSource(projectModels) {
        return this.state.dataSource.cloneWithRows(projectModels);
    }

    // 获取用户收藏的所有keys
    getFavoriteKeys() {
        favoriteDao.getFavoriteItem()
            .then((keys) => {
                if (keys) {
                    this.updateState({
                        favoriteKeys: keys
                    });
                }
                this.flushFavorite();
            })
            .catch((error) => {
                this.flushFavorite();
            });
    }

    // 封装setState
    updateState(dic) {
        if (!this) return;
        this.setState(dic);
    }

    // 获取数据
    _getData() {
        let dataUrl = this._getUrl();
        this.httpUtils.get(dataUrl)
        // this.dataRepository.fetchRepository(dataUrl)
            .then((result) => {
                result = JSON.parse(result);
                this.items = result && result.items ? result.items.items : result ? result : [];
                this.getFavoriteKeys();
                // this.flushFavorite();
            })
            .then(items => {
                if (!items || items.length === 0) return;
                this.items = items;
                this.getFavoriteKeys();
                // this.flushFavorite();
            })
            .catch((error) => {
                this.updateState({
                    isLoading: false
                });
            })
    }

    _getUrl() {
        return URL + this.props.tabLabel + QUERY_STR;
    }

    // 收藏图标的单击回调函数
    onFavorite(item, isFavorite) {
        if (isFavorite) {
            favoriteDao.saveFavoriteItem(item.id.toString(), JSON.stringify(item));
        }
        else {
            favoriteDao.removeFavoriteItem(item.id.toString());
        }
    }
    
    _renderRow(projectModel) {
        return (
            <RepositoryCell
                onSelect={() => this.onSelect(projectModel)}
                ProjectModel={projectModel}
                onFavorite={(item, isFavorite) => this.onFavorite(item, isFavorite)}
            />
        )
    }

    onSelect(item) { // 从RepositoryCell页面传回来的事件
        this.props.navigator.push({
            component: RepositoryDetail,
            params: {
                item: item,
                ...this.props
            }
        });
    }

    _onRefresh() {
        if (!this.state.isLoading) {
            this.setState({
                isLoading: true
            })
        }
        this._getData();
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource} // 所有数据
                    renderRow={(item) => this._renderRow(item)} // 每条数据
                    refreshControl={
                        <RefreshControl 
                            refreshing={this.state.isLoading} // 刷新状态
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#2196f3"
                            title="Loading..."
                            titleColor="#2196f3"
                            colors={['#2196f3']}
                            progressBackgroundColor="#ffff00"
                        />
                    }
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
    rightButton: {
        width: 22, 
        height: 22,
        marginLeft: WIDTH - 30
    },
    leftButton: {
        width: 22, 
        height: 22,
        marginLeft: 10
    }
});
