'use strict'
import React, { Component } from 'react';
let globaldata = require('../globaldata');

import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  View,
  ListView,
  Image,
  Text,
  Platform,
  Alert,
  Linking,
  NativeAppEventEmitter,
  DeviceEventEmitter
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import SqlHelper from '../db/sqlhelper';
import StorageUitl from '../storageutil';
import NetUitl from "../netutil";

var listData= [
  {
  text:'优秀网站',
  img:require('../../resource/website_normal.png')
  },
  {
  text:'优秀公众号',
  img:require('../../resource/wnumber_normal.png')
  }
];
var ds = null;
var sqlHelper;
var subscription;
export default class RelatedTableVC extends React.Component {
    _goBack(){
      this.props.nav.pop();
    }
    _goWebsite(){
      this.props.nav.push({
        id:'websitevc',
        name:'websitevc'
      })
    }
    _goWNumber(){
      this.props.nav.push({
        id:'wnumbervc',
        name:'wnumbervc'
      })
    }

    _pressRow(rowID){
      if(rowID == 0){
        this._goWebsite();
      }else if(rowID == 1){
        this._goWNumber();
      }
    }
    _queryMessage(){
      console.log("queryMessage:",globaldata.token)
      if(globaldata.token == ''){
        return;
      }
      var reg = this;
      let data={'token':globaldata.token};
      let url = "/app/getmessage"
      console.log(data)
      NetUitl.postJson(url,data,function (set){
          switch (set.errcode) {
            case 0:
              reg._queryMessageCallback(set.data);
              break;
            default:
              Alert.alert(set.errmsg);
              break;
          }
        });
    }
    _renderRow(rowData, sectionID, rowID){
      return(
        <TouchableOpacity onPress={()=>this._pressRow(rowID)}>
        <View >
          <View style={styles.row}>
            <Image style={styles.thumb} source={rowData.img} />
            <Text style={styles.text}>
              {rowData.text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      )
    }


    constructor(props){
      super(props);
      this._renderRow = this._renderRow.bind(this);
      ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows(listData),
      };
      sqlHelper = new SqlHelper();
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
        title: '相关资料',
        tintColor:'#ffffff'
      };
      return(
        <View style={{flex: 1}}>
          <NavigationBar
            leftButton={leftButtonConfig}
            tintColor={'#34495e'}
            title={titleConfig} />
          <ListView
          contentContainerStyle={styles.list}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}/>
        </View >
      );
    }
  }

  var styles = StyleSheet.create({
    list: {
      marginTop:5,
      justifyContent: 'space-around',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
    },
    row: {
      justifyContent: 'center',
      padding: 5,
      margin: 3,
      width: 85,
      height: 85,
      backgroundColor: '#F6F6F6',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#CCC'
    },
    thumb: {
      width: 45,
      height: 45
    },
    text: {
      flex: 1,
      marginTop: 5,
      fontWeight: 'bold'
    },
  });
