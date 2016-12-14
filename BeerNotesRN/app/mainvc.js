'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator'
import NotesVC from './notesvc'
import MeVC from './mevc'

const NOTES = 'notes';
const NOTES_NORMAL = require('../resource/notes_normal.png');
const NOTES_FOCUS = require('../resource/notes_focus.png');
const ME = 'me';
const ME_NORMAL = require('../resource/me_normal.png');
const ME_FOCUS = require('../resource/me_focus.png');

export default class MainVC extends Component{
    constructor(props) {
        super(props);
        this.state = {selectedTab: NOTES}
    }

    _renderTabItem(img, selectedImg, tag, childView) {
      return (
          <TabNavigator.Item
              selected={this.state.selectedTab === tag}
              renderIcon={() => <Image style={styles.tabIcon} source={img}/>}
              renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg}/>}
              onPress={() => this.setState({ selectedTab: tag })}>
              {childView}
          </TabNavigator.Item>
      );
  }

  render(){
    return(
      <View style={{flex: 1}}>
          <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
          {this._renderTabItem(NOTES_NORMAL, NOTES_FOCUS, NOTES, <NotesVC nav={this.props.nav}/>)}
          {this._renderTabItem(ME_NORMAL, ME_FOCUS, ME, <MeVC nav={this.props.nav}/>)}
          </TabNavigator>
      </View >
    );
  }
}

const styles = StyleSheet.create({
    tab: {
        height: 50,
        backgroundColor: '#333333',
        alignItems: 'center'
    },
    tabIcon: {
        width: 40,
        height: 40,
        resizeMode: 'stretch',
        marginTop: 6
    }
});
