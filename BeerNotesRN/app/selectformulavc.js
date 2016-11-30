'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  ListView,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import SQLiteHelper from './sqlitehelper';
import Spinner from 'react-native-loading-spinner-overlay';

var fData = [];
var vc ;
var ds;
let sqlitehelper;
export default class SelectFormulaVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _goUpFormula(rowid){
    this.props.nav.push({
      id:'upformula',
      name:'upformula',
      params:{
        rowid:rowid
      }
    })
  }
  _refesh(){
    vc._query();
  }
  _queryCllback(errocode,rows){
    vc.setState({
      visible: false
    })
    if(errocode == 0 ){
      fData = [];
      for(var i = 0 ; i < rows.length;i++){
        fData.push(rows.item(i));
      }
      vc.setState({
        dataSource: ds.cloneWithRows(fData)
      })
    }else{
      alert(errocode);
    }
  }
  _query(){
    sqlitehelper.queryAllFormulaDB(1,this._queryCllback);
  }
  _selectRow(rowID){
    var rowid = fData[rowID].id;
    DeviceEventEmitter.emit('select',rowid);
    this._goBack();
  }
   _pressRow(rowID){
     console.log(rowID);
    }

  _renderRow(rowData, sectionID, rowID){
      return (
          <TouchableOpacity onPress={()=>this._pressRow(rowID)}>
          <View style={styles.rowbg}>
              {/* 配方名称 */}
               <View style={styles.row}>
                 <Image style={styles.thumb} source={require('../resource/fname_normal.png')}/>
                 <Text style={styles.text}>
                 {rowData.fname}
                 </Text>
               </View>
               {/* 麦芽 */}
               <View style={styles.row}>
                 <Image style={styles.thumb} source={require('../resource/malt_normal.png')}/>
                 <Text style={styles.text}>
                 {rowData.malt}
                 </Text>
               </View>
               {/* 酒花 */}
              <View style={styles.row}>
                <Image style={styles.thumb}  source={require('../resource/hops_normal.png')}/>
                <Text style={styles.text}>
                {rowData.hops}
                </Text>
              </View>
              {/* 酵母 */}
              <View style={styles.row}>
               <Image style={styles.thumb} source={require('../resource/yeast_normal.png')}/>
               <Text style={styles.text}>
               {rowData.yeast}
               </Text>
              </View>
              {/* 水 */}
              <View style={styles.row}>
              <Image style={styles.thumb} source={require('../resource/water_normal.png')}/>
              <Text style={styles.text}>
              {rowData.water}
              </Text>
              </View>
              {/* 功能栏 */}
              <View style={styles.row}>
              {/* 修改 */}
              <TouchableOpacity onPress={()=>this._selectRow(rowID)}>
              <Image style={styles.thumb} source={require('../resource/select_normal.png')}/>
              </TouchableOpacity>
              </View>

          </View>
          </TouchableOpacity>
          );
    }

  constructor(props) {
    super(props);
    vc = this;
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(fData),
      visible: false
    };
  }
  componentDidMount() {
      sqlitehelper = new SQLiteHelper();
      // sqlitehelper.openDB();
      this._query();
      this.subscription = DeviceEventEmitter.addListener('refesh',this._refesh);
      vc.setState({
        visible: true
      })
  }
  componentWillUnmount(){
      // sqlitehelper.closeDB();
      this.subscription.remove();
  }
  render(){
    const leftButtonConfig = {
       title: '返回',
       handler: () => this._goBack(),
     };
    const titleConfig = {
      title: '选择配方',
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        title={titleConfig} />
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
        />
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
      </View >
    );
  }
}


var styles = StyleSheet.create({
  add: {
    width: 64,
    height: 64,
    bottom:10,
    right:10,
    position:'absolute',
    // left:50px,
    // top:50px,
    backgroundColor: '#F6F6F6'
  },
  addimg: {
    width: 64,
    height: 64
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 32,
    height: 32,
  },
  text: {
    flex: 1,
    fontSize:15,
    height: 32,
    textAlign:'left',
  },
  rowbg:{
    paddingTop:5,
    paddingBottom:5,
  },
  row_iv:{
    width:10
  }
});
