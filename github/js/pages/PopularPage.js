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
import RepositoryDetail from './RepositoryDetail';

// import Navigator from 'react-native-deprecated-custom-components/src/Navigator';
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const WIDTH = Dimensions.get('window').width;

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
            dataSource: ds
        }
        this._onRefresh()
    }

    componentDidMount() {
        this._getData();
    }

    // 获取数据
    _getData() {
        let dataUrl = this._getUrl();
        this.httpUtils.get(dataUrl)
        // this.dataRepository.fetchRepository(dataUrl)
        .then((result) => {
            result = JSON.parse(result);
            let items = result && result.items ? result.items.items : result ? result : [];
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

    _getUrl() {
        return URL + this.props.tabLabel + QUERY_STR;
    }
    
    _renderRow(item) {
        return (
            <RepositoryCell
                onSelect={(item) => this.onSelect(item)}
                key={item.id}
                item={item}
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
