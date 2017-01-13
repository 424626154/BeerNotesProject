'use strict';
import React, { Component } from 'react';
import NetUitl from "../netutil";
import StorageUitl from '../storageutil'

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  DeviceEventEmitter
} from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class RegisterVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _register(){
    let reg = this;
    if(this.state.username == ''){
      Alert.alert('请输入用户名');
      return;
    }
    if(this.state.password == ''){
      Alert.alert('请输入密码');
      return;
    }
    if(this.state.confirmpass == ''){
      Alert.alert('请输入确认密码');
      return;
    }
    if(this.state.password != this.state.confirmpass){
      Alert.alert('两次输入的密码不一致');
      return;
    }
    		let data={'username':this.state.username,'password':this.state.password,'email':this.state.email};
    		let url = "/app/register"
    		NetUitl.postJson(url,data,function (set){
    				switch (set.errcode) {
    					case 0:
                StorageUitl.saveRegister(set.data)
                DeviceEventEmitter.emit('registerSuccess');
    						reg._goBack();
    						break;
    					default:
    						Alert.alert(set.errmsg);
    						break;
    				}
    			});
  }
  _renderLogin(){
    return(
      <View style={styles.bg}>
          <View style={styles.row}>
            <Image style={styles.thumb} source={require('../../resource/username_normal.png')}/>
            <TextInput
               style={styles.ti}
               onChangeText={(text) => this.setState({username:text})}
               value={this.state.username}
               placeholder={'输入用户名'}
               underlineColorAndroid="transparent"
             />
          </View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={require('../../resource/password_normal.png')}/>
            <TextInput
               style={styles.ti}
               onChangeText={(text) => this.setState({password:text})}
               value={this.state.password}
               placeholder={'输入密码'}
               underlineColorAndroid="transparent"
             />
          </View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={require('../../resource/password_normal.png')}/>
            <TextInput
               style={styles.ti}
               onChangeText={(text) => this.setState({confirmpass:text})}
               value={this.state.confirmpass}
               placeholder={'再次输入密码'}
               underlineColorAndroid="transparent"
             />
          </View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={require('../../resource/email_normal.png')}/>
            <TextInput
               style={styles.ti}
               onChangeText={(text) => this.setState({email:text})}
               value={this.state.email}
               placeholder={'输入邮箱以便找回密码'}
               underlineColorAndroid="transparent"
             />
          </View>
          <View style={styles.row}>
          <View style={styles.text}>
          <TouchableOpacity onPress={()=>this._register()}>
          <Text>注册</Text>
          </TouchableOpacity>
          </View>
          </View>
      </View>
    )
  }
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
      confirmpass:'',
      email:''
    }
  }
  render(){
    const leftButtonConfig = {
       title: '返回',
       tintColor:'#ffffff',
       handler: () => this._goBack(),
     };
    var titleConfig = {
      title: '注册',
      tintColor:'#ffffff'
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        tintColor={'#34495e'}
        title={titleConfig} />
        {this._renderLogin()}
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
