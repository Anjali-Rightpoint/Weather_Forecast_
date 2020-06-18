import React, {Component} from 'react';
import {Text, FlatList} from 'react-native';

class WeatherDetail extends Component {
  render() {
    return (
      <FlatList
        data={this.props.weatherInfo}
        keyExtractor={item => item.dt_txt}
        renderItem={({item}) => {
          console.log('item is', item);
          return <Text> Anj </Text>;
        }}
      />
    );
  }
}

export default WeatherDetail;

{
  /* <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Object.keys(this.props.dataaa)}
            keyExtractor={item => this.props.dataaa[item].time}
            renderItem={({item}) => {
              return (
                <ForecastData
                  weatherInfo={this.props.dataaa[item][1]}
                  completeInfo={this.props.dataaa[item]}
                />
              );
            }}
          /> */
}
