import { ADD_ERROR, REMOVE_ERROR } from '../actions/actionTypes';
const ERROR_STATE = {
  error: null
};
export default function(state = ERROR_STATE, action) {
  switch (action.type) {
    case ADD_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case REMOVE_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
}
