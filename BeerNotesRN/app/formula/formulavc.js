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
import SQLiteHelper from '../sqlitehelper';
import Spinner from 'react-native-loading-spinner-overlay';

var fData = [];
// var vc ;
var ds;
var maltsds;
var hopssds;
var yeastsds;
let sqlitehelper;
export default class FormulaVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _addFormula(){
    this.props.nav.push({
      id:'addformulavc',
      name:'addformulavc'
    })
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
    this._query();
  }
  _queryCllback(errocode,rows){
    this.setState({
      visible: false
    })
    console.log('_queryCllback',this.state.visible,errocode,rows);
    if(errocode == 0 ){
      fData = [];
      for(var i = 0 ; i < rows.length;i++){
        fData.push(rows.item(i));
      }
      console.log(fData);
      this.setState({
        dataSource: ds.cloneWithRows(fData)
      })
    }else{
      console.log('_queryCllback',errocode);
    }
  }
  _query(){
    this.setState({
      visible: true
    })
    console.log('_query',this.state.visible);
    sqlitehelper.queryAllFormulaDB(1,this._queryCllback);
  }
  _deleteCllback(errocode,rowid){
    this.setState({
      visible: false
    })
    if(errocode == 0){
      if(fData.length > 0){
        for(var i = fData.length-1 ; i >= 0 ;i--){
          if(fData[i].id == rowid){
            fData.splice(i,1);
          }
        }
        this.setState({
          dataSource: ds.cloneWithRows(fData)
        })
      }
    }else{
      alert(errocode);
    }
  }

   _delRow(rowID){
     this.setState({
       visible: true
     })
     var rowid = fData[rowID].id;//.rowid;
     sqlitehelper.deleteFormulaDB(rowid,this._deleteCllback);
   }
   _pressRow(rowID){
     console.log(rowID);
    }

  _upRow(rowID){
      var rowid = fData[rowID].id;
      this._goUpFormula(rowid);
    }
  _renderRow(rowData, sectionID, rowID){
      return (
          <TouchableOpacity onPress={()=>this._pressRow(rowID)}>
          <View style={styles.rowbg}>
              {/* 配方名称 */}
               <View style={styles.row}>
                 <Image style={styles.thumb} source={require('../../resource/fname_normal.png')}/>
                 <Text style={styles.text}>
                 {rowData.fname}
                 </Text>
               </View>
               {/* 麦芽 */}
                {this._renderMalt(rowData.malts)}
               {/* 酒花 */}
               {this._renderHops(rowData.hopss)}
              {/* 酵母 */}
              {this._renderYeast(rowData.yeasts)}
              {/* 水 */}
              <View style={styles.row}>
              <Image style={styles.thumb} source={require('../../resource/water_normal.png')}/>
              <Text style={styles.text}>
              {rowData.water}
              </Text>
              </View>
              {/* 功能栏 */}
              <View style={styles.row}>
              {/* 修改 */}
              <TouchableOpacity onPress={()=>this._upRow(rowID)}>
              <Image style={styles.thumb} source={require('../../resource/up_normal.png')}/>
              </TouchableOpacity>
              <View style={styles.row_iv}></View>
              {/* 删除 */}
              <TouchableOpacity onPress={()=>this._delRow(rowID)}>
              <Image style={styles.thumb} source={require('../../resource/delete_normal.png')}/>
              </TouchableOpacity>
              </View>

          </View>
          </TouchableOpacity>
          );
    }
    //加载麦芽布局
    _renderMalt(malts){
      var maltsData = maltsds.cloneWithRows(JSON.parse(malts))
      return(
         <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={require('../../resource/malt_normal.png')}/>
          </View>
          <ListView
            enableEmptySections={true}
            dataSource={maltsData}
            renderRow={this._renderMaltRow.bind(this)}
          />
        </View>
      )
    }
    _renderMaltRow(rowData, sectionID, rowID){
      return(
          <View>
              <View style={styles.row}>
                <Text style={styles.text1}>{'名称'}</Text>
                <Text
                   style={styles.text}
                 >
                 {rowData.name}
                 </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text1}>{'重量'}</Text>
                <Text
                   style={styles.text}>
                   {rowData.weight+''}
                   </Text>
                    <Text style={styles.text2}>{'克'}</Text>
              </View>
            </View>
      )
    }
    //加载酒花
    _renderHops(hopss){
      var hopssData = hopssds.cloneWithRows(JSON.parse(hopss))
      return(
         <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={require('../../resource/hops_normal.png')}/>
          </View>
          <ListView
            enableEmptySections={true}
            dataSource={hopssData}
            renderRow={this._renderHopsRow.bind(this)}
          />
        </View>
      )
    }
    _renderHopsRow(rowData, sectionID, rowID){
      return(
          <View>
              <View style={styles.row}>
                <Text style={styles.text1}>{'名称'}</Text>
                <Text
                   style={styles.text}
                 >
                 {rowData.name}
                 </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.text1}>{'重量'}</Text>
                <Text
                   style={styles.text}>
                   {rowData.weight+''}
                   </Text>
                    <Text style={styles.text2}>{'克'}</Text>
              </View>
            </View>
      )
    }
  //加载酵母
  _renderYeast(yeasts){
    var yeastsData = yeastsds.cloneWithRows(JSON.parse(yeasts))
    return(
       <View>
        <View style={styles.row}>
          <Image style={styles.thumb} source={require('../../resource/yeast_normal.png')}/>
        </View>
        <ListView
          enableEmptySections={true}
          dataSource={yeastsData}
          renderRow={this._renderYeastRow.bind(this)}
        />
      </View>
    )
  }
  _renderYeastRow(rowData, sectionID, rowID){
    return(
        <View>
            <View style={styles.row}>
              <Text style={styles.text1}>{'名称'}</Text>
              <Text
                 style={styles.text}
               >
               {rowData.name}
               </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text1}>{'重量'}</Text>
              <Text
                 style={styles.text}>
                 {rowData.weight+''}
                 </Text>
                  <Text style={styles.text2}>{'克'}</Text>
            </View>
          </View>
    )
  }
  constructor(props) {
    super(props);
    // vc = this;
    this._queryCllback = this._queryCllback.bind(this);
    this._refesh = this._refesh.bind(this);
    this._deleteCllback = this._deleteCllback.bind(this);

    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    maltsds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    hopssds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    yeastsds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(fData),
      visible: true
    };
  }
  componentDidMount() {
      sqlitehelper = new SQLiteHelper();
      // sqlitehelper.openDB();
      this.subscription = DeviceEventEmitter.addListener('refesh',this._refesh);
      this._query();
  }
  componentWillUnmount(){
      // sqlitehelper.closeDB();
      this.subscription.remove();
  }
  render(){
    const leftButtonConfig = {
       title: '返回',
       tintColor:'#ffffff',
       handler: () => this._goBack(),
     };
    var titleConfig = {
      title: '我的配方',
      tintColor:'#ffffff'
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        tintColor={'#34495e'}
        title={titleConfig} />
        <ListView
          style={styles.listbg}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
        />
        <View style={styles.add} >
        <TouchableOpacity onPress={()=>this._addFormula()}>
        <Image style={styles.addimg}source={require('../../resource/add_formula_normal.png')}></Image>
        </TouchableOpacity>
        </View>
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
    alignItems:'center',
    // padding: 10,
    paddingTop:1,
    paddingBottom:1,
  },
  thumb: {
    width: 32,
    height: 32,
  },
  text: {
    flex: 1,
    fontSize:10,
    height: 32,
    padding:10,
    textAlign:'left',
    // backgroundColor:'#7f8c8d',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  text1: {
    fontSize:15,
    height: 20,
    width:32,
    textAlign:'center',
  },
  text2: {
    flex: 1,
    fontSize:15,
    height: 20,
    width:32,
    textAlign:'left',
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
  row_iv:{
    width:10
  },
  listbg:{
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:5,
    paddingRight:5
  }
});
