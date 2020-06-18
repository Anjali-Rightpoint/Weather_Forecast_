import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import SplashScene from './components/SplashScene';
import WeatherList from './components/WeatherList';
import WeatherDetail from './components/WeatherDetail';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="start">
          <Scene key="splash" component={SplashScene} hideNavBar />
        </Scene>
        <Scene key="main">
          <Scene
            key="weather"
            component={WeatherList}
            title="Weather Forecast"
          />
          <Scene
            key="weatherDetail"
            component={WeatherDetail}
            title="Detailed Forecast"
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
