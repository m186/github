import React,{Component, PropTypes} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    Platform,
    StatusBar
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const NAV_BAR_HEIGHT_ANDROID = 50;
const NAV_BAR_HEIGHT_IOS = 44;
const STATUS_BAR_HEIGHT = 20;
const StatusBarShape = {
    backgroundColor: PropTypes.string,
    barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
    hiddle: PropTypes.bool
}

export default class NavigationBar extends Component{
    // 属性约束
    static propTypes = {
        style: View.propTypes.style,
        title: PropTypes.string,    
        titleView: PropTypes.element,
        hide: PropTypes.bool,
        leftButton: PropTypes.element,
        rightButton: PropTypes.element,
        statusBar: PropTypes.shape(StatusBarShape)
    }
    static defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            hiddle: false
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            hide: false
        }
    }
    render() {
        // 状态条
        let statusBar = <View style={[styles.statusBarContainer, this.props.statusBar]}>
                <StatusBar {...this.props.statusBar}/>
            </View>
        
        // 标题
        let titleView = this.props.titleView
            ? this.props.titleView
            : <Text style={styles.title}>{this.props.title}</Text>

        // NavigationBar主体（包括左中右）
        let content = <View style={styles.navBar}>
            {this.props.leftButton}
            <View style={styles.titleViewContainer}>
                {titleView}
            </View>
            {this.props.rightButton}
        </View>
        
        return (
            <View style={[styles.container, this.props.style]}>
                {statusBar}
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ccc'
    },
    navBar: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
        // backgroundColor: 'teal',
        flexDirection: 'row',
        width: WIDTH
    },
    titleViewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0
    },
    title: {
        fontSize: 20,
        color: '#fff'
    },
    statusBarContainer: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
        width: WIDTH
    }
});