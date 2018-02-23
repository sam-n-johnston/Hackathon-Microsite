import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  Animated,
  Image,
} from 'react-native';

export default class ReactNativeWeb extends Component {
  constructor (props) {
    super(props)
    this.state = {
      width: 0,
      fadeAnim: new Animated.Value(props.isVisible ? 1 : 0),
      isFadingOut: false,
      isFadingIn: false,
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.isVisible !== nextProps.isVisible) {
      if (nextProps.isVisible) {
        this.fadeIn(() => {
          this.setState({
            isFadingIn: false,
          })
        })
        this.setState({
          isFadingIn: true,
        })
      } else {
        this.fadeOut(() => {
          this.setState({
            isFadingOut: false,
            isVisible: false,
          })
        })
        this.setState({
          isFadingOut: true,
        })
      }
    }
  }

  fadeIn (cb) {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 750,
      }
    ).start(cb);
  }

  fadeOut (cb) {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 0,
        duration: 750,
      }
    ).start(cb);
  }

  render () {
    return (
      <Animated.View style={{ ...this.props.style, opacity: this.state.fadeAnim }} >
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  paragraphContainer: {
    padding: 10,
  },
  paragraphText: {
    color: 'white',
    fontSize: 25,
  },
  fixedContainer: {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    top: Platform.OS === 'ios' ? 25 : 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
  }
});

