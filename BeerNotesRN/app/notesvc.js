'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';

import NavigationBar from 'react-native-navbar';

export default class NotesVC extends React.Component {

  render(){
    var titleConfig = {
      title: '笔记',
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        title={titleConfig} />
      <Text>notes</Text>
      </View >
    );
  }
}
