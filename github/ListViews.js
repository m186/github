import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl
} from 'react-native';
import NavigationBar from './js/common/NavigationBar';
import HttpUtils from './js/common/HttpUtils';
import Toast, {DURATION} from 'react-native-easy-toast';

const WIDTH = Dimensions.get('window').width;

export default class ListViews extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            isLoading: true,
            data: ''
        }
        this._onRefresh();
    }
    componentDidMount() {
        this._getData();
    }
    _getData() {
        HttpUtils.get('https://api.github.com/search/repositories?q=java&sort=stars')
        .then((result) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(result.items)
            })
        })
        .catch((error) => {
            this.setState({
                data: error.message
            })
        })
    }
    _info(item) {
        this.toast.show('你点击了' + item, DURATION.LENGTH_SHORT)
    }
    _renderRow(item) {
        return (
            <TouchableOpacity onPress={() => this._info(item.full_name)}>
                <View style={styles.rowBox}>
                    <Text>Name: {item.full_name}</Text>
                    <Text style={styles.ageBox}>created_at: {item.created_at}</Text>
                    <Text>Description: {item.description}</Text>
                </View>
                <View><Text>{this.state.data}</Text></View>
            </TouchableOpacity>
        );
    }
    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return <View key={rowID} style={styles.line}></View>
    }
    // _renderFooter() {
    //     return <Image style={{width:WIDTH, height:100}} source={{uri:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=960080664,620211270&fm=26&gp=0.jpg'}}/>
    // }
    _onRefresh() {
        if (!this.state.isLoading) {
            this.setState({
                isLoading: true
            })
        }
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 2000);
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar 
                    style={styles.bgColor}
                    title={'ListView'}
                    statusBar={{
                        backgroundColor: '#388E8E'
                    }}
                />
                <ListView
                    dataSource={this.state.dataSource} // 所有数据
                    renderRow={(item) => this._renderRow(item)} // 每条数据
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this._renderSeparator(sectionID, rowID, adjacentRowHighlighted)} // 显示每行下面的分割线
                    
                    refreshControl={
                        <RefreshControl 
                            refreshing={this.state.isLoading}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />
                    }
                />
                <Toast ref={toast => {this.toast = toast}}/>
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
        backgroundColor: '#388E8E'
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

 