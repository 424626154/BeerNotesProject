'use strict';
import React, { Component } from 'react';

// const entrance = 'notesvc';
// const entrance = 'formulavc';
const entrance = 'homevc';
// const entrance = 'addformulavc';
// const entrance = 'morevc';
export default class BNConfig extends Component {
  static getEntrance(){
    return entrance;
  }
}
