'use strict';
import React, { Component } from 'react';

// const entrance = 'notesvc';
// const entrance = 'formulavc';
const entrance = 'homevc';
// const entrance = 'addformulavc';
// const entrance = 'morevc';
const ip = "192.168.1.6";

export default class BNConfig extends Component {
  static getEntrance(){
    return entrance;
  }
  static getIP(){
    return ip;
  }
}
