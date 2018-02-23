import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';

export default class VideoWithTitle extends Component {
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
      <View style={styles.titleContainer} >
        {this.renderTitle()}
        {this.renderSubTitle()}
        {this.renderJapaneseSubTitle()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
