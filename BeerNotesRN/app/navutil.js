'use strict';
import React, {
  Component,
} from 'react';
import MainVC from "./mainvc"
import NotesVC from "./notesvc"
import FormulaVC from "./formula/formulavc"
import AddFormulaVC from "./formula/addformulavc"
import UpFormulaVC from "./formula/upformula"
import AddNotesVC from './addnotesvc'
import SelectFormulaVC from './selectformulavc'
import HomeVC from './homevc';
import AlcoholDegreeVC from './calculator/alcoholdegreevc';
import MoreVC from './more/morevc'
import BNFeedbackVC from './more/bnfeedbackvc'

export default class NavUitl extends React.Component {
  static renderPage(route, nav) {
		switch (route.id) {
      case 'main':
  			return (<MainVC nav={nav}/>);
  			break;
      case 'notesvc':
        return (<NotesVC nav={nav}/>);
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
      case 'addnotesvc':
        return (<AddNotesVC nav={nav}/>);
        break;
      case 'selectformulavc':
        return (<SelectFormulaVC nav={nav}/>);
        break;
      case 'homevc':
        return(<HomeVC nav={nav}/>);
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
		}
	}
}
