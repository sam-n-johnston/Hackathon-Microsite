import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import Blur from 'react-blur'
import FullWidthImage from './components/FullWidthImage'
let {height, width} = Dimensions.get('window')

export default class VideoWithTitle extends Component {
  renderTitle () {
    return (
      <View>
        {Platform.OS === 'web' ? <Blur img={'../assets/HKTHN–IMG02.jpg'} blurRadius={5} /> : null}
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
    console.log('this.props.distanceToTop')
    console.log(this.props.distanceToTop)
    return (
      <View style={[styles.titleContainer, { ...this.props.style }]} >
        {/* <Blur img={'../assets/TITLE.png'} blurRadius={this.props.distanceToTop } style={{height}} /> */}
        <FullWidthImage source={require('../assets/TITLE.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
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
