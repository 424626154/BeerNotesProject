'use strict';
import React, { Component } from 'react';

const entrance = 'formula';

export default class BNConfig extends Component {
  static getEntrance(){
    console.log(entrance);
    return entrance;
  }
}
