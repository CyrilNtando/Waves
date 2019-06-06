import { ADD_ERROR, REMOVE_ERROR } from '../actions/actionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_ERROR:
      return {
        ...state,
        ...action.payload
      };
    case REMOVE_ERROR:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}
