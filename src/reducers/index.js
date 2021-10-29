import {combineReducers} from 'redux';
import WeatherDataReducer from './WeatherDataReducer';
import LocationSearchReducer from './LocationSearchReducer';
import FavoriteReducer from './FavoriteReducer';

export default combineReducers({
  weatherData: WeatherDataReducer,
  locationData: LocationSearchReducer,
  favorites: FavoriteReducer,
});
