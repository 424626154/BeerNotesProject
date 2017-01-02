'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  DeviceEventEmitter,
  TouchableOpacity,
  ListView,
  ScrollView,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Spinner from 'react-native-loading-spinner-overlay';
import SqlHelper from '../db/sqlhelper';

var maltsds;
var hopssds;
var yeastsds;
var accessoriessds;

var fname_img = require('../../resource/fname_normal.png');
var malt_img = require('../../resource/malt_normal.png');
var add_img = require('../../resource/add_normal.png');
var subtract_img = require('../../resource/subtract_normal.png');
var hops_img = require('../../resource/hops_normal.png');
var yeast_img = require('../../resource/yeast_normal.png');
var liao_img = require('../../resource/liao_normal.png');
var water_img = require('../../resource/water_normal.png');

var sqlHelper;

export default class AddFormulaVC extends React.Component {
  _goBack(){
    DeviceEventEmitter.emit('refesh');
    this.props.nav.pop();
  }
  _saveCallback(errocode,fid){
    this.setState({
      visible: false
    })
    if(errocode == 0){
      this.timer = setTimeout(
      () => {
        this._goBack();
      },
      100
      );
    }else{
      alert('添加配方失败')
    }
  }
  _save(){
    this.setState({
      visible: true
    })
    if (this.state.fname == 0) {
      alert('请输入配方名称')
      return;
    }
    if (this.state.malts.length > 0 ){
      for(var i = 0 ; i < this.state.malts.length ; i ++){
        var malt = this.state.malts[i];
        if(malt.name == ''){
          alert('请输入麦芽信息')
          return;
        }
        malt.weight = +malt.weight
        if(Number.isFinite(malt.weight) == false ){
          alert('请输入麦芽信息')
          return;
        }
        if(malt.weight == 0){
          alert('请输入麦芽信息')
          return;
        }
      }
    }else{
        alert('请输入麦芽信息')
        return;
    }
    var malts_str = JSON.stringify(this.state.malts);
    console.log(malts_str);
    if (this.state.hopss.length > 0 ){
      for(var i = 0 ; i < this.state.hopss.length ; i ++){
        var hops = this.state.hopss[i];
        if(hops.name == ''){
          alert('请输入啤酒花信息')
          return;
        }
        hops.weight = +hops.weight
        if(Number.isFinite(hops.weight) == false ){
          alert('请输入啤酒花信息')
          return;
        }
        if(hops.weight == 0){
          alert('请输入啤酒花信息')
          return;
        }
      }
    }else{
        alert('请输入啤酒花信息')
        return;
    }
    var hops_str = JSON.stringify(this.state.hopss);
    console.log(hops_str);
    if (this.state.yeasts.length > 0 ){
      for(var i = 0 ; i < this.state.yeasts.length ; i ++){
        var yeast = this.state.yeasts[i];
        if(yeast.name == ''){
          alert('请输入酵母信息')
          return;
        }
        yeast.weight = +yeast.weight
        if(Number.isFinite(yeast.weight) == false ){
          alert('请输入酵母信息')
          return;
        }
        if(yeast.weight == 0){
          alert('请输入酵母信息')
          return;
        }
      }
    }else{
        alert('请输入酵母信息')
        return;
    }
    var yeast_str = JSON.stringify(this.state.yeasts);
    console.log(yeast_str);
    if (this.state.accessoriess.length > 0 ){
      for(var i = 0 ; i < this.state.accessoriess.length ; i ++){
        var accessories = this.state.accessoriess[i];
        if(accessories.name == ''){
          alert('请输入辅料信息')
          return;
        }
        accessories.weight = +accessories.weight
        if(Number.isFinite(accessories.weight) == false ){
          alert('请输入辅料信息')
          return;
        }
        if(accessories.weight == 0){
          alert('请输入辅料信息')
          return;
        }
      }
    }else{

    }
    var accessories_str = JSON.stringify(this.state.accessoriess);
    console.log(accessories_str);
    this.state.water = +this.state.water;
    console.log(Number.isFinite(this.state.water),this.state.water);
    if(Number.isFinite(this.state.water) == false){
      alert('请输入正确的水重量格式')
      return;
    }
    if (this.state.water == 0) {
      alert('请输入水重量')
      return;
    }
    sqlHelper.insertFormulaDB(this.state.fname,malts_str,hops_str,yeast_str,this.state.water,accessories_str,this._saveCallback);
  }
  _addMalt(){
    console.log('_addMalt')
    var malts = this.state.malts;
    malts.push({name:'',weight:0});
    console.log(malts.length);
    this.setState({
      maltsData: maltsds.cloneWithRows(malts)
    })
  }
  _delMalt(){
    var malts = this.state.malts;
    malts.pop();
    this.setState({
      maltsData: maltsds.cloneWithRows(malts)
    })
  }
  _chengMaltName(rowID,text){
    var malts = this.state.malts;
    malts[rowID].name = text;
    this.setState({
      malts:malts,
      maltsData: maltsds.cloneWithRows(malts)
    })
  }
  _chengMaltWeight(rowID,text){
    text = +text;
    if(Number.isFinite(text) == false){
      console.log('请输入正确的啤酒花重量格式')
      return;
    }
    var malts = this.state.malts;
    malts[rowID].weight = text;
    this.setState({
      malts:malts,
      maltsData: maltsds.cloneWithRows(malts)
    })
  }
  _addHops(){
    console.log('_addHops')
    var hopss = this.state.hopss;
    hopss.push({name:'',weight:0});
    console.log(hopss.length);
    this.setState({
      hopssData: hopssds.cloneWithRows(hopss)
    })
  }
  _delHops(){
    var hopss = this.state.hopss;
    hopss.pop();
    this.setState({
      hopssData: hopssds.cloneWithRows(hopss)
    })
  }
  _chengHopsName(rowID,text){
    console.log('_chengHopsName',rowID,text);
    var hopss = this.state.hopss;
    hopss[rowID].name = text;
    this.setState({
      hopss:hopss,
      hopssData: hopssds.cloneWithRows(hopss)
    })
  }
  _chengHopsWeight(rowID,text){
    console.log('_chengHopsWeight',rowID,text);
    text = +text;
    if(Number.isFinite(text) == false){
      console.log('请输入正确的啤酒花重量格式')
      return;
    }
    var hopss = this.state.hopss;
    hopss[rowID].weight = text;
    this.setState({
      hopss:hopss,
      hopssData: hopssds.cloneWithRows(hopss)
    })
  }

  _addYeast(){
    console.log('_addYeast')
    var yeasts = this.state.yeasts;
    yeasts.push({name:'',weight:0});
    console.log(yeasts.length);
    this.setState({
      yeastsData: yeastsds.cloneWithRows(yeasts)
    })
  }
  _delYeast(){
    var yeasts = this.state.yeasts;
    yeasts.pop();
    this.setState({
      yeastsData: yeastsds.cloneWithRows(yeasts)
    })
  }
  _chengYeastName(rowID,text){
    console.log('_chengYeastName',rowID,text);
    var yeasts = this.state.yeasts;
    yeasts[rowID].name = text;
    this.setState({
      yeasts:yeasts,
      yeastsData: yeastsds.cloneWithRows(yeasts)
    })
  }
  _chengYeastWeight(rowID,text){
    console.log('_chengYeastWeight',rowID,text);
    text = +text;
    if(Number.isFinite(text) == false){
      console.log('请输入正确的酵母重量格式')
      return;
    }
    var yeasts = this.state.yeasts;
    yeasts[rowID].weight = text;
    this.setState({
      yeasts:yeasts,
      yeastsData: yeastsds.cloneWithRows(yeasts)
    })
  }
  _addYeast(){
    console.log('_addYeast')
    var yeasts = this.state.yeasts;
    yeasts.push({name:'',weight:0});
    console.log(yeasts.length);
    this.setState({
      yeastsData: yeastsds.cloneWithRows(yeasts)
    })
  }
  _delYeast(){
    var yeasts = this.state.yeasts;
    yeasts.pop();
    this.setState({
      yeastsData: yeastsds.cloneWithRows(yeasts)
    })
  }
  _chengAccessoriesName(rowID,text){
    console.log('_chengAccessoriesName',rowID,text);
    var accessoriess = this.state.accessoriess;
    accessoriess[rowID].name = text;
    this.setState({
      accessoriess:accessoriess,
      accessoriessData: accessoriessds.cloneWithRows(accessoriess)
    })
  }
  _chengAccessoriesWeight(rowID,text){
    console.log('_chengAccessoriesWeight',rowID,text);
    text = +text;
    if(Number.isFinite(text) == false){
      console.log('请输入正确的辅料重量格式')
      return;
    }
    var accessoriess = this.state.accessoriess;
    accessoriess[rowID].weight = text;
    this.setState({
      accessoriess:accessoriess,
      accessoriessData: accessoriessds.cloneWithRows(accessoriess)
    })
  }
  //加载名称
  _renderName(){
    return(
      <View>
       <View style={styles.row}>
         <Image style={styles.thumb} source={fname_img}/>
         <TextInput
            style={styles.ti}
            onChangeText={(text) => this.setState({fname:text})}
            value={this.state.fname}
            placeholder={'请输入配方名称'}
            underlineColorAndroid="transparent"
          />
       </View>
     </View>
    )
  }
  //加载麦芽布局
  _renderMalt(){
    return(
       <View>
        <View style={styles.row}>
          <Image style={styles.thumb} source={malt_img}/>
        </View>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.maltsData}
          renderRow={this._renderMaltRow.bind(this)}
        />
        {/* 功能栏 */}
        <View style={styles.row}>
        {/* 添加 */}
        <TouchableOpacity onPress={()=>this._addMalt()}>
        <Image style={styles.thumb} source={add_img}/>
        </TouchableOpacity>
        <View style={styles.row_iv}></View>
        {/* 删除 */}
        <TouchableOpacity onPress={()=>this._delMalt()}>
        <Image style={styles.thumb} source={subtract_img}/>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
  //加载麦芽列表
  _renderMaltRow(rowData, sectionID, rowID){
    return(
        <View>
            <View style={styles.row}>
              <Text style={styles.text1}>{'名称'}</Text>
              <TextInput
                 style={styles.ti}
                 onChangeText={(text) =>{
                   this._chengMaltName(rowID,text);
                 }}
                 value={rowData.name}
                 placeholder={'请输入麦芽名称'}
                 underlineColorAndroid="transparent"
               />
            </View>
            <View style={styles.row}>
              <Text style={styles.text1}>{'重量'}</Text>
              <TextInput
                 style={styles.ti}
                 onChangeText={(text) => {
                   this._chengMaltWeight(rowID,text);
                 }}
                 value={rowData.weight+''}
                 placeholder={'请输入麦芽重量'}
                 underlineColorAndroid="transparent"
               />
               <Text style={styles.text2}>{'克'}</Text>
            </View>
          </View>
    )
  }
  //加载酒花
  _renderHops(){
    return(
       <View>
        <View style={styles.row}>
          <Image style={styles.thumb} source={hops_img}/>
        </View>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.hopssData}
          renderRow={this._renderHopsRow.bind(this)}
        />
        {/* 功能栏 */}
        <View style={styles.row}>
        {/* 添加 */}
        <TouchableOpacity onPress={()=>this._addHops()}>
        <Image style={styles.thumb} source={add_img}/>
        </TouchableOpacity>
        <View style={styles.row_iv}></View>
        {/* 删除 */}
        <TouchableOpacity onPress={()=>this._delHops()}>
        <Image style={styles.thumb} source={subtract_img}/>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
  //加载酒花列表
  _renderHopsRow(rowData, sectionID, rowID){
    return(
        <View>
            <View style={styles.row}>
              <Text style={styles.text1}>{'名称'}</Text>
              <TextInput
                 style={styles.ti}
                 onChangeText={(text) =>{
                   this._chengHopsName(rowID,text);
                 }}
                 value={rowData.name}
                 placeholder={'请输入酒花名称'}
                 underlineColorAndroid="transparent"
               />
            </View>
            <View style={styles.row}>
              <Text style={styles.text1}>{'重量'}</Text>
              <TextInput
                 style={styles.ti}
                 onChangeText={(text) => {
                   this._chengHopsWeight(rowID,text);
                 }}
                 value={rowData.weight+''}
                 placeholder={'请输入酒花重量'}
                 underlineColorAndroid="transparent"
               />
               <Text style={styles.text2}>{'克'}</Text>
            </View>
          </View>
    )
  }
  //加载酵母
  _renderYeast(){
    return(
       <View>
        <View style={styles.row}>
          <Image style={styles.thumb} source={yeast_img}/>
        </View>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.yeastsData}
          renderRow={this._renderYeastRow.bind(this)}
        />
        {/* 功能栏 */}
        <View style={styles.row}>
        {/* 添加 */}
        <TouchableOpacity onPress={()=>this._addYeast()}>
        <Image style={styles.thumb} source={add_img}/>
        </TouchableOpacity>
        <View style={styles.row_iv}></View>
        {/* 删除 */}
        <TouchableOpacity onPress={()=>this._delYeast()}>
        <Image style={styles.thumb} source={subtract_img}/>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
  //加载酵母列表
  _renderYeastRow(rowData, sectionID, rowID){
    return(
        <View>
            <View style={styles.row}>
              <Text style={styles.text1}>{'名称'}</Text>
              <TextInput
                 style={styles.ti}
                 onChangeText={(text) =>{
                   this._chengYeastName(rowID,text);
                 }}
                 value={rowData.name}
                 placeholder={'请输入酵母重量'}
                 underlineColorAndroid="transparent"
               />
            </View>
            <View style={styles.row}>
              <Text style={styles.text1}>{'重量'}</Text>
              <TextInput
                 style={styles.ti}
                 onChangeText={(text) => {
                   this._chengYeastWeight(rowID,text);
                 }}
                 value={rowData.weight+''}
                 placeholder={'请输入酵母名称'}
                 underlineColorAndroid="transparent"
               />
               <Text style={styles.text2}>{'克'}</Text>
            </View>
          </View>
    )
  }
  //加载辅料
  _renderAccessories(){
    return(
       <View>
        <View style={styles.row}>
          <Image style={styles.thumb} source={liao_img}/>
        </View>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.accessoriessData}
          renderRow={this._renderAccessoriesRow.bind(this)}
        />
        {/* 功能栏 */}
        <View style={styles.row}>
        {/* 添加 */}
        <TouchableOpacity onPress={()=>this._addAccessoriesRow()}>
        <Image style={styles.thumb} source={add_img}/>
        </TouchableOpacity>
        <View style={styles.row_iv}></View>
        {/* 删除 */}
        <TouchableOpacity onPress={()=>this._delAccessories()}>
        <Image style={styles.thumb} source={subtract_img}/>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
  //加载其他辅料列表
  _renderAccessoriesRow(rowData, sectionID, rowID){
    return(
        <View>
            <View style={styles.row}>
              <Text style={styles.text1}>{'名称'}</Text>
              <TextInput
                 style={styles.ti}
                 onChangeText={(text) =>{
                   this._chengAccessoriesName(rowID,text);
                 }}
                 value={rowData.name}
                 placeholder={'请输入辅料重量'}
                 underlineColorAndroid="transparent"
               />
            </View>
            <View style={styles.row}>
              <Text style={styles.text1}>{'重量'}</Text>
              <TextInput
                 style={styles.ti}
                 onChangeText={(text) => {
                   this._chengAccessoriesWeight(rowID,text);
                 }}
                 value={rowData.weight+''}
                 placeholder={'请输入辅料名称'}
                 underlineColorAndroid="transparent"
               />
               <Text style={styles.text2}>{'克'}</Text>
            </View>
          </View>
    )
  }
  //加载水
  _renderWater(){
    return(
      <View>
       <View style={styles.row}>
         <Image style={styles.thumb} source={water_img}/>
         <TextInput
            style={styles.ti}
            onChangeText={(text) => this.setState({water:text})}
            value={this.state.water+''}
            placeholder={'请输入水重量'}
            underlineColorAndroid="transparent"
          />
          <Text style={styles.text2}>{'升'}</Text>
       </View>
     </View>
    )
  }
  constructor(props){
    super(props);
    // vc = this;

    this._saveCallback = this._saveCallback.bind(this);
    this._goBack = this._goBack.bind(this);
    // this._chengMaltName = this._chengMaltName.bind(this);

    maltsds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    hopssds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    yeastsds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    accessoriessds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var malts = [{name:'',weight:''}];
    var hopss = [{name:'',weight:''}];
    var yeasts = [{name:'',weight:''}];
    var accessoriess = [];
    this.state = {
      fname:'',
      malts:malts,
      hopss:hopss,
      yeasts:yeasts,
      accessoriess:accessoriess,
      water:'',
      visible: false,
      maltsData:maltsds.cloneWithRows(malts),
      hopssData:hopssds.cloneWithRows(hopss),
      yeastsData:yeastsds.cloneWithRows(yeasts),
      accessoriessData:accessoriessds.cloneWithRows(accessoriess),
    }
  }
  componentDidMount() {
    sqlHelper = new SqlHelper();
  }
  componentWillUnmount(){

  }
  render(){
    const leftButtonConfig = {
       title: '返回',
       tintColor:'#ffffff',
       handler: () => this._goBack(),
     };
     const rightButtonConfig = {
      title: '保存',
      tintColor:'#ffffff',
      handler:() => this._save(),
    };
    const titleConfig = {
      title: '添加配方',
      tintColor:'#ffffff'
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        rightButton={rightButtonConfig}
        tintColor={'#34495e'}
        title={titleConfig} />
        <View style={styles.sbg}>
        <ScrollView showsVerticalScrollIndicator={true} style={styles.scrobg}>
           {this._renderName()}
           {this._renderMalt()}
           {this._renderHops()}
           {this._renderYeast()}
           {this._renderAccessories()}
           {this._renderWater()}
        </ScrollView>
        </View>
        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
      </View >
    );
  }
}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    // padding: 10,
    // backgroundColor: '#F6F6F6',
    paddingTop:1,
    paddingBottom:1,
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
  text1: {
    fontSize:15,
    height: 20,
    width:32,
    textAlign:'center',
  },
  ti:{
    // backgroundColor:'#7f8c8d',
    flex: 1,
    fontSize:10,
    height: 32,
    textAlign:'left',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  text2: {
    flex: 1,
    fontSize:15,
    height: 20,
    width:32,
    textAlign:'left',
  },
  scrobg:{
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
    padding:10,
  },
  sbg:{
    flex: 1,
    paddingTop:5,
    paddingLeft:5,
    paddingRight:5,
  }
});
