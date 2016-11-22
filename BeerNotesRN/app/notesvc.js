'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity,
  Image
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import NavUitl from './navutil'

export default class NotesVC extends React.Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this._genRows()),
      data:this._genRows()
    };
  }
  _genRows(){
       const dataBlob = [];
       dataBlob.push({
         name:"配方",
         src:require('../resource/formula_normal.png')
       })
       return dataBlob;
   }
   _pressRow(rowID){
        //  alert(this.state.data[rowID].name);
        this._goMyNotes();
    }

   _renderRow(rowData, sectionID, rowID){
       return (
           <TouchableOpacity onPress={()=>this._pressRow(rowID)}>
             <View>
              <View style={styles.row}>
                <Image style={styles.thumb} source={rowData.src} />
                <Text style={styles.text}>
                  {rowData.name}
                </Text>
              </View>
            </View>
           </TouchableOpacity>
           );
     }
    _goMyNotes(){
        this.props.nav.push({
          id:'formula',
          name:'formula'
        })
     }
  render(){
    var titleConfig = {
      title: '笔记',
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        title={titleConfig} />
        <ListView
         dataSource={this.state.dataSource}
         renderRow={this._renderRow.bind(this)}
         />
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
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
    fontSize:30,
    height: 64,
    textAlign:'center',
  },
});
