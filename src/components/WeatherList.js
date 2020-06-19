import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Spinner, Header} from './common';
// import {ScrollView} from 'react-native-gesture-handler';
import {fetchWeatherData} from '../actions';
import {connect, Provider} from 'react-redux';
import TodayData from './TodayData';
import ForecastData from './ForecastData';
import {Actions} from 'react-native-router-flux';

class WeatherList extends Component {
  state = {showLoader: false};
  componentWillMount() {
    this.props.fetchWeatherData();
  }

  renderLoader() {
    return <Spinner size="large" />;
  }

  render() {
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
            keyExtractor={item => this.props.dataaa[item].time}
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

const mapStateToProps = state => {
  const weatherData = state.weatherData.data.list;
  const city = state.weatherData.data.city && state.weatherData.data.city.name;
  var weatherModelArray = [];

  if (weatherData != undefined) {
    weatherModelArray = weatherData.map(
      element =>
        new WeatherModel(
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

function WeatherModel(
  date,
  currentTemp,
  humidity,
  desc,
  imageId,
  minTemp,
  maxTemp,
) {
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  this.date = date.split(' ')[0];
  this.time = date.split(' ')[1];
  this.currentTemp = currentTemp;
  this.humidity = humidity;
  this.desc = desc;
  this.imageUrl = 'http://openweathermap.org/img/wn/' + imageId + '@2x.png';
  this.minTemp = minTemp;
  this.maxTemp = maxTemp;
  this.displayDay = days[new Date(this.date).getDay()];
  this.displayDate =
    new Date(this.date).getDate().toString() +
    ' ' +
    monthNames[new Date(this.date).getMonth()];

  this.displayTime = displayDateTime(date);
}

function displayDateTime(date1) {
  var date = new Date(date1);
  var hours =
    Number(date.getHours()) > 12
      ? Number(date.getHours()) - 12
      : Number(date.getHours());
  var am_pm = date.getHours() >= 12 ? 'PM' : 'AM';
  hours = hours < 10 ? '0' + hours : hours;
  var minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var time = hours.toString() + ':' + minutes.toString() + am_pm;
  return time;
}
