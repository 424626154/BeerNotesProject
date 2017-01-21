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

var rowid = -1;

var user_img = require('../../resource/login_head_normal.png');
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
var comment_img = require('../../resource/comment_normal.png');
var love_img = require('../../resource/love_normal.png');
var nolove_img = require('../../resource/nolove_normal.png');
var dele_img = require('../../resource/delete_normal.png');

export default class CloudFormulaVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _refesh(){
    this._query();
  }
  _onDele(rowID){
    rowid = rowID;
    var reg = this;
    let data={'token':globaldata.token,'fid':fData[rowID].fid};
    let url = "/app/delformula"
    console.log(data)
    NetUitl.postJson(url,data,function (set){
        switch (set.errcode) {
          case 0:
            Alert.alert("删除配方成功");
            reg._onDelCallback(set.data)
            break;
          default:
            Alert.alert(set.errmsg);
            break;
        }
      });
  }
  _onDelCallback(data){
    if(rowid != -1){
      fData.splice(rowid,1)
      this.setState({
        dataSource: ds.cloneWithRows(fData)
      })
      rowid = -1;
    }
  }
  _onLove(islove,rowID){
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
    rowid = rowID;
    var reg = this;
    var fid = fData[rowID].fid;
    var love_str = "false";
    if(islove == false){
      love_str = "true";
    }
    let data={'token':globaldata.token,'fid':fid,'fcid':0,'islove':love_str};
    let url = "/app/loveformula"
    console.log(data)
    NetUitl.postJson(url,data,function (set){
        switch (set.errcode) {
          case 0:
            var obj = JSON.parse(set.data);
            if(obj.islove){
              Alert.alert("点赞成功")
            }else{
              Alert.alert("取消点赞成功")
            }
            reg._onLoveCallback(set.data);
            break;
          default:
            Alert.alert(set.errmsg);
            break;
        }
      });
  }
  _onLoveCallback(data){
    if(rowid != -1){
      console.log(data);
      var FormulaLove = JSON.parse(data);
      var obj = BNUtil.cloneFormulaLove(FormulaLove);
      fData[rowid].islove = obj.islove;
      if(obj.islove){
            fData[rowid].lovenum = fData[rowid].lovenum+1;
      }else{
        if(fData[rowid].lovenum >0){
          fData[rowid].lovenum = fData[rowid].lovenum-1;
        }
      }
      this.setState({
        dataSource: ds.cloneWithRows(fData)
      })
      rowid = -1;
    }
  }

  _onComment(rowID){
    var fid = fData[rowID].fid
    var fname = fData[rowID].fname
    this.props.nav.push({
      id:'cformulacontentvc',
      name:'cformulacontentvc',
      fname:fname,
      fid:fid,
    })
  }
  _getCloudFormula(){
    console.log("globaldata:",globaldata)
    var reg = this;
    let data={'token':globaldata.token};
    let url = "/app/getformula"
    console.log(data)
    NetUitl.postJson(url,data,function (set){
        switch (set.errcode) {
          case 0:
            reg._queryCloudFormula(set.data)
            break;
          default:
            Alert.alert(set.errmsg);
            break;
        }
      });
  }
  _queryCloudFormula(data){
    this.setState({
      visible: false
    })
    var formulas = JSON.parse(data)
    console.log(formulas);
    if(formulas != null){
      console.log(formulas.length);
        fData = [];
        for(var i = 0 ; i < formulas.length;i++){
          fData.push(BNUtil.cloneCloudFormula(formulas[i]));
        }
        console.log(fData);
        this.setState({
          dataSource: ds.cloneWithRows(fData)
        })
    }
  }
  _query(){
    this.setState({
      visible: false
    })
    sqlHelper.queryAllFormulaDB(this._queryCllback);
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

  _renderRow(rowData, sectionID, rowID){
      return (
          <TouchableOpacity onPress={()=>this._pressRow(rowID)}>
          <View style={styles.rowbg}>
              {/* 用户名称 */}
               <View style={styles.row}>
                 <Image style={styles.thumb} source={user_img}/>
                 <Text style={styles.text}>
                 {rowData.username}
                 </Text>
               </View>
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
              {/* 时间 */}
               <View style={styles.row1}>
                 <Text style={styles.time}>
                 {BNUtil.getDateDiff(rowData.time)}
                 </Text>
               </View>
              {/* 功能栏 */}
              <View style={styles.row1}>
              {/* 点赞 */}
              {this._renderLove(rowData,rowID)}
              <View style={styles.row_iv}></View>
              <Text>{rowData.lovenum}</Text>
              <View style={styles.row_iv}></View>
              {/* 详情 */}
              <TouchableOpacity onPress={()=>this._onComment(rowID)}>
              <Image style={styles.thumb} source={comment_img}/>
              </TouchableOpacity>
              <View style={styles.row_iv}></View>
              {/*删除*/}
              {this._renderDele(rowData,rowID)}
              </View>

          </View>
          </TouchableOpacity>
          );
    }
    _renderDele(rowData,rowID){
      if(rowData.isdele){
        return(
            <TouchableOpacity onPress={()=>this._onDele(rowID)}>
            <Image style={styles.thumb} source={dele_img}/>
            </TouchableOpacity>
        )
      }
    }
    _renderLove(rowData,rowID){
      console.log(rowData)
      if(rowData.islove){
        return(
            <TouchableOpacity onPress={()=>this._onLove(rowData.islove,rowID)}>
            <Image style={styles.thumb} source={love_img}/>
            </TouchableOpacity>
        )
      }else{
        return(
            <TouchableOpacity onPress={()=>this._onLove(rowData.islove,rowID)}>
            <Image style={styles.thumb} source={nolove_img}/>
            </TouchableOpacity>
        )
      }
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
    this._getCloudFormula = this._getCloudFormula.bind(this);
    this._queryCloudFormula = this._queryCloudFormula.bind(this);
    this._refesh = this._refesh.bind(this);
    this._getUser = this._getUser.bind(this);
    this._getUserCallback = this._getUserCallback.bind(this);
    this._renderLove = this._renderLove.bind(this);

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
      this._getCloudFormula();
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
    var titleConfig = {
      title: '云配方',
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
  row1: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  },
  time:{
    fontSize:10,
    height: 32,
    padding:10,
    textAlign:'right',
    // backgroundColor:'#7f8c8d',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  }
});
