/*
 * 自定义标签页
 * 选择需要在首页中展示的标签
 * CustomKeyPage
*/
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,
    Alert,
    TouchableHighlight
} from 'react-native';
import NavigationBar from '../../common/NavigationBar'; // 顶部标题栏
import ViewUtils from '../../utils/ViewUtils';          // 左侧返回按钮
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'; // 自定义标签存储与取出组件
import ArrayUtils from '../../utils/ArrayUtils'; // 数组更新工具
import SortableListView from 'react-native-sortable-listview'; // 拖拽列表

export default class SortKeyPage extends Component {
    constructor(props) {
        super(props);
        this.dataArray = [];
        this.sortResultArray = [];
        this.orginalCheckedArray = [];
        this.state = {
            checkedArray: []
        }
    }

    componentDidMount() {
        this.languageDao = new LanguageDao(this.props.flag);
        this.loadData();
    }

    loadData() {
        this.languageDao.fetch()
        .then((result) => {
            this._getCheckedArray(result);
        })
        .catch((error) => {
            console.log(err);
        })
    }

    _getCheckedArray(result) {
        this.dataArray = result;
        let checkedArray = [];
        result.forEach((item, index) => {
            if (item.checked) checkedArray.push(item);
        });
        this.setState({
            checkedArray: checkedArray
        });
        this.orginalCheckedArray = ArrayUtils.clone(checkedArray);
    }

    _rightButton() { // 右侧保存按钮
        return (
            <TouchableOpacity onPress={() => this._save()} >
                <Text style={styles.save}>Save</Text>
            </TouchableOpacity>
        );
    }

    _getSortResult() {
        this.sortResultArray = ArrayUtils.clone(this.dataArray);
        this.orginalCheckedArray.forEach((item, index) => {
            let i = this.dataArray.indexOf(item);
            this.sortResultArray.splice(i, 1, this.state.checkedArray[index]);
        })
    }

    _save() { // 保存按钮点击事件，先进行保存
        if (ArrayUtils.isEquil(this.orginalCheckedArray, this.state.checkedArray)) 
        {
            this.props.navigator.pop();
            return;
        }
        this._getSortResult();
        this.languageDao.save(this.sortResultArray);
        this.props.navigator.pop();
    }

    _onSave() { // 返回按钮点击事件，先判断是否保存
        if (ArrayUtils.isEquil(this.orginalCheckedArray, this.state.checkedArray)) 
        {
            this.props.navigator.pop();
            return;
        }
        else
        {
            Alert.alert(
                '温馨提示', 
                '是否要保存修改？', 
                [
                    {text: '保存', onPress: () => {
                        this._getSortResult();
                        this.languageDao.save(this.sortResultArray);
                        this.props.navigator.pop();
                    }},
                    {text: '不保存', onPress: () => this.props.navigator.pop()},
                ]
            );
        }
    }

    render() {
        let title = this.props.flag === FLAG_LANGUAGE.flag_key ? 'Key Sort' : 'Language Sort'
        return (
            <View style={styles.container}>
                <NavigationBar 
                    style={styles.bgColor}
                    title={'Sort'}
                    leftButton={ViewUtils.leftButton(() => this._onSave())}
                    rightButton={this._rightButton()}
                    statusBar={{
                        backgroundColor: '#2196f3'
                    }}
                />
                
                <SortableListView
                    style={{flex: 1}}
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={e => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                        this.forceUpdate();
                    }}
                    renderRow={row => <SortCell data={row} />}
                    />
            </View>
        );
    }
}

class SortCell extends Component{
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <TouchableHighlight
                underlayColor={'#eee'}
                delayLongPress={500}
                style={styles.sortList}
                {...this.props.sortHandlers}
            >   
                <View style={styles.sortBox}>
                    <Image style={styles.hbStyle} source={require('../../../res/images/hb.png')}/>
                    <Text>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#f5f5f5',
        // alignItems: 'center'
    },
    bgColor: {
        backgroundColor: '#2196f3',
    },
    leftButton: {
        width: 22, 
        height: 22,
        marginLeft: 10
    },
    save: {
        fontSize: 14,
        color: '#fff',
        marginRight: 10
    },
    line: {
        height: 0.3,
        backgroundColor: 'darkgray'
    },
    rowbox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imgBgColor: {
        tintColor: '#2196f3'
    },
    sortList: {
        padding: 15,
        paddingLeft: 15,
        paddingRight: 20,
        backgroundColor: "#F8F8F8", 
        borderBottomWidth:1, 
        borderColor: '#eee'
    },
    hbStyle: {
        tintColor: '#2196f3',
        width: 22,
        height: 22
    },
    sortBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

 