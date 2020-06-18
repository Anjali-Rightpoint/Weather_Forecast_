import {FETCH_WEATHER_DATA} from './types';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';

export const fetchWeatherData = () => {
  return dispatch => {
    axios
      .get(
        'https://api.openweathermap.org/data/2.5/forecast?q=Jaipur&APPID=751d80f6c314139192ffcb62c107e654&units=metric',
      )
      .then(response => {
        console.log('Data fetched', response.data);
        dispatch({type: FETCH_WEATHER_DATA, payload: response.data});
      });
  };
};
