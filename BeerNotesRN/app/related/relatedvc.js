'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ListView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import NetUitl from "../netutil";

var listData = [];
var ds = null;

export default class RelatedVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _goRelatedweb(url){
    this.props.nav.push({
      id:'relatedwebvc',
      name:'relatedwebvc',
      url:url
    })
  }
  _queryRelated(){
    var tag = this;
    let data={};
    let url = "/app/related";
    NetUitl.postJson(url,data,function (set){
        switch (set.errcode) {
          case 0:
          // console.log("data:",set.data);
            listData = JSON.parse(set.data);
            tag.setState({
              dataSource: ds.cloneWithRows(listData)
            })
            break;
          default:
            Alert.alert(set.errmsg);
            break;
        }
      });
  }
  _pressRow(rowID){
    this._goRelatedweb(listData[rowID].Link);
   }
  constructor(props){
    super(props);
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(listData),
    };
  }
  componentDidMount() {
    this._queryRelated();
  }
  componentWillUnmount(){

  }
  _renderRow(rowData, sectionID, rowID){
    return(
      <TouchableOpacity onPress={()=>this._pressRow(rowID)}>
      <View >
        <View style={styles.row}>
        <Text style={styles.text}>
          {rowData.Name}
        </Text>
          <Text style={styles.text}>
            {rowData.Brief}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    )
  }

  render(){
    const leftButtonConfig = {
       title: '返回',
       tintColor:'#ffffff',
       handler: () => this._goBack(),
     };
    var titleConfig = {
      title: '相关资料',
      tintColor:'#ffffff'
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
        renderRow={this._renderRow.bind(this)}/>
      </View >
    );
  }
}


var styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
     justifyContent: 'center',
     padding: 10,
     borderWidth: 1,
     borderRadius: 5,
     borderColor: '#CCC',
     backgroundColor: '#F6F6F6',
     margin:5,
     alignItems:'flex-start',
  },
  text: {
    flex: 1,
    marginTop: 5,
    textAlign:'left',
    fontWeight: 'bold'
  },
});
