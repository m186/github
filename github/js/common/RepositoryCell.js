/* 
 * 列表样式组件
 * RepositoryCell
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

export default class RepositoryCell extends Component{
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
        const item = this.props.ProjectModel.item ? this.props.ProjectModel.item : this.props.ProjectModel;
        let favoriteButton = <TouchableOpacity onPress={() => this._favoriteButton()}>
            <Image style={styles.starBox} source={this.state.favoriteIcon}/>
        </TouchableOpacity>
        return (
            <TouchableOpacity onPress={this.props.onSelect} style={styles.container}>
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{item.full_name}</Text>
                    <Text style={styles.desc}>{item.description}</Text>
                    <View style={styles.lowerBox}>
                        <View style={styles.authorBox}>
                            <Text>Author: </Text>
                            <Image style={styles.imageBox} source={{uri: item.owner.avatar_url}}/>
                        </View>
                        <View style={styles.authorBox}>
                            <Text>Stars: </Text>
                            <Text>{item.stargazers_count}</Text>
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
        marginBottom: 2,
        color: '#212121'
    },
    desc: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    lowerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    authorBox: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    imageBox: {
        width: 22,
        height:22
    },
    starBox: {
        width: 18,
        height:18,
        tintColor: '#2196f3'
    }
});