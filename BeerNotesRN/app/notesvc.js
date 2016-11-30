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
import SQLiteHelper from './sqlitehelper';
let sqlitehelper;
var fData = [];
var ds;
var vc;
export default class NotesVC extends React.Component {

  _queryCllback(errocode,rows){
    // vc.setState({
    //   visible: false
    // })
    if(errocode == 0 ){
      fData = [];
      for(var i = 0 ; i < rows.length;i++){
        fData.push(rows.item(i));
      }

      vc.setState({
        dataSource: ds.cloneWithRows(fData)
      })
    }else{
      alert(errocode);
    }
  }
  _query(){
    sqlitehelper.queryAllNotesDB(this._queryCllback);
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
        // this._goFormulaVC();
    }

   _renderRow(rowData, sectionID, rowID){
       return (
           <TouchableOpacity onPress={()=>this._pressRow(rowID)}>
             <View>
              <View style={styles.row}>
                <Text style={styles.text}>
                  {rowData.fid}
                </Text>
              </View>
            </View>
           </TouchableOpacity>
           );
     }
    _goFormulaVC(){
        this.props.nav.push({
          id:'formulavc',
          name:'formulavc'
        })
     }
  _goAddNotesVC(){
       this.props.nav.push({
         id:'addnotesvc',
         name:'addnotesvc'
       })
     }
  _addNotes(){
    this._goAddNotesVC()
  }
  constructor(props) {
    super(props);
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(fData),
    };
    vc = this;
  }
  componentDidMount() {
    sqlitehelper = new SQLiteHelper();
    sqlitehelper.openDB();
    this._query();
  }
  componentWillUnmount(){
      sqlitehelper.closeDB();
  }
  render(){
    var titleConfig = {
      title: '我的笔记',
    };
     var rightButtonConfig = {
      title: '新建',
      handler:()=>this._addNotes(),
    };
    return(
      <View style={{flex: 1}}>
      <NavigationBar
        title={titleConfig}
        rightButton={rightButtonConfig}/>
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
  }
});
