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
import LoginVC from './more/loginvc';
import RegisterVC from './more/registervc';
import ForgetVC from './more/forgetvc';
import ModifyVC from './more/modifyvc';
import AboutVC from './more/aboutvc';

import WebsiteVC from './related/websitevc';
import RelatedwebVC from './related/relatedwebvc';
import RelatedTableVC from './related/relatedtablevc';
import WNumberVC from './related/wnumbervc';

import CloudFormulaVC from './formula/cloudformulavc';
import FormulaCommentVC from './formula/formulacommentvc';
import CloudFormulaContentVC from './formula/cformulacontentvc';
import KnowbrewVC from './knowbrew/knowbrewvc';
import AddKnowbrewVC from './knowbrew/addknowbrewvc'
import KnowberwconVC from './knowbrew/knowberwconvc'

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
      case 'loginvc':
        return(<LoginVC nav={nav}/>);
        break;
      case 'registervc':
        return(<RegisterVC nav={nav}/>);
        break;
      case 'forgetvc':
        return(<ForgetVC nav={nav}/>);
        break;
      case 'modifyvc':
        return(<ModifyVC nav={nav}/>);
        break;
      case 'websitevc':
        return(<WebsiteVC nav={nav}/>);
        break;
      case 'relatedwebvc':
        return(<RelatedwebVC nav={nav} url={route.url} rname={route.rname}/>);
        break;
      case 'cloudformulavc':
        return(<CloudFormulaVC nav={nav}/>);
        break;
      case 'formulacommentvc':
        return(<FormulaCommentVC nav={nav} fid={route.fid} fcid={route.fcid}/>);
        break;
      case 'cformulacontentvc':
        return(<CloudFormulaContentVC nav={nav} fid={route.fid} fname={route.fname}/>);
      break;
      case 'relatedtablevc':
        return(<RelatedTableVC nav={nav}/>);
        break;
      case 'wnumbervc':
        return(<WNumberVC nav={nav}/>);
        break;
      case 'knowbrewvc':
        return(<KnowbrewVC nav={nav}/>);
        break;
      case 'aboutvc':
        return(<AboutVC nav={nav}/>);
        break;
      case 'addknowbrewvc':
        return(<AddKnowbrewVC nav={nav}/>);
        break;
        case 'knowberwconvc':
          return(<KnowberwconVC nav={nav} url={route.url} kbname={route.kbname}/>);
        break;
		}
	}
}
