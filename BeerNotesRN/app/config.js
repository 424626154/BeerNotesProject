'use strict';
import React, { Component } from 'react';

// const entrance = 'notesvc';
// const entrance = 'formulavc';
const entrance = 'homevc';
// const entrance = 'addformulavc';
// const entrance = 'morevc';
const isdebug = false;
const ip = "182.92.167.29";
const debug_id = "192.168.1.111";
export default class BNConfig extends Component {
  static getEntrance(){
    return entrance;
  }
  static getIP(){
    if(isdebug){
          return debug_id;
    }else{
          return ip;
    }
  }
}
