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

export default class BeerNotesRN extends Component {
  render() {
    return (
      <Navigator
          initialRoute={{name: 'main', index: 0, id:'main'}}
          renderScene={(route, navigator) => NavUitl.renderPage(route,navigator)}
      />
    );
  }
}

AppRegistry.registerComponent('BeerNotesRN', () => BeerNotesRN);
