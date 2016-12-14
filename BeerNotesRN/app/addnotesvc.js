'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  DeviceEventEmitter,
  TextInput
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import SQLiteHelper from './sqlitehelper';

const formula_source = require('../resource/formula_normal.png');
const fname_source = require('../resource/fname_normal.png');
const malt_source = require('../resource/malt_normal.png');
const hops_source = require('../resource/hops_normal.png');
const yeast_source = require('../resource/yeast_normal.png');
const water_source =  require('../resource/water_normal.png');

var vc;
var subscription;
let sqlitehelper;
export default class AddNotesVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _save(){
    // this.props.nav.pop();
    if(this.state.nfid == ''){//添加
      this._addFormuls();
    }else{//更新
      this._upFormuls();
    }
  }
  _selectFormula(){
    this.props.nav.push({
      id:'selectformulavc',
      name:'selectformulavc'
    })
  }
  _select(rowid){
    var fid = rowid;
    vc.setState({
      fid: fid
    });
    vc._queryFormula(fid)
  }

  _addFrormulaCallback(errocode,fid){
    vc.setState({
      visible: false
    })
    if(errocode == 0){
      vc.setState({
        nfid:fid
      })
      vc._addNotes()
    }else{
      alert('添加配方失败')
    }
  }

  _addFormuls(){
    if (this.state.infname == 0) {
      alert('请输入配方名称')
      return;
    }
    if (this.state.inmalt == 0) {
      alert('请输入麦芽重量')
      return;
    }
    if (this.state.inhops == 0) {
      alert('请输入啤酒花重量')
      return;
    }
    if (this.state.inyeast == 0) {
      alert('请输入酵母重量')
      return;
    }
    if (this.state.inwater == 0) {
      alert('请输入水重量')
      return;
    }
    vc.setState({
      visible: true
    })
    sqlitehelper.insertFormulaDB(this.state.fname,this.state.inmalt,this.state.inhops,this.state.inyeast,this.state.inwater,2,this._addFrormulaCallback);
  }

  _upFrormulaCallback(errocode){
    vc.setState({
      visible: false
    })
    if(errocode == 0){
      vc._addNotes()
    }else{
      alert('更新配方失败')
    }
  }

  _upFormuls(){
    if (this.state.infname == 0) {
      alert('请输入配方名称')
      return;
    }
    if (this.state.inmalt == 0) {
      alert('请输入麦芽重量')
      return;
    }
    if (this.state.inhops == 0) {
      alert('请输入啤酒花重量')
      return;
    }
    if (this.state.inyeast == 0) {
      alert('请输入酵母重量')
      return;
    }
    if (this.state.inwater == 0) {
      alert('请输入水重量')
      return;
    }
    vc.setState({
      visible: true
    })
    sqlitehelper.updateFormulaDB(this.state.fname,this.state.inmalt,this.state.inhops,this.state.inyeast,this.state.inwater,this._upFrormulaCallback);
  }

  _addNotesCallback(errocode,noteid){
    if (errocode == 0) {
      vc._goBack();
    }else{
      alert(errocode);
    }
  }
  _addNotes(){
    console.log(this.state.fid )
    console.log(this.state.nfid )
    if (this.state.fid == '') {
      alert('请设置配方')
      return;
    }
    if (this.state.nfid == '') {
      alert('请设置修改的配方')
      return;
    }
    sqlitehelper.insertNotesDB(this.state.fid,this.state.nfid,this._addNotesCallback);
  }
  _queryFormulaCallback(errocode,formula){
    if(errocode == 0 ){
      vc.setState({
        fid: formula.id,
        fname:formula.fname,
        malt:formula.malt,
        hops:formula.hops,
        yeast:formula.yeast,
        water:formula.water
      });
    }else{
      alert(errocode)
    }
  }
  _queryFormula(rowid){
    sqlitehelper.queryOneFormulaDB(rowid,this._queryFormulaCallback);
  }
  _onChangeMalt(text){
    var hops =  text*vc.state.hops/vc.state.malt+'';
    var yeast =  text*vc.state.yeast/vc.state.malt+'';
    var water =  text*vc.state.water/vc.state.malt+'';
    vc.setState({
      inhops:hops,
      inyeast:yeast,
      inwater:water
    })
  }
  _onChangeHops(text){
    var malt =  text*vc.state.malt/vc.state.hops+'';
    var yeast =  text*vc.state.yeast/vc.state.hops+'';
    var water =  text*vc.state.water/vc.state.hops+'';
    vc.setState({
      inmalt:malt,
      inyeast:yeast,
      inwater:water
    })
  }
  _onChangeYeast(text){
    var malt =  text*vc.state.malt/vc.state.yeast+'';
    var hops =  text*vc.state.hops/vc.state.yeast+'';
    var water =  text*vc.state.water/vc.state.yeast+'';
    vc.setState({
      inmalt:malt,
      inhops:hops,
      inwater:water
    })
  }
  _onChangeWater(text){
    var malt =  text*vc.state.malt/vc.state.water+'';
    var yeast =  text*vc.state.yeast/vc.state.water+'';
    var hops =  text*vc.state.hops/vc.state.water+'';
    vc.setState({
      inmalt:malt,
      inyeast:yeast,
      inhops:hops
    })
  }
  _renderAdd(){
    if(vc.state.fid == ''){
      return(
        <View >
        <TouchableOpacity onPress={()=>this._selectFormula()}>
        <View style={styles.row}>
          <Image style={styles.thumb} source={formula_source}/>
          <Text style={styles.text}>{'选择配方'}</Text>
        </View>
        </TouchableOpacity>
        </View>
      )
    }else{
      return(
        <View >
              {this._renderRowItemFname(fname_source,vc.state.fname)}
              {this._renderRowItemMalt(malt_source,vc.state.malt)}
              {this._renderRowItemHops(hops_source,vc.state.hops)}
              {this._renderRowItemYeast(yeast_source,vc.state.yeast)}
              {this._renderRowItemWater(water_source,vc.state.water)}
        </View>
      )
    }
  }
  _renderRowItemFname(source,text){
    return(
      <View style={styles.row}>
        <Image style={styles.thumb} source={source}/>
        <Text style={styles.text}>
        {text}
        </Text>
      </View>
    )
  }
  _renderRowItemMalt(source,text){
    return(
      <View style={styles.row}>
        <Image style={styles.thumb} source={source}/>
        <Text style={styles.text}>
        {text}
        </Text>
        <TextInput
           style={styles.text1}
           onChangeText={(text) => {
            this.setState({inmalt:text});
            this._onChangeMalt(text);
            }}
           value={vc.state.inmalt}
           underlineColorAndroid="transparent"
         />
      </View>
    )
  }
  _renderRowItemHops(source,text){
    return(
      <View style={styles.row}>
        <Image style={styles.thumb} source={source}/>
        <Text style={styles.text}>
        {text}
        </Text>
        <TextInput
           style={styles.text1}
           onChangeText={(text) => {
            this.setState({inhops:text});
            this._onChangeHops(text);
            }}
           value={vc.state.inhops}
           underlineColorAndroid="transparent"
         />
      </View>
    )
  }
  _renderRowItemYeast(source,text){
    return(
      <View style={styles.row}>
        <Image style={styles.thumb} source={source}/>
        <Text style={styles.text}>
        {text}
        </Text>
        <TextInput
           style={styles.text1}
           onChangeText={(text) => {
            this.setState({inyeast:text});
            this._onChangeYeast(text);
            }}
           value={vc.state.inyeast}
           underlineColorAndroid="transparent"
         />
      </View>
    )
  }
  _renderRowItemWater(source,text){
    return(
      <View style={styles.row}>
        <Image style={styles.thumb} source={source}/>
        <Text style={styles.text}>
        {text}
        </Text>
        <TextInput
           style={styles.text1}
           onChangeText={(text) => {
            this.setState({inwater:text});
            this._onChangeWater(text);
            }}
           value={vc.state.inwater}
           underlineColorAndroid="transparent"
         />
      </View>
    )
  }
  constructor(props){
    super(props);
    this.state = {
      fid:'',
      nfid:'',
      fname:'',
      malt:'',
      hops:'',
      yeast:'',
      water:'',
      infmalt:'',
      infhops:'',
      infyeast:'',
      infwater:'',
    }

    this._addFormuls = this._addFormuls.bind(this);
    this._upFormuls = this._upFormuls.bind(this);
    this._save = this._save.bind(this);
    this._addNotes = this._addNotes.bind(this);
    vc = this;
    // this._renderRowItem = this._renderRowItem.bind(this);
    // this._queryFormula = this._queryFormula.bind(this);
  }
  componentDidMount() {
      sqlitehelper = new SQLiteHelper();
      // sqlitehelper.openDB();
      this.subscription = DeviceEventEmitter.addListener('select',this._select);
  }
  componentWillUnmount(){
      // sqlitehelper.closeDB();
  }
  render(){
    const leftButtonConfig = {
       title: '返回',
       handler: () => this._goBack(),
     };
    const rightButtonConfig = {
      title: '保存',
      handler:() => this._save(),
    };
    const titleConfig = {
      title: '新建笔记',
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        rightButton={rightButtonConfig}
        title={titleConfig} />
        <ScrollView showsVerticalScrollIndicator={true}>
        {/* 添加配方 */}
        {this._renderAdd()}
        {/* 添加配方 end*/}
      </ScrollView>
      </View >
    );
  }
}

var styles = StyleSheet.create({
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
    width:60,
    textAlign:'center',
  },
  text1: {
    flex: 1,
    fontSize:15,
    height: 32,
    textAlign:'center',
  },
});
