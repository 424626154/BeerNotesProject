'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Platform,
  NativeModules,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
var AppManager = NativeModules.AppManager;
export default class AboutVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _getAppVersion(){
    if(Platform.OS === 'ios'){
      AppManager.getAppVersion().then((datas)=> {
              var ver = '版本号 '+datas
              this.setState({
                appverison:ver,
              })
          }).catch((err)=> {
              console.warn('err', err);
          });
    }else{
      AppManager.getAppVersion(
        (version) => {
            var ver = '版本号 '+version
            this.setState({
              appverison:ver,
            })
        },
        (err) => {
          console.warn('err', err);
        }
      );
    }
  }
  constructor(props){
    super(props);
    this.state = {
      appverison:'',
    }
  }
  componentDidMount() {
      this._getAppVersion();
  }
  componentWillUnmount(){

  }
  render(){
    const leftButtonConfig = {
       title: '返回',
       tintColor:'#ffffff',
       handler: () => this._goBack(),
     };
    var titleConfig = {
      title: '关于我们',
      tintColor:'#ffffff'
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        tintColor={'#34495e'}
        title={titleConfig} />
        <View  style={styles.ver}>
         <Text>{this.state.appverison}</Text>
        </View>
        <View style={styles.textbg}>
          <Text style={styles.text}>这是一款关于家酿啤酒的app，希望征求大家的宝贵意见，同时app中的内容如有侵犯到他人利益的希望告知，开发者会及时删除有争议的内容{'\n'}邮箱：13671172337@163.com{'\n'}微信：zz580kf01</Text>
        </View>
      </View >
    );
  }
}

var styles = StyleSheet.create({
  ver:{
    paddingTop:20,
    flexDirection: 'row',
    justifyContent:'center'
  },
  textbg:{
    padding:10
  },
  text:{
    fontSize:15
  }
});
