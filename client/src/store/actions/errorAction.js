import { ADD_ERROR, REMOVE_ERROR } from './actionTypes';

export const addError = error => {
  console.log(error);
  return {
    type: ADD_ERROR,
    payload: error
  };
};
export const removeError = () => ({
  type: REMOVE_ERROR
});
