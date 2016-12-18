'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  ListView,
  Image,
  Text,
  TouchableOpacity,
  NativeModules,
  Platform
} from 'react-native';
import NavigationBar from 'react-native-navbar';
var listData= [
  {
  text:'版本号 1.0.1',
  img:require('../../resource/version_normal.png')
  },
  {
  text:'用户反馈',
  img:require('../../resource/feedback_normal.png')
  }
];
var ds = null;
var AppManager = NativeModules.AppManager;
export default class MoveVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _goIosFeedback(){
    this.props.nav.push({
      id:'bnfeedbcakvc',
      name:'bnfeedbcakvc',
    })
  }
  _pressRow(rowID){
    console.log(rowID);
    if(rowID == 0 ){

    }else if(rowID == 1){
      console.log(Platform.OS)
      if(Platform.OS === 'ios'){
        this._goIosFeedback();
      }else{
        AppManager.startFeedbackActivity();
      }
    }
   }
   _getAppVersion(){
     if(Platform.OS === 'ios'){
       AppManager.getAppVersion().then((datas)=> {
               var item = listData[0];
               item.text = '版本号 '+datas
               this.setState({
                 dataSource: ds.cloneWithRows(listData),
               })
           }).catch((err)=> {
               console.warn('err', err);
           });
     }else{
       AppManager.getAppVersion(
         (version) => {
             var item = listData[0];
             item.text = '版本号 '+version
             this.setState({
               dataSource: ds.cloneWithRows(listData),
             })
         },
         (err) => {
           console.warn('err', err);
         }
       );
     }
   }
   _renderRow(rowData, sectionID, rowID){
       return (
           <TouchableOpacity onPress={()=>this._pressRow(rowID)}>
           <View >
             <View style={styles.row}>
               <Image style={styles.thumb} source={rowData.img} />
               <Text style={styles.text}>
                 {rowData.text}
               </Text>
             </View>
           </View>
           </TouchableOpacity>
           );
     }
  constructor(props){
    super(props);
    this._renderRow = this._renderRow.bind(this)
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(listData),
    };
  }
  componentDidMount() {
    this._getAppVersion();
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
      title: '更多',
      tintColor:'#ffffff',
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        leftButton={leftButtonConfig}
        tintColor={'#34495e'}
        title={titleConfig} />
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
        />
      </View >
    );
  }
}

var styles = StyleSheet.create({
  list: {
    marginTop:5,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    flexDirection: 'row',
     justifyContent: 'center',
     padding: 10,
     borderWidth: 1,
     borderRadius: 5,
     borderColor: '#CCC',
     backgroundColor: '#F6F6F6',
     margin:5,
     alignItems:'center',
  },
  thumb: {
    width: 45,
    height: 45
  },
  text: {
    flex: 1,
    marginTop: 5,
    textAlign:'left',
    fontWeight: 'bold'
  },
});