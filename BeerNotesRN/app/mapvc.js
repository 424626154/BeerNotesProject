'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import BNMapVC from './bnmap'

export default class MapVC extends React.Component {
  render(){
    var titleConfig = {
      title: '地图',
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        title={titleConfig} />
        <BNMapVC style={{flex: 1}}></BNMapVC>
      </View >
    );
  }
}
