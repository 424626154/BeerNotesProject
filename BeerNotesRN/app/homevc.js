'use strict'
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  View,
  ListView,
  Image,
  Text
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import SQLiteHelper from './sqlitehelper';

var listData= [
  {
  text:'我的配方',
  img:require('../resource/fname_normal.png')
  },
  {
  text:'酒精度数',
  img:require('../resource/alcohol_degree_normal.png')
  }
];
var ds = null;
let sqlitehelper;
export default class HomeVC extends React.Component {
    _goBack(){
      this.props.nav.pop();
    }
    _goFormula(){
      this.props.nav.push({
        id:'formulavc',
        name:'formulavc'
      })
    }
    _goAlcoholDegreeVC(){
      this.props.nav.push({
        id:'alcoholdegreevc',
        name:'alcoholdegreevc'
      })
    }
    _pressRow(rowID){
      if(rowID == 0 ){
        this._goFormula();
      }else if(rowID == 1){
        this._goAlcoholDegreeVC();
      }
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
      console.log('HomeVC');
      this._renderRow = this._renderRow.bind(this)
      ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows(listData),
      };
    }
    componentDidMount() {
      sqlitehelper = new SQLiteHelper();
      sqlitehelper.openDB();
    }
    componentWillUnmount(){
      sqlitehelper.closeDB();
    }
    render(){
      var titleConfig = {
        title: '家酿笔记',
        tintColor:'#ffffff'
      };
      return(
        <View style={{flex: 1}}>
          <NavigationBar
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
      flexWrap: 'wrap'
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
