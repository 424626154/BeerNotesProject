'use strict';
import React, { Component } from 'react';
import NetUitl from "../netutil";
import BNUtil from '../bnutil';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  ListView,
  TouchableOpacity,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
let globaldata = require('../globaldata');
var fData = [];
var ds;
var rowid = -1;
var comment_img = require('../../resource/comment_normal.png');
var love_img = require('../../resource/love_normal.png');
var nolove_img = require('../../resource/nolove_normal.png');
var dele_img = require('../../resource/delete_normal.png');

//配方评论详情
export default class CloudFormulaContentVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _goComment(){
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
      id:'formulacommentvc',
      name:'formulacommentvc',
      fid:this.state.fid,
      fcid:0,
    })
  }
  _getFormulaComment(fid){
    var reg = this;
    let data={'token':globaldata.token,'fid':fid};
    let url = "/app/getformulacomment";
    console.log(data)
    NetUitl.postJson(url,data,function (set){
        switch (set.errcode) {
          case 0:
            reg._queryFormulaComment(set.data)
            break;
          default:
            Alert.alert(set.errmsg);
            break;
        }
      });
  }
  _queryFormulaComment(data){
    this.setState({
      visible: false
    })
    var objs = JSON.parse(data)
    console.log(objs);
    if(objs != null){
      console.log(objs.length);
        fData = [];
        for(var i = 0 ; i < objs.length;i++){
          fData.push(BNUtil.cloneFormulaComment(objs[i]));
        }
        console.log(fData);
        this.setState({
          dataSource: ds.cloneWithRows(fData)
        })
    }
  }
  _onDele(rowID){
    rowid = rowID;
    var reg = this;
    let data={'token':globaldata.token,'id':fData[rowID].id};
    let url = "/app/delfcomment"
    console.log(data)
    NetUitl.postJson(url,data,function (set){
        switch (set.errcode) {
          case 0:
            Alert.alert("删除评论成功");
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
    var fid = fData[rowID].fid;
    var fcid = fData[rowID].id;
    var reg = this;
    var love_str = "false";
    if(islove == false){
      love_str = "true";
    }
    let data={'token':globaldata.token,'fid':fid,'fcid':fcid,'islove':love_str};
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
  _pressReply(rowID){
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
    console.log(rowID);
    var fcid = fData[rowID].id
    this.props.nav.push({
      id:'formulacommentvc',
      name:'formulacommentvc',
      fid:this.state.fid,
      fcid:fcid,
    })
  }
  _refreshFormulaCommont(){
    this._getFormulaComment(this.props.fid);
  }
  _pressRow(rowID){
    console.log(rowID);
   }
  _renderRow(rowData, sectionID, rowID){
      return (
          <TouchableOpacity onPress={()=>this._pressRow(rowID)}>
          <View style={styles.rowbg}>
          {this._renderReply(rowData)}
          <View style={styles.row}>
          <Text style={styles.text}> {rowData.comment}</Text>
          </View>
          <View style={styles.row1}>
            <Text style={styles.text1}>
            {rowData.username}
            </Text>
            <Text style={styles.text1}>
            {BNUtil.getDateDiff(rowData.time)}
            </Text>
          </View>
          <View style={styles.row1}>
          {/* 删除 */}
          {this._renderDele(rowData,rowID)}
          {/* 点赞 */}
          {this._renderLove(rowData,rowID)}
          <View style={styles.row_iv}></View>
          <Text>{rowData.lovenum}</Text>
          <View style={styles.row_iv}></View>
          {/* 回复 */}
          <TouchableOpacity onPress={()=>this._pressReply(rowID)}>
          <Image style={styles.thumb} source={comment_img}/>
          </TouchableOpacity>
          </View>
          </View>
          </TouchableOpacity>
          );
    }
    _renderDele(rowData,rowID){
      if(rowData.isdele){
        return(
          <View>
            <TouchableOpacity onPress={()=>this._onDele(rowID)}>
            <Image style={styles.thumb} source={dele_img}/>
            </TouchableOpacity>
            <View style={styles.row_iv}></View>
          </View>
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
    _renderReply(rowData){
      if(rowData.fcid > 0){
        return(
          <View style={styles.row2}>
          <Text style={styles.text2}> 回复:{rowData.username}</Text>
          </View>
        )
      }
    }
  constructor(props){
    super(props);
    this._getFormulaComment = this._getFormulaComment.bind(this);
    this._renderLove = this._renderLove.bind(this);
    this._refreshFormulaCommont = this._refreshFormulaCommont.bind(this);
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      fname:'',
      fid:'',
      dataSource: ds.cloneWithRows(fData),
    }
  }
  componentDidMount() {
    this.setState({
         fname:this.props.fname,
         fid:this.props.fid,
     });
     console.log("fid",this.props.fid);
     this._getFormulaComment(this.props.fid);
     this.subscription = DeviceEventEmitter.addListener('refreshfcommont',this._refreshFormulaCommont);
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
      title: '我要评论',
      tintColor:'#ffffff',
      handler:() => this._goComment(),
    };
    var titleConfig = {
      title: this.state.fname,
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
      </View >
    );
  }
}

var styles = StyleSheet.create({
  rowbg:{
    paddingTop:5,
    paddingBottom:5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
    padding:10,
    // backgroundColor: '#F6F6F6',
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
  row2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
  text1:{
    fontSize:10,
    height: 32,
    padding:10,
    textAlign:'right',
    // backgroundColor:'#7f8c8d',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  text2:{
    fontSize:10,
    height: 32,
    padding:10,
    textAlign:'left',
    // backgroundColor:'#7f8c8d',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  }
});
