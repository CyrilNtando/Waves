import axios from 'axios';
import { apiCall } from '../../services/MakeRequest';
import { addError, removeError } from './errorAction';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEM_USER,
  ON_SUCCESS_BUY_USER,
  UPDATE_DATA_USER,
  CLEAR_UPDATE_USER
} from './actionTypes';
import { USER_SERVER } from '../../components/utils/misc';
import { PRODUCT_SERVER } from '../../components/utils/misc';
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
    return axios
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

export async function addToCart(_id) {
  return (dispatch, getState) => {
    const state = getState();
    return axios.post(`${USER_SERVER}/addToCart?productId=${_id}`).then(res => {
      dispatch({
        type: ADD_TO_CART_USER,
        payload: {
          cart: res.data,
          state
        }
      });
    });
  };
}

export function getCartItems(cartItems, userCart) {
  return dispatch => {
    return axios
      .get(`${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`)
      .then(response => {
        userCart.forEach(currentItem => {
          response.data.forEach((k, i) => {
            if (currentItem.id === k._id) {
              response.data[i].quantity = currentItem.quantity;
            }
          });
        });
        dispatch({
          type: GET_CART_ITEMS_USER,
          payload: response.data
        });
      });
  };
}

export function removeCartItem(id) {
  return (dispatch, getState) => {
    const user = getState().user;
    return axios
      .get(`${USER_SERVER}/removeFromCart?_id=${id}`)
      .then(response => {
        response.data.cart.forEach(item => {
          response.data.cartDetail.forEach((k, i) => {
            if (item.id === k._id) {
              response.data.cartDetail[i].quantity = item.quantity;
            }
          });
        });
        dispatch({
          type: REMOVE_CART_ITEM_USER,
          payload: {
            cartDetail: response.data.cartDetail,
            user,
            cart: response.data.cart
          }
        });
      });
  };
}

export function onSuccessBuy(data) {
  return (dispatch, getState) => {
    const user = getState().user;
    return axios.post(`${USER_SERVER}/successBuy`, data).then(response => {
      dispatch({
        type: ON_SUCCESS_BUY_USER,
        payload: {
          ...response.data,
          user
        }
      });
    });
  };
}

export function updateUserData(dataToSubmit) {
  return dispatch => {
    return axios
      .post(`${USER_SERVER}/update_profile`, dataToSubmit)
      .then(response => {
        dispatch({
          type: UPDATE_DATA_USER,
          payload: response.data
        });
      });
  };
}

export function clearUpdateUser() {
  return {
    type: CLEAR_UPDATE_USER,
    payload: ''
  };
}
