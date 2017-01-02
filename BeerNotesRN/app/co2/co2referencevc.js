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
} from 'react-native';
import NavigationBar from 'react-native-navbar';

var listData= [
  {
  title:'啤酒种类',
  text:'co2体积'
  },
  {
  title:'英国艾尔,棕艾,世涛,波特',
  text:'1.5～2.2',
  },
  {
  title:'美国艾尔',
  text:'2.2～3.0',
  },
  {
  title:'德国小麦啤酒',
  text:'2.8～5.1',
  },
  {
  title:'比利时艾尔',
  text:'2.0～4.5',
  },
  {
  title:'欧洲拉格',
  text:'2.4～2.6',
  },
  {
  title:'美国拉格',
  text:'2.5～2.8',
  }
];
var ds = null;
export default class MeVC extends React.Component {
  _goBack(){
    this.props.nav.pop();
  }
  _renderRow(rowData, sectionID, rowID){
      return (
          <TouchableOpacity onPress={()=>this._pressRow(rowID)}>
          <View style={styles.row}>
            <View style={styles.row1}>
              <Text style={styles.text}>
                {rowData.title}
              </Text>
            </View>
            <View style={styles.row1}>
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
      this._renderRow = this._renderRow.bind(this);
      ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows(listData),
      };
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
      title: 'CO2参考',
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
     margin:5,
     alignItems:'center',
  },
  row1:{
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC',
    backgroundColor: '#F6F6F6',
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
