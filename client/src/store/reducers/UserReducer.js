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
} from '../actions/actionTypes';
const DEFAULT_USER_STATE = {
  isAuthenticated: false
};
export default function(state = DEFAULT_USER_STATE, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, ...action.payload };
    case REGISTER_USER:
      return { ...state, user: action.payload };
    case AUTH_USER:
      return {
        ...state,
        isAuthenticated: !!Object.keys(action.payload).length > 0,
        ...action.payload
      };

    case ADD_TO_CART_USER:
      return {
        ...state,
        ...action.payload.user,
        cart: action.payload.cart
      };

    case GET_CART_ITEMS_USER:
      return {
        ...state,
        cartDetail: action.payload
      };

    case REMOVE_CART_ITEM_USER:
      return {
        ...state,
        ...action.payload.user,
        cart: action.payload.cart,
        cartDetail: action.payload.cartDetail
      };
    case ON_SUCCESS_BUY_USER:
      return {
        ...state,
        successBuy: action.payload.success,
        ...action.payload.user,
        cart: action.payload.cart,
        cartDetail: action.payload.cartDetail
      };

    case UPDATE_DATA_USER:
      return {
        ...state,
        updateUser: action.payload
      };

    case CLEAR_UPDATE_USER:
      return {
        ...state,
        updateUser: action.payload
      };
    default:
      return state;
  }
}
