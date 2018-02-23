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
import ReactDOM from 'react-dom'

import Video from './Video'
import Title from './Title'
import Spacer from './components/Spacer'
import FullWidthImage from './components/FullWidthImage'
import FadeSection from './components/FadeSection'

const sectionHeights = [250, 10000000]

export class ReactNativeWeb extends Component {
  constructor (props) {
    super(props)
    this.state = {
      width: 0,
      fadeAnim: new Animated.Value(1),
      isFadingOut: false,
      isFadingIn: false,
      isVisible: true,
      currentSection: 0,
    }
    this.handleScroll = this.handleScroll.bind(this)
    this.setSection = this.setSection.bind(this)
  }

  componentWillMount () {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  setSection (distanceToTop: number) {
    if (distanceToTop < sectionHeights[0]) {
      this.setState({ currentSection: 0 })
    } else if (distanceToTop < sectionHeights[1]) {
      this.setState({ currentSection: 1 })
    } else if (distanceToTop < sectionHeights[1]) {
      this.setState({ currentSection: 2 })
    } else if (distanceToTop < sectionHeights[1]) {
      this.setState({ currentSection: 3 })
    }
  }

  handleScroll (event) {
    let test = ReactDOM
      .findDOMNode(this.refs['UniqueElementIdentifier'])
      .getBoundingClientRect();

    let scrollTop = window.scrollY

    this.setState({
      top: scrollTop,
    })

    this.setSection(scrollTop)

    if (scrollTop < sectionHeights[0]) {
      if (!this.state.isFadingIn && !this.state.isVisible) {
        this.fadeIn(() => {
          this.setState({
            isFadingIn: false,
            isVisible: true,
          })
        })
        this.setState({
          isFadingIn: true,
        })
      }
    } else {
      if (!this.state.isFadingOut && this.state.isVisible) {
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
        duration: 500,
      }
    ).start(cb);
  }

  fadeOut (cb) {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 0,
        duration: 500,
      }
    ).start(cb);
  }

  renderText (text) {
    return (
      <View style={styles.paragraphContainer} >
        <Text style={styles.paragraphText} >{text}</Text>
      </View>
    )
  }

  render () {
    return (
      <View >
        <View style={styles.fixedContainer}>
          <FadeSection isVisible={this.state.currentSection === 0} >
            <Video />
          </FadeSection>
        </View>
        <ScrollView style={styles.container} >
          <Title ref='UniqueElementIdentifier' />
          <FadeSection isVisible={this.state.currentSection === 1} >
            <FullWidthImage source={require('../assets/HKTHN–IMG01.jpg')} />
            {this.renderText(text1)}
          </FadeSection>
          <Spacer height={1000} />
          {this.renderText(text1)}
        </ScrollView>
      </View>
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
    backgroundColor: 'rgba(35,35,35, 1)',
  }
});

let text1 = `Identity is such an unstable concept, isn’t it?
  
  Like subatomic particles whose behavior operate under an uncertainty principle, who you are is a function of how others perceive you. Our identities are mediated through a complex social negotiation that constantly blur the line between performance and reality.
  
  And how labyrinthine that negotiation has become against the backdrop of today’s cultural turbulence and technological acceleration. The virtual has expanded our sense of self into a new digital layer, which creates new modes by which our identity may be expressed, fragmented, and understood.`

