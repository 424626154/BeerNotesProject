'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  WebView
} from 'react-native';
import NavigationBar from 'react-native-navbar';
var default_html = '<!DOCTYPE html><html><body><h1>相关记录</body></html>';
export default class KnowberwconVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  constructor(props){
    super(props);
    this.state = {
      kbname:"初识精酿",
      url:default_html,
    }
  }
  componentDidMount() {
    console.log("kbname:",this.props.kbname)
    console.log("url:",this.props.url)
    this.setState({
            kbname:this.props.kbname,
    	 			url : this.props.url
    	 	})
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
      title: this.state.kbname,
      tintColor:'#ffffff'
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        tintColor={'#34495e'}
        title={titleConfig} />
        <WebView
          ref={"webview"}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: this.state.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          onNavigationStateChange={this.onNavigationStateChange}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          startInLoadingState={true}
          scalesPageToFit={this.state.scalesPageToFit}
        />
      </View >
    );
  }
}

var styles = StyleSheet.create({

});
