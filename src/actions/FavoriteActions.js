import {FETCH_FAVORITES, DELETE_FAVORITES} from './types';
import {AsyncStorage} from 'react-native';
import {fetchWeatherData} from './WeatherActions';

export const fetchFavorites = () => {
  return async dispatch => {
    try {
      const fav = await AsyncStorage.getItem('Favorites');
      const favorites = JSON.parse(fav);
      console.log('favorites action:', favorites);
      dispatch({type: FETCH_FAVORITES, payload: favorites});
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteFavorites = (item, index) => {
  return async dispatch => {
    try {
      const existingFavorites = await AsyncStorage.getItem('Favorites');
      let favoritesArray = JSON.parse(existingFavorites);
      favoritesArray.splice(index, 1);
      await AsyncStorage.setItem('Favorites', JSON.stringify(favoritesArray));
      const updatedFavorites = await AsyncStorage.getItem('Favorites');
      let updatedFavoritesArray = JSON.parse(updatedFavorites);
      dispatch({type: FETCH_FAVORITES, payload: updatedFavoritesArray});
    } catch (error) {
      console.log(error.message);
    }
  };
};
