import React, { Component } from 'react';
import {
  View,
} from 'react-native';

export default class Spacer extends Component {
  render () {
    return (
      <View style={{height: this.props.height}} />
    )
  }
}
