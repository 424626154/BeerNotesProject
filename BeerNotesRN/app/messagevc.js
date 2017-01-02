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
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import SqlHelper from './db/sqlhelper';
var ds;
var listData= [];
var sqlHelper;
export default class MessageVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _queryCllback(errocode,messages){
    console.log('_queryCllback',errocode,messages);
    if(errocode == 0){
          listData = messages;
    }
  }
  _query(){
    sqlHelper.queryAllMessageDB(this._queryCllback);
  }
  _pressRow(rowID){
    console.log(rowID);
   }
  _renderRow(rowData, sectionID, rowID){
      return (
          <TouchableOpacity onPress={()=>this._pressRow(rowID)}>
          <View >
            <View style={styles.row}>
            <Text style={styles.text}>
              {rowData.title}
            </Text>
              <Text style={styles.text}>
                {rowData.content}
              </Text>
            </View>
          </View>
          </TouchableOpacity>
          );
    }
    constructor(props){
      super(props);
      ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows(listData),
      };
    }
    componentDidMount() {
      sqlHelper = new SqlHelper();
      this._query();
    }
    componentWillUnmount(){

    }
  render(){
    const leftButtonConfig = {
       title: '返回',
       handler: () => this._goBack(),
     };
    var titleConfig = {
      title: '消息',
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
          renderRow={this._renderRow.bind(this)}
        />
      </View >
    );
  }
}

var styles = StyleSheet.create({
  list: {
    marginTop:5,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
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
    width: 45,
    height: 45
  },
  text: {
    flex: 1,
    marginTop: 5,
    textAlign:'left',
    fontWeight: 'bold'
  },
});
