import React, { Component } from 'react';
import {
  View,
  Image,
  Dimensions,
} from 'react-native';
let {height, width} = Dimensions.get('window')

export default class FullHeightImage extends Component {
  constructor () {
    super();

    this.state = {
      width: 0,
      height: 0
    };
  }

  _onLayout (event) {
    const containerHeight = height

    if (this.props.ratio) {
      this.setState({
        width: containerHeight,
        height: containerHeight * this.props.ratio
      });
    } else {
      Image.getSize(this.props.source, (width, height) => {
        console.log('WIDTH')
        console.log(width)
        console.log(height)
        console.log(containerHeight)
        this.setState({
          width: containerHeight * width / height,
          height: containerHeight
        });
      });
    }
  }

  render () {
    return (
      <View onLayout={this._onLayout.bind(this)}>
        <Image
          source={this.props.source}
          style={{
            width: this.state.width,
            height: this.state.height
          }} />
      </View>
    );
  }
}