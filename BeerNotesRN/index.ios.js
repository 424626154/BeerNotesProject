/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Navigator
} from 'react-native';

import NavUitl from './app/navutil'
import BNConfig from './app/config'

export default class BeerNotesRN extends Component {
  render() {
    return (
      <Navigator
          initialRoute={{name: BNConfig.getEntrance(), index: 0, id:BNConfig.getEntrance()}}
          renderScene={(route, navigator) => NavUitl.renderPage(route,navigator)}
      />
    );
  }
}

AppRegistry.registerComponent('BeerNotesRN', () => BeerNotesRN);
