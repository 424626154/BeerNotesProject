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
var vc;
var sqlitehelper;
export default class AlcoholDegreeVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _calculation(){
    var s_p = parseFloat(this.state.s_p);
    if(isNaN(s_p) == true)
    {
      alert('请输入正确的初始密度')
      return;
    }
    var e_p = parseFloat(this.state.e_p);
    if(isNaN(e_p) == true)
    {
      alert('请输入正确的终点密度')
      return;
    }
    //start_concentration
    var s_c = ((s_p-1)*1000/4).toFixed(4);
    //end_concentration
    var e_p = ((e_p-1)*1000/4).toFixed(4);
    //alcoholdegree
    var alc = ((parseFloat(s_c) - parseFloat(e_p))*0.524).toFixed(2);
    // console.log(parseFloat(s_p),parseFloat(e_p),parseFloat(alc));
    this.setState({
      alc:parseFloat(alc)
    })
  }
  constructor(props){
    super(props);
    vc = this;
    this.state = {
      s_p:1.032,//start_proportion
      e_p:1.002,//end_proportion
      alc:3.93
    }
  }
  componentDidMount() {

  }
  componentWillUnmount(){

  }
  render(){
    const leftButtonConfig = {
       title: '返回',
       handler: () => this._goBack(),
     };
    const titleConfig = {
      title: '酒精度数计算',
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        title={titleConfig} />

         <View style={styles.row}>
           <Text style={styles.text1}>
             {'初始密度'}
           </Text>
           <Image style={styles.thumb} source={require('../resource/proportion_normal.png')}/>
           <TextInput
              style={styles.text}
              onChangeText={(text) => this.setState({s_p:text})}
              value={this.state.s_p+''}
            />
         </View>

        <View style={styles.row}>
          <Text style={styles.text1}>
            {'终点密度'}
          </Text>
          <Image style={styles.thumb} source={require('../resource/proportion_normal.png')}/>
          <TextInput
             style={styles.text}
             onChangeText={(text) => this.setState({e_p:text})}
             value={this.state.e_p+''}
           />
        </View>

        <View style={styles.row}>
        <TouchableOpacity onPress={()=>this._calculation()}>
        <Text style={styles.thumb}>{'计算'}</Text>
        </TouchableOpacity>
        </View>

         <View style={styles.row}>
           <Text style={styles.text1}>
             {'酒精度'}
           </Text>
           <Image style={styles.thumb} source={require('../resource/alcohol_degree_icon_normal.png')}/>
           <Text style={styles.text}>
           {this.state.alc+''}
           </Text>
         </View>
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
  text1: {
    fontSize:15,
    height: 48,
    width:80,
    textAlign:'center',
  }
});
