import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';

import {fetchFavorites, deleteFavorites} from '../actions';
import {connect, Provider} from 'react-redux';
// import {FlatListItemSeparator} from './common';
// import {HorizontalCard} from '../components/common';
import {Actions} from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'react-native-swipeout';
import FavoriteListItem from '../components/FavoriteListItem';

class Favorites extends Component {
  componentDidMount() {
    this.props.navigation.addListener('didFocus', this.onScreenFocus);
  }

  onScreenFocus = () => {
    this.props.fetchFavorites();
  };

  moveToMainScreen = item => {
    console.log('Action called');
    AsyncStorage.setItem('lat', item.lat);
    AsyncStorage.setItem('lng', item.lng);
    Actions.weather();
  };

  deleteItem(item, index) {
    console.log('Item to delete', item), index;
    this.props.deleteFavorites(item, index);
  }

  render() {
    return (
      <FlatList
        data={this.props.favLocations}
        keyExtractor={item => {
          item.lat;
        }}
        renderItem={({item, index}) => {
          return (
            <FavoriteListItem
              item={item}
              index={index}
              onPress={() => this.moveToMainScreen(item)}
              onDelete={(itemToDelete, index) =>
                this.deleteItem(itemToDelete, index)
              }
            />
          );
        }}
      />
    );
  }
}

mapStateToProps = state => {
  console.log('this is map state to props', state.favorites);
  const favLocations = state.favorites;
  return {favLocations};
};

export default connect(
  mapStateToProps,
  {fetchFavorites, deleteFavorites},
)(Favorites);
