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

const sectionHeights = [250, 1750, 10000000]

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
    console.log('set section')
    console.log(distanceToTop)
    if (distanceToTop < sectionHeights[0]) {
      this.setState({ currentSection: 0 })
    } else if (distanceToTop < sectionHeights[1]) {
      this.setState({ currentSection: 1 })
    } else if (distanceToTop < sectionHeights[2]) {
      this.setState({ currentSection: 2 })
    } else if (distanceToTop < sectionHeights[2]) {
      this.setState({ currentSection: 3 })
    }
  }

  handleScroll (event) {
    // let test = ReactDOM
    //   .findDOMNode(this.refs['UniqueElementIdentifier'])
    //   .getBoundingClientRect();
    let scrollTop = window.scrollY

    this.setState({
      top: scrollTop,
    })

    this.setSection(scrollTop)
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

  renderFixedStuff () {
    return <Video />
    //   if (this.state.currentSection === 0) {
    //   return <Video />
    // } else if (this.state.currentSection === 2) {
    //   return <Video />
    // }
  }

  render () {
    console.log('render')
    console.log(this.state.currentSection)
    return (
      <View >
        <View style={styles.fixedContainer}>
          <FadeSection
            isVisible={this.state.currentSection === 0 || this.state.currentSection === 2}
          >
            {this.renderFixedStuff()}
          </FadeSection>
        </View>
        <ScrollView style={styles.container} >
          <Title ref='UniqueElementIdentifier' />
          <FadeSection isVisible={this.state.currentSection === 1} >
            <FullWidthImage source={require('../assets/HKTHN–IMG01.jpg')} />
            {this.renderText(text1)}
          </FadeSection>
          <Spacer height={1000} />
          {this.renderText(text2)}
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

let text2 = `Identity as spectacle. Two socially disparate worlds surface to mind: fashion and cosplay. Cosplay refers to the activity of dressing up as a fictional character, matching everything from hairstyle to clothing to even iconic mannerisms. The practice draws from a rich literary and graphic lineage of video games, comics, anime, and more.
 
Both fashion and cosplay revel in participating in a fantastical world that has been envisioned by an artist, such as fashion designer Rei Kawakubo’s Comme Des Garçons or video game designer Yoko Taro’s Nier: Automata. Both are primarily concerned with clothing and styling as means by which to participate and express one’s identity (assumed or otherwise).`
