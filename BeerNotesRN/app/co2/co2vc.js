'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class Co2VC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _goCo2ReferenceVC(){
    this.props.nav.push({
      id:'co2referencevc',
      name:'co2referencevc'
    })
  }
  _calculation(){
    // x = 342*v*y/89.6
    // y co2体积
    // x 糖重量
    // v 啤酒体积
    var beerv = parseFloat(this.state.beerv);
    var co2v = parseFloat(this.state.co2v);
    if(isNaN(beerv) == true)
    {
      alert('请输入正确的啤酒体积')
      return;
    }
    if(isNaN(co2v) == true)
    {
      alert('请输入正确的co2体积')
      return;
    }
    var sugar = (342*beerv/1000*co2v/89.6).toFixed(2);
    this.setState({
      sugar:sugar,
    })
  }
  _renderCalculation(){
    return(
      <View style={styles.aitembg}>
          <View style={styles.row}>
            <Text style={styles.text1}>
              {'啤酒体积(毫升)'}
            </Text>
            <Image style={styles.thumb} source={require('../../resource/beer_normal.png')}/>
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
             {'co2体积(毫升)'}
           </Text>
           <Image style={styles.thumb} source={require('../../resource/co2_normal.png')}/>
           <TextInput
              style={styles.ti1}
              onChangeText={(text) => this.setState({co2v:text})}
              value={this.state.co2v+''}
              placeholder={'输入目标co2体积'}
              underlineColorAndroid="transparent"
            />
         </View>

         <View style={styles.row}>
         <View style={styles.row_iv}></View>
         <TouchableOpacity onPress={()=>this._calculation()}>
         <Image style={styles.thumb} source={require('../../resource/result_normal.png')}/>
         </TouchableOpacity>
         </View>

          <View style={styles.row}>
            <Text style={styles.text1}>
              {'糖重量(克)'}
            </Text>
            <Image style={styles.thumb} source={require('../../resource/sugar_normal.png')}/>
            <Text style={styles.text2}>
            {this.state.sugar+''}
            </Text>
          </View>
      </View>
    )
  }
  constructor(props){
    super(props);
    this.state = {
      co2v:'',
      beerv:'',
      sugar:'',
    }
  }

  render(){
    const leftButtonConfig = {
       title: '返回',
       tintColor:'#ffffff',
       handler: () => this._goBack(),
     };
     const rightButtonConfig = {
      title: '参考',
      tintColor:'#ffffff',
      handler:() => this._goCo2ReferenceVC(),
    };
    var titleConfig = {
      title: '二氧化碳',
      tintColor:'#ffffff'
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        rightButton={rightButtonConfig}
        tintColor={'#34495e'}
        title={titleConfig} />
        {this._renderCalculation()}
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
    height: 32,
    paddingTop:10,
    textAlign:'left',
    // backgroundColor:'#7f8c8d',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  text3: {
    fontSize:15,
    height: 20,
    width:40,
    textAlign:'center',
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
  ti2: {
    flex: 1,
    fontSize:10,
    height: 32,
    textAlign:'left',
    // backgroundColor:'#7f8c8d',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  line:{
    height: 10,
  },
  aitembg:{
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
    margin:5,
    // backgroundColor: '#F6F6F6',
  },
  title:{
    fontSize:15,
    paddingTop:10,
    textAlign:'center',
    height: 30,
  }
});
