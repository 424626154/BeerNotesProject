'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import FeedbcakVC from './feedbackvc'
export default class BNFeedbackVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  // _closeFeedback() {
  //   alert("closeFeedback");
  // }
  constructor(props){
    super(props);
  }
  render(){
    const leftButtonConfig = {
       title: '返回',
       tintColor:'#ffffff',
       handler: () => this._goBack(),
     };
    var titleConfig = {
      title: '用户反馈',
      tintColor:'#ffffff'
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        tintColor={'#34495e'}
        title={titleConfig} />
        <FeedbcakVC style={{flex: 1}} onCloseFeedback={()=>this._goBack()}></FeedbcakVC>
      </View >
    );
  }
}
