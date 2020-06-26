import React, {Component} from 'react';
import {Text, FlatList, View, Input, TouchableOpacity} from 'react-native';
import SearchItem from './SearchItem';
import {SearchBar} from 'react-native-elements';
import {searchLocations, fetchWeatherData} from '../actions';
import {connect, Provider} from 'react-redux';
import {FlatListItemSeparator} from './common';
import {Actions} from 'react-native-router-flux';

class SearchLocation extends Component {
  state = {
    search: '',
    searchWaiting: null,
  };

  moveToMainScreen = (handler, item) => {
    handler({lat: item._geoloc.lat, lng: item._geoloc.lng});
    Actions.pop();
  };

  constructor(props) {
    super(props);
    this.timeout = 0;
  }

  updateSearch(search) {
    this.setState({search});
  }

  performSearch(search) {
    this.setState({search});
    if (this.searchWaiting) {
      clearTimeout(this.searchWaiting);
    }
    this.searchWaiting = setTimeout(() => {
      this.searchWaiting = null;
      this.props.searchLocations({locationName: search});
    }, 1000);
  }

  renderSeparator = () => {
    return <FlatListItemSeparator />;
  };

  prepareSearchCityName(administrative, country) {
    let cityName = '';
    console.log('administrative name is', administrative);
    administrative.forEach(item => (cityName = item + ', ' + cityName));
    console.log('City name is', cityName);
    return cityName + country;
  }

  render() {
    const {search} = this.state;

    return (
      <View>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this.performSearch.bind(this)}
          value={search}
          lightTheme
        />

        <FlatList
          data={this.props.locations}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => this.moveToMainScreen(this.props.handler, item)}>
                <SearchItem>
                  {this.prepareSearchCityName(
                    item.administrative,
                    item.country,
                  )}
                </SearchItem>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  var locationData = [];
  locationData =
    state.locationData.hits &&
    state.locationData.hits.filter(function(item) {
      console.log('Item is --->', item);
      return item._highlightResult.locale_names[0].matchedWords.length != 0;
    });
  console.log(locationData);
  return {locations: locationData};
};

export default connect(
  mapStateToProps,
  {fetchWeatherData, searchLocations},
)(SearchLocation);
