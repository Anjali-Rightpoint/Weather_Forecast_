import React, {Component} from 'react';
import {View} from 'react-native';
import {Button} from './common';
import LottieView from 'lottie-react-native';
import Animation from 'lottie-react-native';
import {exp} from 'react-native-reanimated';
import {Actions} from 'react-native-router-flux';

class SplashScene extends Component {
  componentDidMount() {
    this.animation.play();
    this.showHomeScreen();
  }

  showHomeScreen() {
    setTimeout(function() {
      Actions.main();
    }, 4000);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          source={require('../assets/weather.json')}
          style={{
            flex: 1,
            backgroundColor: '#53adcb',
          }}
        />
      </View>
    );
  }
}

export default SplashScene;
