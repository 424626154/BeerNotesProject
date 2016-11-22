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

var vc;
var sqlitehelper;
export default class UpFormulaVC extends React.Component {
  _goBack(){
    DeviceEventEmitter.emit('refesh');
    this.props.nav.pop();
  }
  _updateCallback(errocode){
    vc.setState({
      visible: false
    })
    if(errocode == 0){
      vc._goBack();
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
    if (this.state.malt == 0) {
      alert('请输入麦芽重量')
      return;
    }
    if (this.state.hops == 0) {
      alert('请输入啤酒花重量')
      return;
    }
    if (this.state.yeast == 0) {
      alert('请输入酵母重量')
      return;
    }
    if (this.state.water == 0) {
      alert('请输入水重量')
      return;
    }
    vc.setState({
      visible: true
    })
    sqlitehelper.updateFormulaDB(this.state.uprowid,this.state.fname,this.state.malt,this.state.hops,this.state.yeast,this.state.water,this._updateCallback);
  }
  _queryCallback(errocode,item){
    console.log(errocode,item.id)
    vc.setState({
      visible: false
    })
    if(errocode == 0){
      vc.setState({
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
    console.log(rowid)
    sqlitehelper.queryOneFormulaDB(rowid,this._queryCallback);
  }

  constructor(props){
    super(props);
    vc = this;
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
      sqlitehelper.openDB();
      this.setState({
           uprowid:this.props.rowid,
           visible: true
       });
       this._query(this.props.rowid);
  }
  componentWillUnmount(){
      sqlitehelper.closeDB();
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
                  value={this.state.malt}
                />
             </View>
           </View>
           <View>
            <View style={styles.row}>
              <Image style={styles.thumb}  source={require('../resource/hops_normal.png')}/>
              <TextInput
                 style={styles.text}
                 onChangeText={(text) => this.setState({hops:text})}
                 value={this.state.hops}
               />
            </View>
          </View>
          <View>
           <View style={styles.row}>
             <Image style={styles.thumb} source={require('../resource/yeast_normal.png')}/>
             <TextInput
                style={styles.text}
                onChangeText={(text) => this.setState({yeast:text})}
                value={this.state.yeast}
              />
           </View>
         </View>
         <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={require('../resource/water_normal.png')}/>
            <TextInput
               style={styles.text}
               onChangeText={(text) => this.setState({water:text})}
               value={this.state.water}
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
    height: 32,
    textAlign:'left',
  },
});
