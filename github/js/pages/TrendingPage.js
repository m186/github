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

const WIDTH = Dimensions.get('window').width;
const URL = 'https://github.com/trending/';

export default class TrendingPage extends Component{
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
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
                    return result.checked ? <TrendingTab key={i} tabLabel={result.name} {...this.props}>{result.name}</TrendingTab> : null;
                })
            }
        </ScrollableTabView>
        : null;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'Trending'}
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

class TrendingTab extends Component{
    constructor(props) {
        super(props);
        this.trendingUtils = new TrendingUtils();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            isLoading: true,
            dataSource: ds
        }
        this._onRefresh()
    }

    componentDidMount() {
        this._getData();
    }

    // 获取数据
    _getData() {
        let dataUrl = this._getUrl('?since=daily', this.props.tabLabel);
        this.trendingUtils.get(dataUrl)
        // this.dataRepository.fetchRepository(dataUrl)
        .then((result) => {
            result = JSON.parse(result);
            let items = result && result.items ? result.items : result ? result : [];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                isLoading: false
            });
        })
        .then(items => {
            if (!items || items.length === 0) return;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });
        })
        .catch((error) => {
            
        })
    }

    _getUrl(timespan, category) {
        return `${URL}${category}${timespan.searchText}`;
    }
    
    _renderRow(item) {
        return (
            <TrendingCell
                onSelect={(item) => this.onSelect(item)}
                item={item}
            />
        )
    }

    onSelect(item) { // 从TrendingCell页面传回来的事件
        debugger;
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

