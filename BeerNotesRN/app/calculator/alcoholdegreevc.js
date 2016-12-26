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

var s_p_img = require('../../resource/proportion_normal.png');
var e_p_img = require('../../resource/proportion_normal.png');
var s_c_img = require('../../resource/concentration_normal.png');
var e_c_img = require('../../resource/concentration_normal.png');
var p_img = require('../../resource/proportion_normal.png');
var c_img = require('../../resource/concentration_normal.png');
export default class AlcoholDegreeVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _calculation(){
    if(this.state.isporc){
      var s_p = parseFloat(this.state.s_porc);
      if(isNaN(s_p) == true)
      {
        alert('请输入正确的初始密度')
        return;
      }
      var e_p = parseFloat(this.state.e_porc);
      if(isNaN(e_p) == true)
      {
        alert('请输入正确的终点密度')
        return;
      }
      //start_concentration
      var s_c = ((s_p-1)*1000/4).toFixed(4);
      //end_concentration
      var e_s = ((e_p-1)*1000/4).toFixed(4);
      //alcoholdegree
      var alc = ((parseFloat(s_c) - parseFloat(e_s))*0.524).toFixed(2);
      // console.log(parseFloat(s_p),parseFloat(e_p),parseFloat(alc));
      this.setState({
        alc:parseFloat(alc)
      })
    }else{
      var s_c = parseFloat(this.state.s_porc);
      if(isNaN(s_c) == true)
      {
        alert('请输入正确的初始浓度')
        return;
      }
      var e_c = parseFloat(this.state.e_porc);
      if(isNaN(e_c) == true)
      {
        alert('请输入正确的终点浓度')
        return;
      }
      //alcoholdegree
      var alc = ((parseFloat(s_c) - parseFloat(e_c))*0.524).toFixed(2);
      // console.log(parseFloat(s_p),parseFloat(e_p),parseFloat(alc));
      this.setState({
        alc:parseFloat(alc)
      })
    }
  }
  // 计算密度浓度转换
  _isporcswitch(){
    if(this.state.isporc){
      this.setState({
        isporc:false,
        s_porc_text:'初始浓度',
        e_porc_text:'终点浓度',
        s_porc_img:s_p_img,
        e_porc_img:s_p_img,
        s_porc:'',//8
        e_porc:'',//0.5
        s_porc_pla:'请输入初始浓度',
        e_porc_pla:'请输入终点浓度',
        alc:'计算后获得',
      })
    }else{
      this.setState({
        isporc:true,
        s_porc_text:'初始密度',
        e_porc_text:'终点密度',
        s_porc_img:s_c_img,
        e_porc_img:s_c_img,
        s_porc:'',//1.032
        e_porc:'',//1.002
        s_porc_pla:'请输入初始密度',
        e_porc_pla:'请输入终点密度',
        alc:'计算后获得',
      })
    }
  }
  // 密度浓度转换
  _pcswitch(){
    if (this.state.p2c) {
      this.setState({
        p2c:false,
        f_text:'浓度',
        f_img:c_img,
        t_text:'密度',
        t_img:p_img,
        f_pc:'',//8
        t_pc:'无结果',//1.032
        f_pc_pla:'输入浓度',
        })
    }else{
      this.setState({
        p2c:true,
        f_text:'密度',
        f_img:p_img,
        t_text:'浓度',
        t_img:c_img,
        f_pc:'',//1.032
        t_pc:'无结果',//8
        f_pc_pla:'输入密度',
        })
    }
  }
  _cal_pc(){
    if(this.state.p2c){
      var f_p = parseFloat(this.state.f_pc);
      if(isNaN(f_p) == true)
      {
        alert('请输入正确的密度')
        return;
      }
      var t_pc = ((parseFloat(this.state.f_pc)-1)*1000/4).toFixed(4);
      this.setState({
        t_pc:parseFloat(t_pc)
      })
    }else{
      var f_p = parseFloat(this.state.f_pc);
      if(isNaN(f_p) == true)
      {
        alert('请输入正确的浓度')
        return;
      }
      var t_pc = (parseFloat(this.state.f_pc)*4/1000+1).toFixed(4);
      this.setState({
        t_pc:parseFloat(t_pc)
      })
    }
  }
  _renderCalculator(){
    return(
    <View style={styles.aitembg}>
        <View style={styles.row}>
          <Text style={styles.text1}>
            {this.state.s_porc_text}
          </Text>
          <Image style={styles.thumb} source={this.state.s_porc_img}/>
          <TextInput
             style={styles.ti1}
             onChangeText={(text) => this.setState({s_porc:text})}
             value={this.state.s_porc+''}
             placeholder={this.state.s_porc_pla}
             underlineColorAndroid="transparent"
           />
        </View>

       <View style={styles.row}>
         <Text style={styles.text1}>
           {this.state.e_porc_text}
         </Text>
         <Image style={styles.thumb} source={this.state.e_porc_img}/>
         <TextInput
            style={styles.ti1}
            onChangeText={(text) => this.setState({e_porc:text})}
            value={this.state.e_porc+''}
            placeholder={this.state.e_porc_pla}
            underlineColorAndroid="transparent"
          />
       </View>

       <View style={styles.row}>
       <TouchableOpacity onPress={()=>this._isporcswitch()}>
       <Image style={styles.thumb} source={require('../../resource/switch_normal.png')}/>
       </TouchableOpacity>
       <View style={styles.row_iv}></View>
       <TouchableOpacity onPress={()=>this._calculation()}>
       <Image style={styles.thumb} source={require('../../resource/result_normal.png')}/>
       </TouchableOpacity>
       </View>

        <View style={styles.row}>
          <Text style={styles.text1}>
            {'酒精度'}
          </Text>
          <Image style={styles.thumb} source={require('../../resource/alcohol_degree_icon_normal.png')}/>
          <Text style={styles.text2}>
          {this.state.alc+''}
          </Text>
        </View>
    </View>
    )
  }
  _renderSwitch(){
    return(
      <View style={styles.aitembg}>
      <View><Text style={styles.title}>密度浓度转换</Text></View>
        <View style={styles.row}>
          <Text style={styles.text3}>
            {this.state.f_text}
          </Text>
          <Image style={styles.thumb} source={this.state.f_img}/>
          <TextInput
             style={styles.ti2}
             onChangeText={(text) => this.setState({f_pc:text})}
             value={this.state.f_pc+''}
              placeholder={this.state.f_pc_pla}
              underlineColorAndroid="transparent"
           />
           <Text style={styles.text3}>
             {this.state.t_text}
           </Text>
           <Image style={styles.thumb} source={this.state.t_img}/>
           <Text style={styles.text2}>{this.state.t_pc}</Text>
        </View>

        <View style={styles.row}>
        <TouchableOpacity onPress={()=>this._pcswitch()}>
        <Image style={styles.thumb} source={require('../../resource/switch_normal.png')}/>
        </TouchableOpacity>
        <View style={styles.row_iv}></View>
        <TouchableOpacity onPress={()=>this._cal_pc()}>
        <Image style={styles.thumb} source={require('../../resource/result_normal.png')}/>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
  constructor(props){
    super(props);
    this.state = {
      p2c:true,//true密度转浓度 false 浓度转密度
      f_pc:'',//1.032
      t_pc:'无结果',//8
      f_text:'密度',
      f_img:p_img,
      t_text:'浓度',
      t_img:c_img,
      f_pc_pla:'输入密度',
      isporc:true,// true 密度计算 false浓度计算
      s_porc:'',//start_proportion or concentration 1.032
      e_porc:'',//end_proportion 1.002
      alc:'计算后获得',//3.93
      s_porc_text:'初始密度',
      e_porc_text:'终点密度',
      s_porc_img:s_p_img,
      e_porc_img:s_p_img,
      s_porc_pla:'请输入初始密度',
      e_porc_pla:'请输入终点密度',
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
    const titleConfig = {
      title: '酒精度数计算',
      tintColor:'#ffffff'
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        tintColor={'#34495e'}
        title={titleConfig} />
        {this._renderCalculator()}
         <View style={styles.line}></View>
         {/* 密度浓度转换 */}
        {this._renderSwitch()}
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
    width:68,
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
