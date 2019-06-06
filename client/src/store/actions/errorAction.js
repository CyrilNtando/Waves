import { ADD_ERROR, REMOVE_ERROR } from './actionTypes';

export const addError = error => {
  return {
    type: ADD_ERROR,
    payload: error.error
  };
};
export const removeError = () => ({
  type: REMOVE_ERROR,
  payload: null
});
