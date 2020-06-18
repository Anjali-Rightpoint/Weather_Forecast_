import {FETCH_WEATHER_DATA} from '../actions/types';

const INITIAL_STATE = {data: [], loading: true};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_WEATHER_DATA:
      return {data: action.payload, loading: false};
    default:
      return state;
  }
};
