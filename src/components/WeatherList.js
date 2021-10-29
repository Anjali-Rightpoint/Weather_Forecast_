import React, {Component} from 'react';

import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  AsyncStorage,
  Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Spinner, Header} from './common';
import {fetchWeatherData} from '../actions';
import {connect, Provider} from 'react-redux';
import TodayData from './TodayData';
import ForecastData from './ForecastData';
import {Actions} from 'react-native-router-flux';
import WeatherModel from '../models/WeatherModel';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    }
  }

  async componentWillReceiveProps() {
    const latitude = await AsyncStorage.getItem('lat');
    const longitude = await AsyncStorage.getItem('lng');
    if (
      latitude !== this.state.coord.lat ||
      longitude !== this.state.coord.lng
    ) {
      console.log('new props recieved2', latitude, longitude);
      console.log('New obj:', {lat: latitude, lng: longitude});
      this.setState({coord: {lat: latitude, lng: longitude}});
      console.log('Updated state', this.state);
      this.props.fetchWeatherData(this.state.coord);
    } else {
      // Need to add some handling here
    }
  }

  async componentWillUpdate() {
    const latitude = await AsyncStorage.getItem('lat');
    const longitude = await AsyncStorage.getItem('lng');
    if (
      latitude !== this.state.coord.lat ||
      longitude !== this.state.coord.lng
    ) {
      console.log('new props recieved2', latitude, longitude);
      console.log('New obj:', {lat: latitude, lng: longitude});
      this.setState({coord: {lat: latitude, lng: longitude}});
      console.log('Updated state', this.state);
      this.props.fetchWeatherData(this.state.coord);
    } else {
      console.log('This is a TADADADDADDDDDD');
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

  async saveFavorites() {
    let favoriteLocation = {
      city: this.props.city,
      lat: this.state.coord.lat,
      lng: this.state.coord.lng,
    };

    const existingFavorites = await AsyncStorage.getItem('Favorites');

    let newFavorite = JSON.parse(existingFavorites);
    if (!newFavorite) {
      newFavorite = [];
    }
    console.log(favoriteLocation);

    const elementsIndex = newFavorite.findIndex(
      element => element.city == this.props.city,
    );
    if (elementsIndex == -1) {
      newFavorite.push(favoriteLocation);
      await AsyncStorage.setItem('Favorites', JSON.stringify(newFavorite))
        .then(() => {
          console.log('saved succeffully');
        })
        .catch(() => {
          console.log('some error occurred');
        });
    } else {
      Alert.alert('Alert', 'This is already added to favorites', [
        {
          text: 'Okay',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ]);
    }
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

          <Button
            icon={<Icon name="heart-o" size={20} color="white" />}
            title="Add To Favorites"
            onPress={this.saveFavorites.bind(this)}
            iconRight={true}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}
          />

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
// WeatherList.navigationOptions = ({navigation}) => {
//   return {
//     title: 'Weather Forecast',
//     headerRight: (
//       <Button
//         title="Explore"
//         onPress={() =>
//           Actions.search({
//             handler: navigation.getParam('handler'),
//           })
//         }
//       />
//     ),
//   };
//};

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
