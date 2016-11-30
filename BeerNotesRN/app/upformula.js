'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  DeviceEventEmitter
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import SQLiteHelper from './sqlitehelper';
import Spinner from 'react-native-loading-spinner-overlay';
import TimerMixin from 'react-timer-mixin';
// var vc;
var sqlitehelper;
export default class UpFormulaVC extends React.Component {
  _goBack(){
    DeviceEventEmitter.emit('refesh');
    this.props.nav.pop();
  }
  _updateCallback(errocode){
    this.setState({
      visible: false
    })
    if(errocode == 0){
      this.timer = setTimeout(
      () => { this._goBack(); },
      100
      );
    }else{
      alert('修改配方失败')
    }
  }
  _save(){
    // alert(this.state.malt+this.state.hops+this.state.yeast+this.state.water);
    if (this.state.fname == 0) {
      alert('请输入配方名称')
      return;
    }
    this.state.malt = +this.state.malt;
    console.log(Number.isFinite(this.state.malt),this.state.malt);
    if(Number.isFinite(this.state.malt) == false){
      alert('请输入正确的麦芽重量格式')
      return;
    }
    if (this.state.malt == 0) {
      alert('请输入麦芽重量')
      return;
    }
    this.state.hops = +this.state.hops;
    console.log(Number.isFinite(this.state.hops),this.state.hops);
    if(Number.isFinite(this.state.hops) == false){
      alert('请输入正确的啤酒花重量格式')
      return;
    }
    if (this.state.hops == 0) {
      alert('请输入啤酒花重量')
      return;
    }
    this.state.yeast = +this.state.yeast;
    console.log(Number.isFinite(this.state.yeast),this.state.yeast);
    if(Number.isFinite(this.state.yeast) == false){
      alert('请输入正确的啤酒花重量格式')
      return;
    }
    if (this.state.yeast == 0) {
      alert('请输入酵母重量')
      return;
    }
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
    this.setState({
      visible: true
    })
    sqlitehelper.updateFormulaDB(this.state.uprowid,this.state.fname,this.state.malt,this.state.hops,this.state.yeast,this.state.water,this._updateCallback);
  }
  _queryCallback(errocode,item){
    console.log(errocode,item.id)
    this.setState({
      visible: false
    })
    if(errocode == 0){
      this.setState({
        fname:item.fname,
        malt:item.malt,
        hops:item.hops,
        yeast:item.yeast,
        water:item.water,
        uprowid:item.id,
      })
    }else{
      alert(errocode);
    }
  }
  _query(rowid){
    sqlitehelper.queryOneFormulaDB(rowid,this._queryCallback);
  }

  constructor(props){
    super(props);
    // vc = this;
    this._goBack = this._goBack.bind(this);
    this._updateCallback = this._updateCallback.bind(this);
    this._queryCallback = this._queryCallback.bind(this);

    this.state = {
      fname:'',
      malt:'',
      hops:'',
      yeast:'',
      water:'',
      uprowid:'',
      visible: false,
    }
  }
  componentDidMount() {
      sqlitehelper = new SQLiteHelper();
      // sqlitehelper.openDB();
      this.setState({
           uprowid:this.props.rowid,
           visible: true
       });
       this._query(this.props.rowid);
  }
  componentWillUnmount(){
      // sqlitehelper.closeDB();
      this.timer && clearTimeout(this.timer);
  }
  render(){
    const leftButtonConfig = {
       title: '返回',
       handler: () => this._goBack(),
     };
     var rightButtonConfig = {
      title: '修改',
      handler:() => this._save(),
    };
    var titleConfig = {
      title: '修改配方',
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        rightButton={rightButtonConfig}
        title={titleConfig} />
            <View>
             <View style={styles.row}>
               <Image style={styles.thumb} source={require('../resource/fname_normal.png')}/>
               <TextInput
                  style={styles.text}
                  onChangeText={(text) => this.setState({fname:text})}
                  value={this.state.fname}
                />
             </View>
           </View>
            <View>
             <View style={styles.row}>
               <Image style={styles.thumb} source={require('../resource/malt_normal.png')}/>
               <TextInput
                  style={styles.text}
                  onChangeText={(text) => this.setState({malt:text})}
                  value={this.state.malt+''}
                />
             </View>
           </View>
           <View>
            <View style={styles.row}>
              <Image style={styles.thumb}  source={require('../resource/hops_normal.png')}/>
              <TextInput
                 style={styles.text}
                 onChangeText={(text) => this.setState({hops:text})}
                 value={this.state.hops+''}
               />
            </View>
          </View>
          <View>
           <View style={styles.row}>
             <Image style={styles.thumb} source={require('../resource/yeast_normal.png')}/>
             <TextInput
                style={styles.text}
                onChangeText={(text) => this.setState({yeast:text})}
                value={this.state.yeast+''}
              />
           </View>
         </View>
         <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={require('../resource/water_normal.png')}/>
            <TextInput
               style={styles.text}
               onChangeText={(text) => this.setState({water:text})}
               value={this.state.water+''}
             />
          </View>
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
    height: 48,
    textAlign:'left',
  },
});
