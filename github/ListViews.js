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
import NavigationBar from './NavigationBar';
import Toast, {DURATION} from 'react-native-easy-toast';

const WIDTH = Dimensions.get('window').width;
let data = {
    "data":[
        {
            "age":"52","desc":"lbhnlvxdrcdhtodmhuoi","name":"Elizabeth Clark"
        }
        ,
        {
            "age":"49","desc":"vrrshdjihlhkxvzzghir","name":"Lisa Walker"
        }
        ,
        {
            "age":"95","desc":"srjdtjnerqdynympregj","name":"Kimberly White"
        }
        ,
        {
            "age":"40","desc":"xtdmwsfirhgtyybmegjp","name":"Jose Thompson"
        }
        ,
        {
            "age":"35","desc":"hfukfrcojdlyxxcmwxzf","name":"Ruth Gonzalez"
        }
        ,
        {
            "age":"89","desc":"vwypsutiwebsmsgbdbxo","name":"Paul Brown"
        }
        ,
        {
            "age":"52","desc":"wpiwjpwkglkjtqnpupvv","name":"Mark Hall"
        }
        ,
        {
            "age":"91","desc":"hcbthjntrclcyrnmrbjl","name":"Anna Anderson"
        }
        ,
        {
            "age":"92","desc":"kuenrxbkxkifgvtgnnmz","name":"Kimberly White"
        }
        ,
        {
            "age":"99","desc":"ucoihjwpawmillskekzr","name":"Mark Davis"
        }
    ],
    "success":true,
    "total":100
}
export default class ListViews extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data.data),
            isLoading: true,
        }
        this._onRefresh();
    }
    _info(item) {
        this.toast.show('你点击了' + item, DURATION.LENGTH_SHORT)
    }
    _renderRow(item) {
        return (
            <TouchableOpacity onPress={() => this._info(item.name)}>
                <View style={styles.rowBox}>
                    <Text>Name: {item.name}</Text>
                    <Text style={styles.ageBox}>Age: {item.age}</Text>
                    <Text>Description: {item.desc}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return <View key={rowID} style={styles.line}></View>
    }
    _renderFooter() {
        return <Image style={{width:WIDTH, height:100}} source={{uri:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=960080664,620211270&fm=26&gp=0.jpg'}}/>
    }
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
                    renderFooter={() => this._renderFooter()}
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

 