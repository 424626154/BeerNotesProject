'use strict';
import React, {
  Component,
} from 'react';

import {
  View,
  requireNativeComponent
} from 'react-native';
//
// export default class GDMapVC extends React.Component{
//   static propTypes = {
//
//  };
//   componentDidMount(){
//     console.log("load bnmap")
//   }
//   render(){
//     return(
//       <BNMapVC {...this.props}></BNMapVC>
//     )
//   }
// }
// var BNMapVC = requireNativeComponent('BNMapVC', GDMapVC);
var iface = {
  name: 'BNMapVC',
  propTypes: {
    ...View.propTypes // 包含默认的View的属性
  },
};

module.exports = requireNativeComponent('BNMapVC', iface);
