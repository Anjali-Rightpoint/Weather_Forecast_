import {FETCH_FAVORITES} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_FAVORITES: {
      console.log('FAVorites RESPONSE CAME HERE:', action.payload);
      return action.payload;
    }
    default:
      return INITIAL_STATE;
  }
};
