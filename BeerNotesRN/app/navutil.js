'use strict';
import React, {
  Component,
} from 'react';
import MainVC from "./mainvc"

export default class NavUitl extends React.Component {
  static renderPage(route, nav) {
		switch (route.id) {
      case 'main':
              console.log("main")
  			return (<MainVC nav={nav}/>);
  			break;
		}
	}
}
