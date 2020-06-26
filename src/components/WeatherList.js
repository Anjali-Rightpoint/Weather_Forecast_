import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  PermissionsAndroid,
} from 'react-native';
import {Spinner, Header} from './common';
import {fetchWeatherData} from '../actions';
import {connect, Provider} from 'react-redux';
import TodayData from './TodayData';
import ForecastData from './ForecastData';
import {Actions} from 'react-native-router-flux';
import WeatherModel from '../models/WeatherModel';
import Geolocation from '@react-native-community/geolocation';

class WeatherList extends Component {
  state = {
    showLoader: false,
    coord: {lat: '30.3165', lng: '78.0322'},
  };

  getCurrentLocation() {
    Geolocation.getCurrentPosition(
      position => {
        console.log('Position is:', position);
        this.setState({
          coord: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      },
      error => {
        console.log('map error: ', error);
        console.log(error.code, error.message);
      },
    );
  }

  fetchLocation() {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      this.getCurrentLocation();
    } else {
      console.log('Platform', Platform.OS);
      const granted = PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted) {
        console.log('You can use the ACCESS_FINE_LOCATION');
        this.getCurrentLocation();
      } else {
        console.log('ACCESS_FINE_LOCATION permission denied');
      }
      // let granted = PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      //   {
      //     title: 'App Geolocation Permission',
      //     message: "App needs access to your phone's location.",
      //   },
      // );
      // console.log('Value of granted', granted);
      // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //   this.getCurrentLocation();
      // } else {
      //   console.log('Location permission not granted!!!!');
      // }
    }
  }

  componentDidMount() {
    this.fetchLocation();
    this.props.navigation.setParams({handler: this.handler.bind(this)});

    this.props.navigation.addListener('didFocus', payload => {
      this.props.fetchWeatherData(this.state.coord);
    });
  }
  renderLoader() {
    return <Spinner size="large" />;
  }

  handler(coords) {
    console.log('came till here', this.state);
    console.log('came till here coords', coords);
    this.setState({coord: coords});
  }

  render() {
    console.log('called with', this.props);
    if (this.props.loading) {
      return <Spinner size="large" />;
    } else {
      return (
        <ScrollView>
          <View style={styles.headerContainerStyle}>
            <Text style={styles.headingStyle}> {this.props.city} </Text>
          </View>
          <TodayData weatherModel={this.props.todayWeather[0]} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Object.keys(this.props.dataaa)}
            keyExtractor={item => this.props.dataaa[item].id}
            renderItem={({item}) => {
              return (
                <ForecastData
                  weatherInfo={this.props.dataaa[item][1]}
                  completeInfo={this.props.dataaa[item]}
                  city={this.props.city}
                />
              );
            }}
          />
        </ScrollView>
      );
    }
  }
}
WeatherList.navigationOptions = ({navigation}) => {
  return {
    title: 'Weather Forecast',
    headerRight: (
      <Button
        title="Explore"
        onPress={() =>
          Actions.search({
            handler: navigation.getParam('handler'),
          })
        }
      />
    ),
  };
};

const mapStateToProps = state => {
  const weatherData = state.weatherData.data.list;
  const city = state.weatherData.data.city && state.weatherData.data.city.name;
  var weatherModelArray = [];

  if (weatherData != undefined) {
    weatherModelArray = weatherData.map(
      element =>
        new WeatherModel(
          element.dt,
          element.dt_txt,
          element.main.temp,
          element.main.humidity,
          element.weather[0].main,
          element.weather[0].icon,
          element.main.temp_min,
          element.main.temp_max,
        ),
    );
  }
  console.log('id:', weatherModelArray);
  var dataaa = {};
  var todayWeather = {};
  var forecastedWeather = [];
  weatherModelArray &&
    weatherModelArray.forEach(element => {
      if (dataaa[element.date] == undefined) {
        dataaa[element.date] = [];
      }
      dataaa[element.date].push(element);
    });

  let currentDate = new Date().toISOString().slice(0, 10);

  Object.keys(dataaa).forEach(function(key) {
    if (key == currentDate) {
      todayWeather = dataaa[key];
      delete dataaa[key];
    }
  });
  return {todayWeather, dataaa, city, loading: state.weatherData.loading};
};

const styles = StyleSheet.create({
  headingStyle: {
    fontSize: 48,
    alignSelf: 'center',
    color: 'white',
  },
  headerContainerStyle: {
    backgroundColor: '#87cefa',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 10,
  },
});

export default connect(
  mapStateToProps,
  {fetchWeatherData},
)(WeatherList);
