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
  AsyncStorage,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import NetUitl from "../netutil";
import StorageUitl from '../storageutil'

export default class ModifyVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _modify(){
    StorageUitl.getUser(this._getUserCallback)
  }
  _getUserCallback(user){
    if(user != null &&user.Username != ''){
      var username = user.Username;
      this._sendModify(username)
    }else{
      Alert.alert('登录信息失效');
    }
  }
  _sendModify(username){
    let reg = this;
    if(this.state.password == ''){
      Alert.alert('请输入密码');
      return;
    }
    if(this.state.newpass == ''){
      Alert.alert('请输入密码');
      return;
    }
    let data={'username':username,'password':this.state.password,'newpass':this.state.newpass};
    let url = "/app/modify";
    NetUitl.postJson(url,data,function (set){
        switch (set.errcode) {
          case 0:
            StorageUitl.saveUser(set.data)
            reg._goBack();
            break;
          default:
            Alert.alert(set.errmsg);
            break;
        }
      });
  }

  constructor(props){
    super(props);
    this._getUserCallback = this._getUserCallback.bind(this);
    this._sendModify = this._sendModify.bind(this);
    this.state = {
      password:'',
      newpass:'',
    }
  }
  componentDidMount() {

  }
  componentWillUnmount(){

  }
  _renderModify(){
    return(
      <View style={styles.bg}>
          <View style={styles.row}>
            <Image style={styles.thumb} source={require('../../resource/password_normal.png')}/>
            <TextInput
               style={styles.ti}
               onChangeText={(text) => this.setState({password:text})}
               value={this.state.email}
               placeholder={'输入旧密码'}
               underlineColorAndroid="transparent"
             />
          </View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={require('../../resource/password_normal.png')}/>
            <TextInput
               style={styles.ti}
               onChangeText={(text) => this.setState({newpass:text})}
               value={this.state.email}
               placeholder={'输入新密码'}
               underlineColorAndroid="transparent"
             />
          </View>
          <View style={styles.row}>
          <View style={styles.text}>
          <TouchableOpacity onPress={()=>this._modify()}>
          <Text>修改密码</Text>
          </TouchableOpacity>
          </View>
          </View>
      </View>
    )
  }
  render(){
    const leftButtonConfig = {
       title: '返回',
       tintColor:'#ffffff',
       handler: () => this._goBack(),
     };
    var titleConfig = {
      title: '修改密码',
      tintColor:'#ffffff'
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        tintColor={'#34495e'}
        title={titleConfig} />
        {this._renderModify()}
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
