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
import TrendingCell from '../common/TrendingCell'; // 渲染listView列表页
import HttpUtils from '../common/HttpUtils';
import FavoriteDao from '../expand/dao/FavoriteDao';
import RepositoryDetail from './RepositoryDetail';
import ProjectModel from '../model/ProjectModel';

// import CustomKeyPage from './my/CustomKeyPage';
// import Utils from '../utils/Utils';
// import Navigator from 'react-native-deprecated-custom-components/src/Navigator';
// const URL = 'https://api.github.com/search/repositories?q=';
// const QUERY_STR = '&sort=stars';
const WIDTH = Dimensions.get('window').width;

export default class FavoritePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            language: []
        }
    }

    componentDidMount() {
    
    }
  
    render() {
        let content = <ScrollableTabView
            tabBarBackgroundColor="#2196f3"
            tabBarInactiveTextColor="mintcream"
            tabBarActiveTextColor="#fff"
            tabBarUnderlineStyle={{backgroundColor:'#e7e7e7', height: 1}}
            renderTabBar={() => <ScrollableTabBar/>}
        >
            <FavoriteTab tabLabel='最热' flag='POPULAR' {...this.props} />
            <FavoriteTab tabLabel='趋势' flag='TRENDING' {...this.props} />
        </ScrollableTabView>
        
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'Favorite'}
                    style={styles.bgColor}
                    statusBar={{
                        backgroundColor: '#2196f3'
                    }}
                />
                {content}
            </View>
        );
    }
}

class FavoriteTab extends Component{
    constructor(props) {
        super(props);
        this.favoriteDao = new FavoriteDao(this.props.flag);
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
        this.flushFavorite();
    }

    componentWillReceiveProps(nextProps) {
        this.flushFavorite();
    }

    // 更新Project 每条的收藏状态
    flushFavorite() {
        this.favoriteDao.getAllItems()
            .then((items) => {
                var resultData = [];
                items.forEach((item, index) => {
                    resultData.push(new ProjectModel(JSON.parse(item), true));
                })
                this.updateState({
                    dataSource: this.getDataSource(resultData),
                    isLoading: false
                });
            }).catch((error) => {
                this.updateState({
                    isLoading: false
                });
            });
    }

    // 获取每条的dataSource数据
    getDataSource(resultData) {
        return this.state.dataSource.cloneWithRows(resultData);
    }

    // 封装setState
    updateState(dic) {
        if (!this) return;
        this.setState(dic);
    }

    // 收藏图标的单击回调函数
    onFavorite(item, isFavorite) {
        let keys = this.props.flag === 'POPULAR' ? item.id.toString() : item.url;
        if (isFavorite) {
            this.favoriteDao.saveFavoriteItem(keys, JSON.stringify(item));
        }
        else {
            this.favoriteDao.removeFavoriteItem(keys);
        }
    }
    
    _renderRow(projectModel) {
        let CellComponent = this.props.flag === 'POPULAR' ? RepositoryCell : TrendingCell
        return (
            <CellComponent
                key={this.props.flag === 'POPULAR' ? projectModel.item.id : projectModel.item.url}
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
        this.flushFavorite();
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource} // 所有数据
                    renderRow={(item) => this._renderRow(item)} // 每条数据
                    enableEmptySections={true} // 当列表为空时加入，避免报错
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
