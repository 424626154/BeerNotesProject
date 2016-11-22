'use strict';
import React, {
  Component,
} from 'react';
import MainVC from "./mainvc"
import FormulaVC from "./formula"
import AddFormulaVC from "./addformula"
import UpFormulaVC from "./upformula"
export default class NavUitl extends React.Component {
  static renderPage(route, nav) {
		switch (route.id) {
      case 'main':
  			return (<MainVC nav={nav}/>);
  			break;
      case 'formula':
        return (<FormulaVC nav={nav}/>);
        break;
      case 'addformula':
        return (<AddFormulaVC nav={nav}/>);
        break;
      case 'upformula':
        return (<UpFormulaVC {...route.params} nav={nav}/>);
        break;
		}
	}
}
