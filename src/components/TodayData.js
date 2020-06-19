import React, {Component} from 'react';
import {Card} from './common';
import {Text, View, Image, StyleSheet} from 'react-native';

class TodayData extends Component {
  render() {
    const {todayTempStyle, containerStyle, textStyle, headingStyle} = styles;

    return (
      <View style={containerStyle}>
        <Image
          source={{uri: this.props.weatherModel.imageUrl}}
          style={{width: 100, height: 100}}
        />
        <Text style={todayTempStyle}>
          {this.props.weatherModel.currentTemp}&deg;
        </Text>
        <Text style={textStyle}> {this.props.weatherModel.desc}</Text>
        <Text style={headingStyle}> Humidity </Text>
        <Text style={textStyle}> {this.props.weatherModel.humidity}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todayTempStyle: {
    fontSize: 60,
    fontWeight: '400',
    alignSelf: 'center',
  },
  containerStyle: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  textStyle: {
    fontSize: 20,
    marginBottom: 10,
  },
  headingStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  minMaxContainerStyle: {
    flexDirection: 'row',
    paddingTop: 10,
  },
});

export default TodayData;
