import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import Video from './components/VideoPlayer'

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
      // import native code
    }
  }

  renderTitle () {
    return (
      <View>
        <Text style={styles.title}>THE</Text>
        <Text style={styles.title}>ULTIMATE</Text>
        <Text style={styles.title}>RPG</Text>
      </View>
    )
  }

  renderSubTitle () {
    return (
      <View>
        <Text style={styles.subtitle}>Exploring the Boundaries</Text>
        <Text style={styles.subtitle}>Between Fashion and Cosplay</Text>
      </View>
    )
  }

  renderJapaneseSubTitle () {
    let textArray = 'スプレのののをのる'.split('')
    return (
      <View style={styles.japanesesubtitleContainer} >
        {textArray.map((letter, ind) => <Text key={ind} style={styles.japanesesubtitle}>{letter}</Text>)}
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}
        onLayout={this.handleLayout}
      >
        {this.renderVideoPlayer()}
        <View style={styles.titleContainer} >
          {this.renderTitle()}
          {this.renderSubTitle()}
          {this.renderJapaneseSubTitle()}
        </View>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 75,
  },
  subtitle: {
    color: 'white',
    fontSize: 25,
    paddingLeft: 50,
  },
  japanesesubtitle: {
    fontSize: 45,
    color: 'white',
    marginTop: -20
  },
  japanesesubtitleContainer: {
    top: -45,
  },
});
