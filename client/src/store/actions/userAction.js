import axios from 'axios';
import { apiCall } from '../../services/MakeRequest';
import { addError, removeError } from './errorAction';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './actionTypes';
import { USER_SERVER } from '../../components/utils/misc';
export function logInUser(dataToSubmit) {
  return dispatch => {
    axios
      .post(`${USER_SERVER}/login`, dataToSubmit)
      .then(response => {
        dispatch({
          type: LOGIN_USER,
          payload: response.data
        });
      })
      .catch(err => {
        return dispatch(addError(err.response.data));
      });
  };
}
export function registerUser(dataToSubmit) {
  return dispatch => {
    apiCall('post', `${USER_SERVER}/register`, dataToSubmit)
      .then(response =>
        dispatch({
          type: REGISTER_USER,
          payload: response.data
        })
      )
      .catch(err => console.log(err));
  };
}

export function auth() {
  return dispatch => {
    axios
      .get(`${USER_SERVER}/auth`)

      .then(response =>
        dispatch({
          type: AUTH_USER,
          payload: response.data
        })
      )
      .catch(error => {
        dispatch({
          type: AUTH_USER,
          payload: {}
        });
      });
  };
}

export function logOutUser() {
  return dispatch => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      dispatch({
        type: AUTH_USER,
        payload: {}
      });
    });
  };
}
