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
  DeviceEventEmitter,
  Platform,
  Alert,
  AlertIOS
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Spinner from 'react-native-loading-spinner-overlay';
import SqlHelper from '../db/sqlhelper';
import BNUtil from '../bnutil';
import NetUitl from "../netutil";
import StorageUitl from '../storageutil';
let globaldata = require('../globaldata');

var fData = [];
// var vc ;
var ds;
var maltsds;
var hopssds;
var yeastsds;
var accessoriessds;

var sqlHelper;

var fname_img = require('../../resource/fname_normal.png');
var water_img = require('../../resource/water_normal.png');
var up_img = require('../../resource/up_normal.png');
var delete_img = require('../../resource/delete_normal.png');
var malt_img = require('../../resource/malt_normal.png');
var hops_img =  require('../../resource/hops_normal.png');
var yeast_img = require('../../resource/yeast_normal.png');
var liao_img = require('../../resource/liao_normal.png');
var add_img = require('../../resource/add_formula_normal.png');
var upcloud_img = require('../../resource/upcloud_normal.png');

export default class FormulaVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  //添加配方
  _goAddFormula(){
    this.props.nav.push({
      id:'addformulavc',
      name:'addformulavc'
    })
  }
  //修改配方
  _goUpFormula(rowid){
    this.props.nav.push({
      id:'upformula',
      name:'upformula',
      params:{
        rowid:rowid
      }
    })
  }
  //上传到云服务器
  _upCloud(rowID){
    var obj = fData[rowID];
    let data={'token':globaldata.token,'fid':obj.fid,'fname':obj.fname,'malts':obj.malts,'hopss':obj.hopss,'yeasts':obj.yeasts,'water':obj.water,'accessoriess':obj.accessoriess};
    let url = "/app/addformula"
    console.log(data)
    NetUitl.postJson(url,data,function (set){
        switch (set.errcode) {
          case 0:
            Alert.alert("发布配方成功");
            break;
          default:
            Alert.alert(set.errmsg);
            break;
        }
      });
  }

  _refesh(){
    this._query();
  }
  _queryCllback(errocode,formulas){
    this.setState({
      visible: false
    })
    console.log('_queryCllback',this.state.visible,errocode,formulas);
    if(errocode == 0 ){
      fData = [];
      for(var i = 0 ; i < formulas.length;i++){
        fData.push(BNUtil.cloneFormula(formulas[i]));
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
      visible: false
    })
    sqlHelper.queryAllFormulaDB(this._queryCllback);
  }
  _deleteCllback(errocode,rowid){
    this.setState({
      visible: false
    })
    if(errocode == 0){
      if(fData.length > 0){
        for(var i = fData.length-1 ; i >= 0 ;i--){
          if(fData[i].fid == rowid){
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
     var rowid = fData[rowID].fid;//.rowid;
     sqlHelper.deleteFormulaDB(rowid,this._deleteCllback);
   }
   //上传到云
   _upCloudRow(rowID){
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
     var alertTitle = "发布配方";
     var alertMessage = "是否发布配方到配方大厅";
     Alert.alert(
           alertTitle,
           alertMessage,
          [
            {text: '放弃', onPress: () =>{}},
            {text: '发布', onPress: () =>{
              this._upCloud(rowID);
            }},
          ]
        )
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

   _pressRow(rowID){
     console.log(rowID);
    }

  _upRow(rowID){
      var rowid = fData[rowID].fid;
      this._goUpFormula(rowid);
    }
  _renderRow(rowData, sectionID, rowID){
      return (
          <TouchableOpacity onPress={()=>this._pressRow(rowID)}>
          <View style={styles.rowbg}>
              {/* 配方名称 */}
               <View style={styles.row}>
                 <Image style={styles.thumb} source={fname_img}/>
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
              {/* 其他辅料 */}
              {this._renderAccessories(rowData.accessoriess)}
              {/* 水 */}
              <View style={styles.row}>
              <Image style={styles.thumb} source={water_img}/>
              <Text style={styles.text}>
              {rowData.water}
              </Text>
              <Text style={styles.text2}>{'升'}</Text>
              </View>
              {/* 功能栏 */}
              <View style={styles.row}>
              {/* 修改 */}
              <TouchableOpacity onPress={()=>this._upRow(rowID)}>
              <Image style={styles.thumb} source={up_img}/>
              </TouchableOpacity>
              <View style={styles.row_iv}></View>
              {/* 删除 */}
              <TouchableOpacity onPress={()=>this._delRow(rowID)}>
              <Image style={styles.thumb} source={delete_img}/>
              </TouchableOpacity>
              <View style={styles.row_iv}></View>
              {/* 上传到云 */}
              <TouchableOpacity onPress={()=>this._upCloudRow(rowID)}>
              <Image style={styles.thumb} source={upcloud_img}/>
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
            <Image style={styles.thumb} source={malt_img}/>
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
            <Image style={styles.thumb} source={hops_img}/>
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
          <Image style={styles.thumb} source={yeast_img}/>
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
  //加载其他辅料
  _renderAccessories(accessoriess){
    if(accessoriess.length > 0 ){
      var accessoriessData = accessoriessds.cloneWithRows(JSON.parse(accessoriess))
      return(
         <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={liao_img}/>
          </View>
          <ListView
            enableEmptySections={true}
            dataSource={accessoriessData}
            renderRow={this._renderAccessoriesRow.bind(this)}
          />
        </View>
      )
    }
  }
  _renderAccessoriesRow(rowData, sectionID, rowID){
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
    this._getUser = this._getUser.bind(this);
    this._getUserCallback = this._getUserCallback.bind(this);

    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    maltsds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    hopssds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    yeastsds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    accessoriessds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(fData),
      visible: true,
      username:"",
      token:"",
    };
  }
  componentDidMount() {
      sqlHelper = new SqlHelper();
      this.subscription = DeviceEventEmitter.addListener('refesh',this._refesh);
      this._query();
      this._getUser();
  }
  componentWillUnmount(){
      this.subscription.remove();
  }
  render(){
    const leftButtonConfig = {
       title: '返回',
       tintColor:'#ffffff',
       handler: () => this._goBack(),
     };
     const rightButtonConfig = {
         title: '添加',
         tintColor:'#ffffff',
         handler: () => this._goAddFormula(),
       };
    var titleConfig = {
      title: '我的配方',
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
          style={styles.listbg}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
        />
        {/* <View style={styles.add} >
        <TouchableOpacity onPress={()=>this._goAddFormula()}>
        <Image style={styles.addimg}
        source={add_img}></Image>
        </TouchableOpacity>
        </View> */}
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
