import {combineReducers} from 'redux';
import WeatherDataReducer from './WeatherDataReducer';
import LocationSearchReducer from './LocationSearchReducer';

export default combineReducers({
  weatherData: WeatherDataReducer,
  locationData: LocationSearchReducer,
});
