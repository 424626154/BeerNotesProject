'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ListView,
  ScrollView,
  Picker,Alert
} from 'react-native';
import NavigationBar from 'react-native-navbar';
var beer_img = require('../../resource/beer_normal.png');
var p_img = require('../../resource/proportion_normal.png');
var result_img = require('../../resource/result_normal.png');
var bv_img = require('../../resource/bittervalue_normal.png');
var add_img = require('../../resource/add_normal.png');
var subtract_img = require('../../resource/subtract_normal.png');
var hops_img = require('../../resource/hops_normal.png');

var hopssds;

export default class BittervalueVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _renderBV(){
    return(
      <View style={styles.bg}>
      <View style={styles.row}>
        <Text style={styles.text1}>
          {'啤酒体积(L)'}
        </Text>
        <Image style={styles.thumb} source={beer_img}/>
        <TextInput
           style={styles.ti1}
           onChangeText={(text) => this.setState({beerv:text})}
           value={this.state.beerv+''}
           placeholder={'输入啤酒体积'}
           underlineColorAndroid="transparent"
         />
      </View>
      <View style={styles.row}>
        <Text style={styles.text1}>
          {'初始密度'}
        </Text>
        <Image style={styles.thumb} source={p_img}/>
        <TextInput
           style={styles.ti1}
           onChangeText={(text) => this.setState({beerp:text})}
           value={this.state.beerp+''}
           placeholder={'输入密度'}
           underlineColorAndroid="transparent"
         />
      </View>
      {this._renderHops()}
      <View style={styles.row}>
      <View style={styles.row_iv}></View>
      <TouchableOpacity onPress={()=>this._calculation()}>
      <Image style={styles.thumb} source={result_img}/>
      </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.text1}>
          {'苦度值IBU'}
        </Text>
        <Image style={styles.thumb} source={bv_img}/>
        <Text style={styles.ti1}>
        {this.state.ibus+''}
        </Text>
      </View>
      </View>
    )
  }
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
        <View style={styles.bg}>
            <View style={styles.row}>
              <Text style={styles.text1}>{'时间'}</Text>
              <TextInput
                 style={styles.ti1}
                 onChangeText={(text) =>{
                   this._chengHopsTime(rowID,text);
                 }}
                 value={rowData.time+''}
                 placeholder={'请输入时间'}
                 underlineColorAndroid="transparent"
               />
              <Text style={styles.text2}>{'分钟'}</Text>
            </View>
            <View style={styles.row}>
            <Text >{'时间输入为:0,5,10,15,30,45,60,90'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text1}>{'重量'}</Text>
              <TextInput
                 style={styles.ti1}
                 onChangeText={(text) => {
                   this._chengHopsWeight(rowID,text);
                 }}
                 value={rowData.weight+''}
                 placeholder={'请输入酒花重量'}
                 underlineColorAndroid="transparent"
               />
               <Text style={styles.text2}>{'克'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text1}>{'酒花α-酸含量'}</Text>
              <TextInput
                 style={styles.ti1}
                 onChangeText={(text) => {
                   this._chengHopsRatio(rowID,text);
                 }}
                 value={rowData.ratio+''}
                 placeholder={'请输入酒花α-酸含量'}
                 underlineColorAndroid="transparent"
               />
               <Text style={styles.text2}>{'%'}</Text>
            </View>
          </View>
    )
  }
  _addHops(){
    console.log('_addHops')
    var hopss = this.state.hopss;
    hopss.push({time:0,weight:0,ratio:0});
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
  _chengHopsTime(rowID,text){
    console.log('_chengHopsTime',rowID,text);
    text = +text;
    if(Number.isFinite(text) == false){
      console.log('请输入正确的时间格式')
      return;
    }
    var hopss = this.state.hopss;
    hopss[rowID].time = text;
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
  _chengHopsRatio(rowID,text){
    console.log('_chengHopsRatio',rowID,text);
    text = +text;
    if(Number.isFinite(text) == false){
      console.log('请输入正确的啤酒花α-酸含量')
      return;
    }
    var hopss = this.state.hopss;
    hopss[rowID].ratio = text;
    this.setState({
      hopss:hopss,
      hopssData: hopssds.cloneWithRows(hopss)
    })
  }
  _calculation(){
    this.state.beerv = +this.state.beerv
    if(Number.isFinite(this.state.beerv) == false ){
      alert('请输入啤酒体积')
      return;
    }
    if(this.state.beerv == 0){
      alert('请输入啤酒体积')
      return;
    }
    var beerp = parseFloat(this.state.beerp);
    if(isNaN(beerp) == true)
    {
      alert('请输入正确的初始密度')
      return;
    }
    if(beerp < 1.032 || beerp > 1.075){
      Alert.alert('输入的初始密度请在1.032～1.075之间');
      return;
    }
    if (this.state.hopss.length > 0 ){
      for(var i = 0 ; i < this.state.hopss.length ; i ++){
        var hops = this.state.hopss[i];
        hops.time = +hops.time
        if(Number.isFinite(hops.time) == false){
          alert('请输入时间')
          return;
        }
        hops.weight = +hops.weight
        if(Number.isFinite(hops.weight) == false){
          alert('请输入酒花重量')
          return;
        }
        hops.ratio = +hops.ratio
        if(Number.isFinite(hops.ratio) == false){
          alert('请输入酒花α-酸含量')
          return;
        }
      }
    }else{
        alert('请输入酒花信息')
        return;
    }
    var ibus = 0
    for(var i = 0 ; i < this.state.hopss.length ; i ++){
      var hops = this.state.hopss[i];
      var time = this.checkTime(hops.time);
      var ur = this.utiratio(time,beerp);
      var ibu = hops.weight*hops.ratio*ur/this.state.beerv/10;
      ibus = ibus+ibu;
    }
    console.log(ibus);
    ibus = (ibus).toFixed(2);
    this.setState({
      ibus:ibus
    })
  }
  checkTime(time){
    var times = [0,5,10,15,30,45,60,90];
    var bcheck = true;
    for (var i = 0; i < times.length; i++) {
      if (time == times[i]){
        bcheck = false;
      }
    }
    if (bcheck) {
      if(time < 0){
        time = 0;
      }else if(time > 90){
        time = 90;
      }else{
        for (var i = 0; i < times.length; i++) {
          if(i+1<times.length){
            if (time > times[i]&&time< times[i+1]){
              if(times[i+1]-time > time-times[i]){
                time = times[i]
              }else{
                time = times[i+1]
              }
            }
          }
        }
      }
    }
    return time;
  }
  utiratio(time,beerp){
    var uratio = 0
    if(beerp >= 1.032 && beerp < 1.050){
      if(time == 0){
        uratio = 5;
      }else if(time == 5){
        uratio = 6;
      }else if(time == 10){
        uratio = 8;
      }else if(time == 15){
        uratio = 12;
      }else if(time == 30){
        uratio = 18;
      }else if(time == 45){
        uratio = 24;
      }else if(time == 60){
        uratio = 30;
      }else if(time == 90){
        uratio = 33;
      }
    }else if(beerp >= 1.050 && beerp < 1.065){
      if(time == 0){
        uratio = 5;
      }else if(time == 5){
        uratio = 6;
      }else if(time == 10){
        uratio = 8;
      }else if(time == 15){
        uratio = 12;
      }else if(time == 30){
        uratio = 17;
      }else if(time == 45){
        uratio = 22;
      }else if(time == 60){
        uratio = 28;
      }else if(time == 90){
        uratio = 30;
      }
    }else if(beerp >= 1.065 && beerp <= 1.075){
      if(time == 0){
        uratio = 4;
      }else if(time == 5){
        uratio = 5;
      }else if(time == 10){
        uratio = 7;
      }else if(time == 15){
        uratio = 10;
      }else if(time == 30){
        uratio = 16;
      }else if(time == 45){
        uratio = 21;
      }else if(time == 60){
        uratio = 26;
      }else if(time == 90){
        uratio = 28;
      }
    }
    console.log("time:",time,"beerp:",beerp,"uratio:",uratio);
    return uratio;
  }
  constructor(props){
    super(props);
    this._renderBV = this._renderBV.bind(this);
    this._renderHops = this._renderHops.bind(this);
    hopssds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var hopss = [{time:0,weight:0,ratio:0}];
    this.state = {
      beerv:'',
      beerp:'',
      ibus:'',
      hopss:hopss,
      hopssData:hopssds.cloneWithRows(hopss),
    }
  }
  componentDidMount() {

  }
  componentWillUnmount(){

  }
  render(){
    const leftButtonConfig = {
       title: '返回',
       tintColor:'#ffffff',
       handler: () => this._goBack(),
     };
    var titleConfig = {
      title: '苦度值',
      tintColor:'#ffffff'
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        tintColor={'#34495e'}
        title={titleConfig} />
        <ScrollView showsVerticalScrollIndicator={true} style={styles.scrobg}>
        {this._renderBV()}
        </ScrollView>
      </View >
    );
  }
}

var styles = StyleSheet.create({
  bg:{
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
    margin:5,
    // backgroundColor: '#F6F6F6',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    // padding: 10,
    paddingTop:1,
    paddingBottom:1
  },
  thumb: {
    width: 32,
    height: 32,
  },
  text1: {
    fontSize:15,
    height: 20,
    width:100,
    textAlign:'center',
  },
  text2: {
    flex: 1,
    fontSize:15,
    height: 20,
    width:32,
    textAlign:'left',
  },
  ti1: {
    flex: 1,
    fontSize:10,
    height: 32,
    textAlign:'left',
    // // backgroundColor:'#7f8c8d',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
    // backgroundColor:'#ff00ff'
  },
});
