/* 
 * 列表样式组件
 * TrendingCell
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import HTMLView from 'react-native-htmlview';

export default class TrendingCell extends Component{
    constructor(props) {
        super(props);
        let isFavorite = this.props.ProjectModel.isFavorite;
        let favoriteIcon = isFavorite ? require('../../res/images/stars1.png') : require('../../res/images/star1.png');
        this.state = {
            isFavorite: isFavorite,
            favoriteIcon: favoriteIcon
        }
    }

    _favoriteButton() {
        if (this.state.isFavorite) {
            this.setState({
                isFavorite: false,
                favoriteIcon: require('../../res/images/star1.png')
            });    
        }
        else {
            this.setState({
                isFavorite: true,
                favoriteIcon: require('../../res/images/stars1.png')
            });
        }
        this.props.onFavorite(this.props.ProjectModel.item, !this.state.isFavorite);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isFavorite: nextProps.ProjectModel.isFavorite,
            favoriteIcon: nextProps.ProjectModel.isFavorite ? require('../../res/images/stars1.png') : require('../../res/images/star1.png')
        })
    }

    render() {
        // const itemFlag = this.props.ProjectModel.item ? this.props.ProjectModel.item : this.props.ProjectModel;
        const item = this.props.ProjectModel.item ? this.props.ProjectModel.item : this.props.ProjectModel;
        let description = `<p>${item.description}</p>`;
        let favoriteButton = <TouchableOpacity onPress={() => this._favoriteButton()}>
            <Image style={styles.starBox} source={this.state.favoriteIcon}/>
        </TouchableOpacity>
        return (
            <TouchableOpacity onPress={this.props.onSelect} style={styles.container}>
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{item.fullName}</Text>
                    <HTMLView 
                        value={description}
                        onLinkPress={(url) => {console.log(11112222)}}
                        stylesheet={{
                            p: styles.desc,
                            a: styles.aStyle
                        }}
                    />
                    <Text style={styles.desc}>{item.meta}</Text>
                    <View style={styles.lowerBox}>
                        <View style={styles.authorBox}>
                            <Text style={styles.authorTitle}>Built by: </Text>
                            {
                                item.contributors.map((res, i, arr) => {
                                    return <Image style={styles.imageBox} key={i} source={{uri: res}}/>;
                                })
                            }
                        </View>
                        {favoriteButton}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cell_container: {
        backgroundColor: '#fff',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#ddd',
        // ios中的阴影样式
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        // android中的阴影样式
        elevation: 2
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
        color: '#212121'
    },
    desc: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    lowerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    authorBox: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    authorTitle: {
        color: '#757575',
        fontSize: 14
    },
    imageBox: {
        width: 22,
        height:22,
        marginLeft: 2
    },
    starBox: {
        width: 18,
        height:18,
        tintColor: '#2196f3'
    },
    aStyle: {
        color: '#2196f3',
        fontSize: 14
    }
});