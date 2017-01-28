'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Picker,
  Alert,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import NetUitl from "../netutil";
let globaldata = require('../globaldata');

var kbname_img = require('../../resource/fname_normal.png');
var brief_img = require('../../resource/brief_normal.png');
var link_img = require('../../resource/link_normal.png');

export default class AddKnowbrewVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _goSubmit(){
    if(this.state.kbname.length == 0){
      Alert.alert('请输入标题')
      return;
    }
    // if(this.state.brief.length == 0){
    //   Alert.alert('请输入简介')
    //   return;
    // }
    if(this.state.link.length == 0){
      Alert.alert('请输入外链')
      return;
    }
    if(globaldata.username == ""){
      Alert.alert(
            "账户未登录",
            "登录后才可以发布配方",
           [
             {text: '确定', onPress: () =>{}}
           ]
         )
         return;
    }
    var reg = this;
    let data={'token':globaldata.token,'kbname':this.state.kbname,'brief':this.state.brief,'link':this.state.link,'type':this.state.type};
    let url = "/app/addknowbrew"
    console.log(data)
    NetUitl.postJson(url,data,function (set){
        switch (set.errcode) {
          case 0:
            Alert.alert("提交资料成功等待审核");
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
    this.state = {
      kbname:'',
      brief:'',
      link:'',
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
    const rightButtonConfig = {
        title: '保存',
        tintColor:'#ffffff',
        handler: () => this._goSubmit(),
      };
    var titleConfig = {
      title: '提交资源',
      tintColor:'#ffffff'
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        rightButton={rightButtonConfig}
        tintColor={'#34495e'}
        title={titleConfig} />
        <View style={styles.bg}>
          <View style={styles.row}>
            <Image style={styles.thumb} source={kbname_img}/>
            <TextInput
               style={styles.ti}
               onChangeText={(text) => this.setState({kbname:text})}
               value={this.state.kbname}
               placeholder={'请输入标题'}
               underlineColorAndroid="transparent"
             />
          </View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={brief_img}/>
            <TextInput
               style={styles.ti1}
               onChangeText={(text) => this.setState({brief:text})}
               value={this.state.brief}
               placeholder={'请输入简介'}
               underlineColorAndroid="transparent"
             />
          </View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={link_img}/>
            <TextInput
               style={styles.ti}
               onChangeText={(text) => this.setState({link:text})}
               value={this.state.link}
               placeholder={'请输入外链'}
               underlineColorAndroid="transparent"
             />
          </View>
          <Picker
            style={styles.pi}
            selectedValue={this.state.type}
            onValueChange={(type) => this.setState({type: type})}>
            <Picker.Item label="文章" value="article" />
            <Picker.Item label="视频" value="video" />
          </Picker>
          <View style={styles.row}>
            <Text>目前版本只支持提交外链的方式，提交后需经过审核才可以通过</Text>
          </View>
        </View>
      </View >
    );
  }
}

var styles = StyleSheet.create({
  bg:{
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
    padding:10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    // padding: 10,
    // backgroundColor: '#F6F6F6',
    paddingTop:1,
    paddingBottom:1,
  },
  thumb: {
    width: 32,
    height: 32,
  },
  ti:{
    // backgroundColor:'#7f8c8d',
    flex: 1,
    fontSize:10,
    height: 32,
    textAlign:'left',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  ti1:{
    // backgroundColor:'#7f8c8d',
    flex: 1,
    fontSize:10,
    height: 64,
    textAlign:'left',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  pi:{

  }
});
