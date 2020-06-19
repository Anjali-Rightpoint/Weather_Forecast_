import React from 'react';
import {Router, Scene, Modal} from 'react-native-router-flux';
import SplashScene from './components/SplashScene';
import WeatherList from './components/WeatherList';
import WeatherDetail from './components/WeatherDetail';
import SearchLocations from './components/SearchLocations';
import {Actions} from 'react-native-router-flux';
import {Feather} from 'react-native-vector-icons';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="modal" modal>
        <Scene key="root" hideNavBar>
          <Scene key="start">
            <Scene key="splash" component={SplashScene} hideNavBar />
          </Scene>
          <Scene key="main">
            <Scene
              rightTitle="Explore"
              onRight={() => Actions.search()}
              key="weather"
              component={WeatherList}
              title="Weather Forecast"
            />
            <Scene
              key="weatherDetail"
              component={WeatherDetail}
              title="Detailed Forecast"
              back="Back"
            />
          </Scene>
        </Scene>
        <Scene
          key="search"
          component={SearchLocations}
          title="Explore"
          back="Back"
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
