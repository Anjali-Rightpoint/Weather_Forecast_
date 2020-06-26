import axios from 'axios';
import {SEARCH_LOCATIONS} from './types';

export const searchLocations = ({locationName}) => {
  const headers = {
    'X-Algolia-Application-Id': 'plNW8IW0YOIN',
    'X-Algolia-API-Key': '029766644cb160efa51f2a32284310eb',
  };

  return dispatch => {
    axios
      .post(
        'https://places-dsn.algolia.net/1/places/query',
        {
          query: locationName,
          language: 'en-US',
          countries: 'in',
          type: 'city',
        },
        {headers: headers},
      )
      .then(response => {
        console.log('Data fetched', response.data);
        dispatch({type: SEARCH_LOCATIONS, payload: response.data});
      });
  };
};
