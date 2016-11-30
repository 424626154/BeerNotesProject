'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';


var vc;
var sqlitehelper;
export default class BaseVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  constructor(props){
    super(props);
    vc = this;
    this.state = {

    }
  }
  componentDidMount() {

  }
  componentWillUnmount(){

  }
  render(){
    return(
      <View style={{flex: 1}}>
      </View >
    );
  }
}

var styles = StyleSheet.create({

});
