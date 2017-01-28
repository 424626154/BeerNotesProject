'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Alert,
  ListView,
  TouchableOpacity,
  Image,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import BNUtil from '../bnutil';
import NetUitl from "../netutil";
let globaldata = require('../globaldata');
var listData = [];
var ds = null;

var article_img = require('../../resource/article_normal.png');
var video_img = require('../../resource/video_normal.png');

export default class KnowbrewVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _goSubmit(){
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
    this.props.nav.push({
      id:'addknowbrewvc',
      name:'addknowbrewvc',
    })
  }
  _getKnowbrew(){
    var reg = this;
    let data={'token':globaldata.token};
    let url = "/app/knowbrew"
    console.log(data)
    NetUitl.postJson(url,data,function (set){
        switch (set.errcode) {
          case 0:
            reg._getKnowbrewCallback(set.data);
            break;
          default:
            Alert.alert(set.errmsg);
            break;
        }
      });
  }
  _getKnowbrewCallback(data){
    var knowbrews = JSON.parse(data)
    console.log(knowbrews);
    if(knowbrews != null){
      console.log(knowbrews.length);
        listData = [];
        for(var i = 0 ; i < knowbrews.length;i++){
          listData.push(BNUtil.cloneKnowbrew(knowbrews[i]));
        }
        console.log(listData);
        this.setState({
          dataSource: ds.cloneWithRows(listData)
        })
    }
  }
  _pressRow(rowID){
    var title = listData[rowID].title;
    var link = listData[rowID].link;
    console.log("url:",link);
    console.log("item:",listData[rowID]);
    this.props.nav.push({
      id:'knowberwconvc',
      name:'knowberwconvc',
      kbname:title,
      url:link
    })
  }
  _renderRow(rowData, sectionID, rowID){
    return(
      <TouchableOpacity onPress={()=>this._pressRow(rowID)}>
      <View >
        <View style={styles.row}>
        {this._renderIcon(rowData)}
          <View style={styles.row1}>
              <Text style={styles.text}>
                {rowData.title}
              </Text>
              <Text style={styles.text}>
                {rowData.brief}
              </Text>
            </View>
        </View>
      </View>
    </TouchableOpacity>
    )
  }
  _renderIcon(rowData){
    if(rowData.type == 1){
      return(
        <Image style={styles.thumb} source={article_img} />
      )
    }else if(rowData.type == 2){
      return(
        <Image style={styles.thumb} source={video_img} />
      )
    }
  }
  constructor(props){
    super(props);
    this._getKnowbrew = this._getKnowbrew.bind(this);
    this._renderIcon = this._renderIcon.bind(this);
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(listData),
    };
  }
  componentDidMount() {
    this._getKnowbrew()
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
        title: '提交',
        tintColor:'#ffffff',
        handler: () => this._goSubmit(),
      };
    var titleConfig = {
      title: '初识精酿',
      tintColor:'#ffffff'
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        rightButton={rightButtonConfig}
        tintColor={'#34495e'}
        title={titleConfig} />
        <ListView
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}/>
      </View >
    );
  }
}

var styles = StyleSheet.create({
  row: {
     flexDirection: 'row',
     justifyContent: 'center',
     padding: 10,
     borderWidth: 1,
     borderRadius: 5,
     borderColor: '#CCC',
     backgroundColor: '#F6F6F6',
     margin:5,
     alignItems:'center',
  },
  row1: {
     flex: 1,
     flexDirection: 'column',
     justifyContent: 'center',
     padding: 10,
     borderWidth: 1,
     borderRadius: 5,
     borderColor: '#CCC',
     backgroundColor: '#F6F6F6',
     margin:5,
     alignItems:'flex-start',
  },
  thumb: {
    width: 32,
    height: 32,
  },
  text: {
    marginTop: 5,
    textAlign:'left',
    fontWeight: 'bold'
  },
});
