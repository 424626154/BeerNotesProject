'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class MeVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  constructor(props){
    super(props);
    this.state = {
      demo:'',
    }
  }
  componentDidMount() {

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
      title: '我',
      tintColor:'#ffffff'
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        tintColor={'#34495e'}
        title={titleConfig} />
      <Text>me</Text>
      </View >
    );
  }
}

var styles = StyleSheet.create({

});
