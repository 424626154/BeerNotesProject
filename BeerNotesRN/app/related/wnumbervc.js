'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ListView,
  Image,
  TouchableOpacity,
  Alert,
  Clipboard,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import NetUitl from "../netutil";
import BNUtil from "../bnutil";

var listData = [];
var ds = null;

var copy_img = require('../../resource/copy_normal.png');

export default class WNumberVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  async _pressCopy(rowID){
    Clipboard.setString(listData[rowID].Number);
    Alert.alert("复制成功");
  }
  _queryRelated(){
    var tag = this;
    let data={};
    let url = "/app/wnumber";
    NetUitl.postJson(url,data,function (set){
        switch (set.errcode) {
          case 0:
            console.log("data:",set.data);
            if(set.data != null){
                var data = JSON.parse(set.data);
                console.log("json data:",data);
                if(data != null){
                  listData = data
                  tag.setState({
                    dataSource: ds.cloneWithRows(listData)
                  })
                }
            }
            break;
          default:
            Alert.alert(set.errmsg);
            break;
        }
      });
  }
  _pressRow(rowID){

   }
  constructor(props){
    super(props);
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(listData),
    };
  }
  componentDidMount() {
    this._queryRelated();
  }
  componentWillUnmount(){

  }
  _renderRow(rowData, sectionID, rowID){
    return(
      <TouchableOpacity onPress={()=>this._pressRow(rowID)}>
      <View >
      <View style={styles.rowbg}>
          <View style={styles.row}>
          <Image style={styles.thumb} source={{uri:BNUtil.getImagePath(rowData.Image)}} />
            <View style={styles.row1}>
                <Text style={styles.text}>
                  {rowData.Title}
                </Text>
                <Text style={styles.text}>
                  {rowData.Info}
                </Text>
              </View>
          </View>
          <View style={styles.row2}>
          <TouchableOpacity onPress={()=>this._pressCopy(rowID)}>
            <Image style={styles.smallthumb} source={copy_img}></Image>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    )
  }

  render(){
    const leftButtonConfig = {
       title: '返回',
       tintColor:'#ffffff',
       handler: () => this._goBack(),
     };
    var titleConfig = {
      title: '优秀公众号',
      tintColor:'#ffffff'
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
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
  row2: {
     flexDirection: 'row',
     justifyContent: 'flex-end',
  },
  rowbg:{
    paddingTop:5,
    paddingBottom:5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
    padding:10,
    // backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  smallthumb: {
    width: 32,
    height: 32,
  },
  text: {
    flex: 1,
    marginTop: 5,
    textAlign:'left',
    fontWeight: 'bold'
  },
});
