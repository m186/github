/* 
 * 对从GitHub中爬取的数据进行渲染
 * TrendingPage 
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
import TrendingCell from '../common/TrendingCell'; // 渲染listView列表页
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import RepositoryDetail from './RepositoryDetail'; // 详情页webView
import TrendingUtils from '../common/TrendingUtils'; // trending数据爬取
import TimeSpan from '../model/TimeSpan'; 
import Popover from '../common/Popover'; // Popover点击弹出框
import FavoriteDao from '../expand/dao/FavoriteDao';
import ProjectModel from '../model/ProjectModel';
import Utils from '../utils/Utils';

const WIDTH = Dimensions.get('window').width;
const URL = 'https://github.com/trending/';
var timeSpanArray = [
    new TimeSpan('Today', 'since=daily'),
    new TimeSpan('This Week', 'since=weekly'),
    new TimeSpan('This Month', 'since=monthly')
]
var favoriteDao = new FavoriteDao('TRENDING');
export default class TrendingPage extends Component{
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
        this.state = {
            language: [],
            isVisible: false,
            buttonRect: {},
            timeSpan: timeSpanArray[0],
            text: 'today'
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
            console.log(err);
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

    showPopover() {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }

    closePopover() {
        this.setState({isVisible: false});
    }

    _renderTitleView() {
        return (
            <View>
                <TouchableOpacity ref='button' onPress={() => this.showPopover()}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: '#fff', fontSize: 20}}>Trending</Text>
                        <Text style={{marginLeft: 10, color: '#fff', fontSize: 20}}>{this.state.text}</Text>
                        <Image style={{width: 32, height: 32, marginLeft: -8}} source={require('../../res/images/arrow.png')}/>
                    </View>
                </TouchableOpacity>
                
            </View>
        )
    }

    _onSelect(res) {
        this.setState({
            text: res.showText,
            timeSpan: res,
            isVisible: false
        });
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
                    return result.checked ? <TrendingTab key={i} timeSpan={this.state.timeSpan} tabLabel={result.name} {...this.props}>{result.name}</TrendingTab> : null;
                })
            }
        </ScrollableTabView>
        : null;
        let timeSpanView = 
            <Popover
                isVisible={this.state.isVisible}
                fromRect={this.state.buttonRect}
                placement='bottom'
                onClose={() => this.closePopover()}
                contentStyle={{backgroundColor: '#343434', opacity: .8}}
            >
                {
                    timeSpanArray.map((res, i, arr) => {
                        return (
                            <TouchableOpacity underlayColor='transparent' key={i} onPress={() => this._onSelect(res)}>
                                <Text style={{fontSize:18, padding: 8, alignSelf: 'center', color: '#fff', fontWeight: '400'}}>{res.showText}</Text>
                            </TouchableOpacity>
                        );
                    })
                }
            </Popover>
        return (
            <View style={styles.container}>
                <NavigationBar
                    titleView={this._renderTitleView()}
                    style={styles.bgColor}
                    statusBar={{
                        backgroundColor: '#2196f3'
                    }}
                />
                {content}
                {timeSpanView}
            </View>
        );
    }
}

class TrendingTab extends Component{
    constructor(props) {
        super(props);
        this.timeSpan = this.props.timeSpan;
        this.trendingUtils = new TrendingUtils();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            isLoading: true,
            dataSource: ds
        }
        this._onRefresh()
    }

    componentDidMount() {
        this._getData(this.props.timeSpan);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.timeSpan !== this.props.timeSpan){
            this._getData(nextProps.timeSpan);
        } else {
            this._getData(this.props.timeSpan);
        }
    }

    // 获取每条的dataSource数据
    getDataSource(projectModels) {
        return this.state.dataSource.cloneWithRows(projectModels);
    }

    // 更新Project 每条的收藏状态
    flushFavorite() {
        let projectModels = [];
        let items = this.items;
        items.forEach((result, index) => {
            let isFlag = Utils.checkFavorite(result, this.state.favoriteKeys);
            projectModels.push(new ProjectModel(result, isFlag));
        });
        this.updateState({
            dataSource: this.getDataSource(projectModels),
            isLoading: false
        });
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
    _getData(timeSpan) {
        let dataUrl = this._getUrl(timeSpan, this.props.tabLabel);
        this.trendingUtils.get(dataUrl)
        // this.dataRepository.fetchRepository(dataUrl)
        .then((result) => {
            result = JSON.parse(result);
            this.items = result && result.items ? result.items : result ? result : [];

            this.getFavoriteKeys();
            // this.setState({
            //     dataSource: this.state.dataSource.cloneWithRows(items),
            //     isLoading: false
            // });
        })
        .then(items => {
            if (!items || items.length === 0) return;
            this.items = items;
            this.getFavoriteKeys();
            // this.setState({
            //     dataSource: this.state.dataSource.cloneWithRows(items)
            // });
        })
        .catch((error) => {
            
        })
    }

    _getUrl(timespan, category) {
        return `${URL}${category}?${timespan.searchText}`;
    }
    
    _renderRow(projectModel) {
        return (
            <TrendingCell
                onSelect={() => this.onSelect(projectModel)}
                ProjectModel={projectModel}
                onFavorite={(item, isFavorite) => this.onFavorite(item, isFavorite)}
            />
        )
    }

    // 收藏图标的单击回调函数
    onFavorite(item, isFavorite) {
        if (isFavorite) {
            favoriteDao.saveFavoriteItem(item.url, JSON.stringify(item));
        }
        else {
            favoriteDao.removeFavoriteItem(item.url);
        }
    }

    onSelect(item) { // 从TrendingCell页面传回来的事件
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
        this._getData(this.props.timeSpan);
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

