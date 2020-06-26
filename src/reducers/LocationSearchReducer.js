import {SEARCH_LOCATIONS} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_LOCATIONS: {
      console.log('RESPONSE CAME HERE:', action.payload);
      return action.payload;
    }
    default:
      return INITIAL_STATE;
  }
};
