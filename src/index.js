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
import FullHeightImage from './components/FullHeightImage'
import FadeSection from './components/FadeSection'

const sectionHeights = [430, 1630, 2300, 2550, 3750, 4150, 4950, 5520, 10000000]

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
      currentFixedComponent: null,
      top: 0,
    }
    this.handleScroll = this.handleScroll.bind(this)
    this.setSection = this.setSection.bind(this)
  }

  componentWillMount () {
    if (Platform.OS === 'web') {
      window.addEventListener('scroll', this.handleScroll);
    }
  }
  componentWillUnmount () {
    if (Platform.OS === 'web') {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  setSection (distanceToTop: number) {
    console.log('set section')
    console.log(distanceToTop)
    if (distanceToTop < sectionHeights[0]) {
      this.setState({ currentSection: 0, currentFixedComponent: <Video /> })
    } else if (distanceToTop < sectionHeights[1]) {
      this.setState({ currentSection: 1 })
    } else if (distanceToTop < sectionHeights[2]) {
      this.setState({
        currentSection: 2,
        currentFixedComponent: <FullHeightImage
          source={require('../assets/HKTHN–IMG02.jpg')}
        />
      })
    } else if (distanceToTop < sectionHeights[3]) {
      this.setState({ currentSection: 3 })
    } else if (distanceToTop < sectionHeights[4]) {
      this.setState({
        currentSection: 4
      })
    } else if (distanceToTop < sectionHeights[5]) {
      this.setState({
        currentSection: 5,
        currentFixedComponent: <FullHeightImage
          source={require('../assets/HKTHN–IMG05.jpg')}
        />
      })
    } else if (distanceToTop < sectionHeights[6]) {
      this.setState({
        currentSection: 6,
      })
    } else if (distanceToTop < sectionHeights[7]) {
      this.setState({ currentSection: 7 })
    } else if (distanceToTop < sectionHeights[8]) {
      this.setState({
        currentSection: 8,
        currentFixedComponent: <FullHeightImage
          source={require('../assets/HKTHN–IMG07.jpg')}
        />
      })
    } else if (distanceToTop < sectionHeights[9]) {
      this.setState({ currentSection: 9 })
    }
  }

  handleScroll (event) {
    // let test = ReactDOM
    //   .findDOMNode(this.refs['UniqueElementIdentifier'])
    //   .getBoundingClientRect();
    let scrollTop = window.scrollY

    console.log('scrollTop')
    console.log(scrollTop)

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

  render () {
    let topPadding = -200
    return (
      <View >
        <View style={styles.fixedContainer}>
          <FadeSection
            isVisible={
              this.state.currentSection === 0 ||
              this.state.currentSection === 2 ||
              this.state.currentSection === 5 ||
              this.state.currentSection === 8
            }
          >
            {this.state.currentFixedComponent}
          </FadeSection>
        </View>
        <ScrollView onScroll={this.handleScroll} style={styles.container} >
          <Title style={{zIndex: 5}} ref='UniqueElementIdentifier' distanceToTop={this.state.top} />
          <FadeSection style={{top: topPadding}} isVisible={this.state.currentSection === 1} >
            <FullWidthImage source={require('../assets/HKTHN–IMG01.jpg')} />
            {this.renderText(text1)}
          </FadeSection>
          <FadeSection style={{top: topPadding}} isVisible={this.state.currentSection === 2 || this.state.currentSection === 1} >
            {this.renderText(text2)}
          </FadeSection>
          <FadeSection isVisible={this.state.currentSection === 3} >
            <Spacer height={50} />
            {this.renderText(text3_1)}
          </FadeSection>
          <FadeSection isVisible={this.state.currentSection === 4} >
            <Spacer height={50} />
            <FullWidthImage source={require('../assets/HKTHN–IMG03.jpg')} />
            {this.renderText(text3_2)}
          </FadeSection>
          <FadeSection isVisible={this.state.currentSection === 5} >
            <Spacer height={150} />
            {this.renderText(text3_3)}
          </FadeSection>
          <FadeSection isVisible={this.state.currentSection === 6} >
            <Spacer height={250} />
            <FullWidthImage source={require('../assets/HKTHN–IMG06.jpg')} />
            {this.renderText(text3_4)}
          </FadeSection>
          <FadeSection isVisible={this.state.currentSection === 7} >
            <Spacer height={100} />
            {this.renderText(text4_1)}
          </FadeSection>
          <FadeSection isVisible={this.state.currentSection === 8} >
            <Spacer height={200} />
            {this.renderText(text4_2)}
            {this.renderText(text4_3)}
          </FadeSection>
          <Spacer height={1000} />
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
    bottom: 0,
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'rgba(35,35,35, 1)',
  }
});

let text1 = `Identity is such an unstable concept, isn’t it?
  
  Like subatomic particles whose behavior operate under an uncertainty principle, who you are is a function of how others perceive you. Our identities are mediated through a complex social negotiation that constantly blur the line between performance and reality.
  
  And how labyrinthine that negotiation has become against the backdrop of today’s cultural turbulence and technological acceleration. The virtual has expanded our sense of self into a new digital layer, which creates new modes by which our identity may be expressed, fragmented, and understood.`

let text2 = `Identity as spectacle. Two socially disparate worlds surface to mind: fashion and cosplay. Cosplay refers to the activity of dressing up as a fictional character, matching everything from hairstyle to clothing to even iconic mannerisms. The practice draws from a rich literary and graphic lineage of video games, comics, anime, and more.
 
Both fashion and cosplay revel in participating in a fantastical world that has been envisioned by an artist, such as fashion designer Rei Kawakubo’s Comme Des Garçons or video game designer Yoko Taro’s Nier: Automata. Both are primarily concerned with clothing and styling as means by which to participate and express one’s identity (assumed or otherwise).`


let text3_1 = 'Nowhere is this phenomena more pronounced than in role playing video games, like Final Fantasy or Deus Ex, where you are cast into the role of another person and placed in a world that offers a powerful vision of an alternate reality. It’s no surprise that both video game titles have collaborated with fashion designers whose aesthetics align.'
let text3_2 = 'In 2012, Prada and Arena Homme+ collaborated with Square Enix to dress characters from Final Fantasy XII-2, including lead heroine Lightning, with pieces from Prada’s Spring/Summer collection. Only two years later, Lightning was again cast by Nicholas Ghesquière as the face of Louis Vuitton’s Series 4 campaign, which took the character’s involvement with fashion from a print editorial to global ad campaign.'
let text3_3 = 'Last year, Final Fantasy XV collaborated with Vivienne Westwood, who designed the wedding gown for that game’s lead female character Lunafreya, and also has an in-game store facade that players can visit.'
let text3_4 = 'The most recent installment of video game franchise Deus Ex features techwear brand Acronym, with a custom-designed coat digitized into the game as part of the main character’s costume. Acronym’s hyper functional aesthetic and rigorously engineered approach to the research and development of their product are a natural fit in the game’s dystopian transhumanist setting. Of course, even in the video game world, buying Acronym gear probably didn’t come cheap.'

let text4_1 = 'A vital feature of social media is that we live in an era of image, where what we seem is more important than what we really are—a veritable society of the spectacle. Take for example post-internet artist Amalia Ulman, whose Instagram-based performance art underscores just how much we take the digital personas of others as verity. Or social media personality Lil Miquela, whose hyperreal existence makes followers question her very physical existence.'
let text4_2 = `The seams between reality and fiction become increasingly hazy.
Might all clothes just be some form of cosplay?`
let text4_3 = 'Life, after all, is the ultimate role-playing game.'
