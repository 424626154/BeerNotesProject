'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import NetUitl from "../netutil";

export default class ForgetVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _forget(){
    let reg = this;
    if(this.state.email == ''){
      Alert.alert('请输入邮箱');
      return;
    }
    		let data={'email':this.state.email};
    		let url = "/app/email"
    		NetUitl.postJson(url,data,function (set){
    				switch (set.errcode) {
    					case 0:
    						reg._goBack();
    						break;
    					default:
    						Alert.alert(set.errmsg);
    						break;
    				}
    			});
  }
  _renderForget(){
    return(
      <View style={styles.bg}>
          <View style={styles.row}>
            <Image style={styles.thumb} source={require('../../resource/email_normal.png')}/>
            <TextInput
               style={styles.ti}
               onChangeText={(text) => this.setState({email:text})}
               value={this.state.email}
               placeholder={'输入邮箱'}
               underlineColorAndroid="transparent"
             />
          </View>
          <View style={styles.row}>
          <View style={styles.text}>
          <TouchableOpacity onPress={()=>this._forget()}>
          <Text>忘记密码</Text>
          </TouchableOpacity>
          </View>
          </View>
      </View>
    )
  }
  constructor(props){
    super(props);
    this.state = {
      email:'',
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
      title: '忘记密码',
      tintColor:'#ffffff'
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        tintColor={'#34495e'}
        title={titleConfig} />
      {this._renderForget()}
      </View >
    );
  }
}

var styles = StyleSheet.create({
  bg:{
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
    margin:5,
    // backgroundColor: '#F6F6F6',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    // padding: 10,
    paddingTop:1,
    paddingBottom:1
  },
  thumb: {
    width: 32,
    height: 32,
  },
  ti: {
    flex: 1,
    fontSize:10,
    height: 32,
    textAlign:'left',
    // // backgroundColor:'#7f8c8d',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
    // backgroundColor:'#ff00ff'
  },
  text:{
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
    margin:5,
    width: 80,
    height: 30,
    alignItems: 'center',
    justifyContent:'center',
  }
});
