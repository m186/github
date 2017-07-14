/*
 * 关于的公共页面
 * aboutCommon
*/
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ViewUtils from '../../utils/ViewUtils';
import GlobalStyles from '../../../res/styles/GlobalStyle';
import {MORE_MENU} from '../../common/MoreMenu';

export var FLAG_ABOUT = {flag_about: 'about', flag_about_me: 'about_me'}
export default class AboutCommon{
    constructor(props, updateState, flag_about) {
        this.props = props;
        this.updateState = updateState;
        this.flag_about = flag_about;
    }

    renderView(contentView) {
        const { onScroll = () => {} } = this.props;
        return (
            <ParallaxScrollView
                onScroll={onScroll}
                headerBackgroundColor="#333"
                backgroundColor="#2196f3"
                stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
                parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                backgroundSpeed={10}

                renderBackground={() => (
                    <View key="background">
                        <Image source={require('../my/img/1.jpg')}/>
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            width: WIDTH,
                            backgroundColor: 'rgba(0,0,0,.2)',
                            height: PARALLAX_HEADER_HEIGHT
                        }}/>
                    </View>
                )}

                renderForeground={() => (
                    <View key="parallax-header" style={ styles.parallaxHeader }>
                        <Image style={ styles.avatar } source={require('../my/img/fire1.png')}/>
                        <Text style={ styles.sectionSpeakerText }>
                            GitHub Popular
                        </Text>
                        <Text style={ styles.sectionTitleText }>
                            这是一个拿来查看GitHub最受欢迎与最热项目的APP,它基于React Native支持Android和IOS双平台。
                        </Text>
                    </View>
                )}

                renderStickyHeader={() => (
                    <View key="sticky-header" style={styles.stickySection}>
                        <Text style={ styles.stickySectionText }>
                            GitHub Popular
                        </Text>
                    </View>
                )}

                renderFixedHeader={() => (
                    <View key="sticky-header" style={styles.fixedSection}>
                        {ViewUtils.leftButton(() => this.props.navigator.pop())}
                    </View>
                )}
            >
                {contentView}
            </ParallaxScrollView>
        );
    }
}

const WIDTH = Dimensions.get('window').width;
const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#666'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: WIDTH,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: WIDTH,
    },
    stickySectionText: {
        color: '#fff',
        fontSize: 20,
        marginTop: (Platform.OS === 'ios') ? ROW_HEIGHT - 30 : ROW_HEIGHT - 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    fixedSection: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        left: 0,
        top: 0,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2,
        height: 100,
        width: 100,
        tintColor: '#fff'
    },
    sectionSpeakerText: {
        color: '#fff',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        margin: 10,
        color: '#fff',
        fontSize: 14,
        paddingVertical: 5
    }
});


