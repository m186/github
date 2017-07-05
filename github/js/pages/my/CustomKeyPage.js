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
    Alert
} from 'react-native';
import NavigationBar from '../../common/NavigationBar'; // 顶部标题栏
import ViewUtils from '../../utils/ViewUtils';          // 左侧返回按钮
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'; // 自定义标签存储与取出组件
import CheckBox from 'react-native-check-box'; // 自定义标签存储与取出组件
import ArrayUtils from '../../utils/ArrayUtils'; // 数组更新工具

export default class CustomKeyPage extends Component {
    constructor(props) {
        super(props);
        this.isRemove = this.props.isRemove ? true : false;
        this.languageDao = new LanguageDao(this.props.flag);
        this.changeValues = [];
        this.removeArr = [];
        this.state = {
            dataArray: []
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.languageDao.fetch()
        .then((result) => {
            this.setState({
                dataArray: result
            })
        })
        .catch((error) => {
            console.log(err);
        })
    }

    _rightButton() { // 右侧保存按钮
        return (
            <TouchableOpacity onPress={() => this._save()} >
                <Text style={styles.save}>Save</Text>
            </TouchableOpacity>
        );
    }

    _rightButtons() { // 右侧保存按钮
        return (
            <TouchableOpacity onPress={() => this._remove()} >
                <Text style={styles.save}>Remove</Text>
            </TouchableOpacity>
        );
    }

    _remove() {
        if (this.removeArr.length === 0) 
        {
            Alert.alert(
                '温馨提示',
                '请选择需要移除的标签',
                [
                    {text: '确定', onPress: () => {}}
                ]
            )
            return;
        }
        else
        {
            Alert.alert(
                '温馨提示', 
                '是否确定移除', 
                [
                    {text: '移除', onPress: () => {
                        let arr1 = ArrayUtils.remove(this.state.dataArray, this.removeArr);
                        this.setState({
                            dataArray: arr1
                        });
                        this.languageDao.save(this.state.dataArray);
                        this.props.navigator.pop();
                    }},
                    {text: '不移除', onPress: () => {}},
                ]
            );
        }
    }

    _save() { // 保存按钮点击事件，先进行保存
        if (this.changeValues.length === 0) 
        {
            this.props.navigator.pop();
            return;
        }
        this.languageDao.save(this.state.dataArray);
        this.props.navigator.pop();
    }

    _onSave() { // 返回按钮点击事件，先判断是否保存
        if (this.changeValues.length === 0) 
        {
            this.props.navigator.pop();
            return;
        }
        Alert.alert(
            '温馨提示', 
            '是否要保存修改？', 
            [
                {text: '保存', onPress: () => {
                    this.languageDao.save(this.state.dataArray);
                    this.props.navigator.pop();
                }},
                {text: '不保存', onPress: () => this.props.navigator.pop()},
            ]
        );
    }
    
    renderView() { // ScrollView内容
        if (!this.state.dataArray || this.state.dataArray.length === 0) return null;
        let len, views = [];

        if (len % 2 === 0) 
        {
            len = this.state.dataArray.length;
        }
        else
        {
            len = this.state.dataArray.length - 1;
        }

        for (let i=0; i<len; i+=2) {
            views.push(
                <View key={i}>
                    <View style={styles.rowbox}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i+1])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        }

        if ((len+1) % 2 !== 0) {
            views.push(
                <View key={len}>
                    <View style={styles.rowbox}>
                        {this.renderCheckBox(this.state.dataArray[len])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        }
        return views;
    }

    onClick(data) { // 点击选中或取消对数组进行更新存储
        if (this.isRemove) {
            this.removeArr.push(data.name);
        } else {
            data.checked = !data.checked;
            ArrayUtils.arrayUpdate(this.changeValues, data);
        }
    }

    renderCheckBox(data) {
        let leftText = data.name;
        let isChecked = this.isRemove ? false : data.checked;
        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={()=>this.onClick(data)}
                isChecked={isChecked}
                leftText={leftText}
                checkedImage={<Image style={styles.imgBgColor} source={require('../../../res/images/ic_check_box.png')}/>}
                unCheckedImage={<Image style={styles.imgBgColor} source={require('../../../res/images/ic_check_box_outline_blank.png')}/>}
            />
        );
    }

    render() {
        let title = this.props.flag === FLAG_LANGUAGE.flag_key ? 'Key Custom' : 'Language Custom';
        let EditTitle = this.props.flag === FLAG_LANGUAGE.flag_key ? 'Key Edit' : 'Language Edit';
        return (
            <View style={styles.container}>
                {
                    this.isRemove
                    ? <NavigationBar 
                        style={styles.bgColor}
                        title={EditTitle}
                        leftButton={ViewUtils.leftButton(() => this._onSave())}
                        rightButton={this._rightButtons()}
                        statusBar={{
                            backgroundColor: '#2196f3'
                        }}
                    />
                    : <NavigationBar 
                        style={styles.bgColor}
                        title={title}
                        leftButton={ViewUtils.leftButton(() => this._onSave())}
                        rightButton={this._rightButton()}
                        statusBar={{
                            backgroundColor: '#2196f3'
                        }}
                    />
                }
                <ScrollView>
                    {this.renderView()}
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
    }
});

 