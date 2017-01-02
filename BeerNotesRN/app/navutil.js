'use strict';
import React, {
  Component,
} from 'react';
import HomeVC from './homevc';//主页
import FormulaVC from "./formula/formulavc";//配方
import AddFormulaVC from "./formula/addformulavc";
import UpFormulaVC from "./formula/upformula";
import AlcoholDegreeVC from './calculator/alcoholdegreevc';
import MoreVC from './more/morevc';
import BNFeedbackVC from './more/bnfeedbackvc';
import MessageVC from './messagevc';
import Co2VC from './co2/co2vc';
import Co2ReferenceVC from './co2/co2referencevc';

export default class NavUitl extends React.Component {
  static renderPage(route, nav) {
		switch (route.id) {
      case 'homevc':
        return(<HomeVC nav={nav}/>);
        break;
      case 'formulavc':
        return (<FormulaVC nav={nav}/>);
        break;
      case 'addformulavc':
        return (<AddFormulaVC nav={nav}/>);
        break;
      case 'upformula':
        return (<UpFormulaVC {...route.params} nav={nav}/>);
        break;
      case 'alcoholdegreevc':
        return(<AlcoholDegreeVC nav={nav}/>);
        break;
      case 'morevc':
        return(<MoreVC nav={nav}/>);
        break;
      case 'bnfeedbcakvc':
        return(<BNFeedbackVC nav={nav}/>);
        break;
      case 'messagevc':
        return(<MessageVC nav={nav}/>);
        break;
      case 'co2vc':
        return(<Co2VC nav={nav}/>);
        break;
      case 'co2referencevc':
        return(<Co2ReferenceVC nav={nav}/>);
        break;
		}
	}
}
