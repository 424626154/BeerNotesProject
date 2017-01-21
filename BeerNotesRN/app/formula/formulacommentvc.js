'use strict';
import React, { Component } from 'react';
import NetUitl from "../netutil";
import StorageUitl from '../storageutil';
let globaldata = require('../globaldata');
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class FormulaCommentVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _goComment(){
    if(this.state.comment.length <= 0 ){
      Alert.alert("请输入评论内容");
      return;
    }
    if(this.state.comment.length > 120){
      Alert.alert("评论内容应少于120");
      return;
    }
    this._commentFormula(this.state.fid,this.state.fcid,this.state.comment);
  }
  _commentFormula(fid,fcid,comment){
    var reg = this;
    let data={'token':globaldata.token,'fid':fid,'fcid':fcid,'comment':comment};
    let url = "/app/commentformula"
    console.log(data)
    NetUitl.postJson(url,data,function (set){
        switch (set.errcode) {
          case 0:
            DeviceEventEmitter.emit('refreshfcommont');
            reg._goBack()
            break;
          default:
            Alert.alert(set.errmsg);
            break;
        }
      });
  }
  _queryFormulaComment(data){

  }
  _getUser(){
    StorageUitl.getUser(this._getUserCallback)
  }

  _getUserCallback(user){
    if(user != null &&user.Username != ''){
      var username = user.Username;
      var token = user.Token
      globaldata.username = username;
      globaldata.token = token;
    }
  }
  constructor(props){
    super(props);
    this._getUser = this._getUser.bind(this);
    this._getUserCallback = this._getUserCallback.bind(this);
    this._commentFormula = this._commentFormula.bind(this);
    this.state = {
      username:'',
      token:'',
      fid:'',
      fcid:0,
      comment:'',
    }
  }
  componentDidMount() {
    this.setState({
         fid:this.props.fid,
         fcid:this.props.fcid,
     });
     console.log("fid",this.props.fid)
     console.log("fcid",this.props.fcid);
     this._getUser();
  }
  componentWillUnmount(){

  }
  render(){
    const leftButtonConfig = {
       title: '返回',
       tintColor:'#ffffff',
       handler: () => this._goBack(),
     };
     const rightButtonConfig = {
      title: '发布',
      tintColor:'#ffffff',
      handler:() => this._goComment(),
    };
    var titleConfig = {
      title: '评论',
      tintColor:'#ffffff'
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        rightButton={rightButtonConfig}
        tintColor={'#34495e'}
        title={titleConfig} />
        <View style={styles.row}>
          <TextInput
             style={styles.ti}
             onChangeText={(text) => this.setState({comment:text})}
             value={this.state.comment}
             placeholder={'请输入评论内容'}
             underlineColorAndroid="transparent"
           />
        </View>
      </View >
    );
  }
}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    // padding: 10,
    // backgroundColor: '#F6F6F6',
    paddingTop:1,
    paddingBottom:1,
  },
  ti:{
    // backgroundColor:'#7f8c8d',
    flex: 1,
    fontSize:10,
    height: 100,
    textAlign:'left',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
});
