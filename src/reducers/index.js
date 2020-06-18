import {combineReducers} from 'redux';
import WeatherDataReducer from './WeatherDataReducer';

export default combineReducers({
  weatherData: WeatherDataReducer,
});
