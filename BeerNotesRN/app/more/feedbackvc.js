'use strict';
import React, {
  Component,
} from 'react';

import {
  View,
  requireNativeComponent
} from 'react-native';

var iface = {
  name: 'FeedbcakVC',
  propTypes: {
    ...View.propTypes, // 包含默认的View的属性
     onCloseFeedback: React.PropTypes.func,
  },
};

module.exports = requireNativeComponent('FeedbcakVC', iface);
