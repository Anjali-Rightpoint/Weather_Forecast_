import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Card} from './common';
import {Actions} from 'react-native-router-flux';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

class ForecastData extends Component {
  onRowPress() {
    Actions.weatherDetail({
      weatherInfo: this.props.completeInfo,
      city: this.props.city,
      title: this.props.city,
    });
  }
  render() {
    const {
      dayStyle,
      timeStyle,
      maxContainerStyle,
      tempStyle,
      minTempStyle,
      maxTempStyle,
    } = styles;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <Card>
          <Text style={dayStyle}>
            {' '}
            {this.props.weatherInfo.displayDay} ,{' '}
            {this.props.weatherInfo.displayDate}
          </Text>
          <Text style={timeStyle}> {this.props.weatherInfo.displayTime}</Text>
          <Image
            source={{uri: this.props.weatherInfo.imageUrl}}
            style={{
              width: 60,
              height: 60,
            }}
          />
          <Text style={tempStyle}>
            {this.props.weatherInfo.currentTemp}&deg;
          </Text>
          <View style={maxContainerStyle}>
            <Text style={minTempStyle}>
              {this.props.weatherInfo.minTemp}&deg;
            </Text>
            <Text style={maxTempStyle}>
              {this.props.weatherInfo.maxTemp}&deg;
            </Text>
          </View>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  dayStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 10,
  },

  timeStyle: {
    fontSize: 14,
    color: 'white',
  },
  maxContainerStyle: {
    flexDirection: 'row',
    paddingTop: 10,
    flex: 1,
  },
  tempStyle: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  minTempStyle: {
    fontSize: 12,
    color: 'gray',
  },
  maxTempStyle: {
    fontSize: 12,
    color: 'white',
  },
});

export default ForecastData;
