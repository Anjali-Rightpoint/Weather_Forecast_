import React, {Component} from 'react';
import {
  Text,
  FlatList,
  View,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import TodayData from './TodayData';

class WeatherDetail extends Component {
  render() {
    const {containerStyle, listContainerStyle, imageStyle} = styles;
    return (
      <View>
        <View>
          <Text style={styles.headingStyle}>
            {this.props.weatherInfo[1].displayDay}
          </Text>
          <TodayData weatherModel={this.props.weatherInfo[1]} />
        </View>

        <FlatList
          style={containerStyle}
          data={this.props.weatherInfo}
          keyExtractor={item => item.dt_txt}
          renderItem={({item}) => {
            return (
              <View style={listContainerStyle}>
                <Text style={{color: 'white'}}> {item.displayTime} </Text>
                <Image source={{uri: item.imageUrl}} style={imageStyle} />
                <Text style={{color: 'white'}}> {item.currentTemp}&deg; </Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    paddingVertical: 20,
    alignSelf: 'center',
    backgroundColor: '#53adcb',
    width: '80%',
    height: '40%',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  headingStyle: {
    fontSize: 36,
    alignSelf: 'center',
    color: 'black',
    padding: 20,
  },
  headerContainerStyle: {
    backgroundColor: '#87cefa',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 10,
  },
  listContainerStyle: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '15%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    margin: 5,
  },
  imageStyle: {
    width: 30,
    height: 30,
  },
});

export default WeatherDetail;
