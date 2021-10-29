import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Router, Scene, Modal, Tabs, Stack} from 'react-native-router-flux';
import SplashScene from './components/SplashScene';
import WeatherList from './components/WeatherList';
import WeatherDetail from './components/WeatherDetail';
import SearchLocations from './components/SearchLocations';
import Favorites from './components/Favorites';
import {Actions} from 'react-native-router-flux';
// import {Feather} from 'react-native-vector-icons';

const RouterComponent = () => {
  searchTab = props => {
    let textColor = props.focused ? '#333333' : '#999999';
    const settingImageFocused = require('./images/search_selected.png');
    const settingImageUnfocused = require('./images/search_unselected.png');
    let settingImage = props.focused
      ? settingImageFocused
      : settingImageUnfocused;
    let borderColor = props.focused ? '#333333' : '#FFFFFF';
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderTopColor: borderColor,
          borderTopWidth: 4,
          padding: 20,
        }}>
        <Image source={settingImage} style={{width: 20, height: 20}} />
      </View>
    );
  };

  weatherTab = props => {
    let textColor = props.focused ? '#333333' : '#999999';
    const settingImageFocused = require('./images/weather_selected.png');
    const settingImageUnfocused = require('./images/weather_unselected.png');
    let settingImage = props.focused
      ? settingImageFocused
      : settingImageUnfocused;
    let borderColor = props.focused ? '#333333' : '#FFFFFF';
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderTopColor: borderColor,
          borderTopWidth: 4,
          padding: 20,
        }}>
        <Image source={settingImage} style={{width: 20, height: 20}} />
      </View>
    );
  };

  favoriteTab = props => {
    let textColor = props.focused ? '#333333' : '#999999';
    const favoriteImageFocused = require('./images/favorite_selected.png');
    const favoriteImageUnfocused = require('./images/favorite_unselected.png');
    let favoriteImage = props.focused
      ? favoriteImageFocused
      : favoriteImageUnfocused;
    let borderColor = props.focused ? '#333333' : '#FFFFFF';
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderTopColor: borderColor,
          borderTopWidth: 4,
          padding: 20,
        }}>
        <Image source={favoriteImage} style={{width: 20, height: 20}} />
      </View>
    );
  };

  return (
    <Router>
      <Scene key="root" hideNavBar={true}>
        <Scene key="start">
          <Scene key="splash" component={SplashScene} hideNavBar />
        </Scene>

        <Scene
          key="tabBar"
          tabs={true}
          tabBarStyle={styles.tabBar}
          default="Main">
          <Scene
            key="weather"
            component={WeatherList}
            hideNavBar={false}
            title="Weather Info"
            initial={true}
            icon={weatherTab}
          />

          <Scene
            key="search"
            component={SearchLocations}
            hideNavBar={false}
            title="Explore"
            icon={searchTab}
          />
          <Scene
            key="favorites"
            component={Favorites}
            hideNavBar={false}
            title="Favorites"
            icon={favoriteTab}
          />
        </Scene>
        <Scene
          key="weatherDetail"
          component={WeatherDetail}
          hideNavBar={false}
          title="Weather Detail"
        />
      </Scene>
    </Router>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 50,
    borderTopColor: 'darkgrey',
    borderTopWidth: 1,
    opacity: 0.98,
    justifyContent: 'space-between',
  },
});

export default RouterComponent;
