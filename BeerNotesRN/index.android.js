/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   Navigator
 } from 'react-native';

 import NavUitl from './app/navutil'
 import BNConfig from './app/config'
 var entrance;

 export default class BeerNotesRN extends Component {
   render() {
     return (
       <Navigator
           initialRoute={{name:entrance , index: 0, id:entrance}}
           renderScene={(route, navigator) => NavUitl.renderPage(route,navigator)}
       />
     );
   }
   constructor(props){
     super(props);
     entrance = BNConfig.getEntrance()
   }
 }


 AppRegistry.registerComponent('BeerNotesRN', () => BeerNotesRN);
