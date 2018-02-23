import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import Video from './components/VideoPlayer'

console.log('native')

export default class VideoWithTitle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      width: 0,
    }
    this.handleLayout = this.handleLayout.bind(this)
  }

  handleLayout (evt) {
    this.setState({
      width: evt.nativeEvent.layout.width,
    })
  }

  renderVideoPlayer () {
    if (Platform.OS === 'web') {
      return (
        <Video
          playing
          muted
          width={this.state.width}
          height={this.state.width / 1080 * 1920}
          url={'./assets/video.mp4'}
          playsinline
        />
      )
    } else {
      return (
        <View>
          <Text>Somevideo...</Text>
          <Text>Somevideo...</Text>
          <Text>Somevideo...</Text>
          <Text>Somevideo...</Text>
          <Text>Somevideo...</Text>
        </View>
      )
    }
  }

  render () {
    return (
      <View style={styles.container}
        onLayout={this.handleLayout}
      >
        {this.renderVideoPlayer()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
