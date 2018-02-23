import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import VideoWithTitle from './VideoWithTitle'



export class ReactNativeWeb extends Component {
  renderText (text) {
    return (
      <View style={styles.paragraphContainer} >
        <Text style={styles.paragraphText} >{text}</Text>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container} >
        <VideoWithTitle />
        {this.renderText(text1)}
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
  paragraphContainer: {
    padding: 10,
  },
  paragraphText: {
    color: 'black',
    fontSize: 25,
  },
});

let text1 = `Identity is such an unstable concept, isn’t it?
 
Like subatomic particles whose behavior operate under an uncertainty principle, who you are is a function of how others perceive you. Our identities are mediated through a complex social negotiation that constantly blur the line between performance and reality.
 
And how labyrinthine that negotiation has become against the backdrop of today’s cultural turbulence and technological acceleration. The virtual has expanded our sense of self into a new digital layer, which creates new modes by which our identity may be expressed, fragmented, and understood.`

