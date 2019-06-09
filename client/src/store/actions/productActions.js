import axios from 'axios';
import {
  GET_PRODUCT_BY_ARRIVAL,
  GET_PRODUCT_BY_SELL,
  GET_BRANDS,
  GET_WOODS,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT
} from './actionTypes';
import { addError } from './errorAction';
import { PRODUCT_SERVER } from '../../components/utils/misc';

export function getProductBySell(dispatch) {
  return dispatch => {
    axios
      .get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
      .then(response => {
        dispatch({
          type: GET_PRODUCT_BY_SELL,
          payload: response.data
        });
      });
  };
}
export function getProductByArrival() {
  return dispatch => {
    // article?sortBy=sold&order=desc&limit=4
    axios
      .get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
      .then(response => {
        dispatch({
          type: GET_PRODUCT_BY_ARRIVAL,
          payload: response.data
        });
      });
  };
}

export function getProductToShop(skip, limit, filters = [], previousSate = []) {
  const data = {
    limit,
    skip,
    filters
  };
  return dispatch => {
    axios
      .post(`${PRODUCT_SERVER}/shop`, data)
      .then(response => {
        let newState = [...previousSate, ...response.data.articles];
        dispatch({
          type: GET_PRODUCTS_TO_SHOP,
          payload: {
            articles: newState,
            size: response.data.size
          }
        });
      })
      .catch(error => console.log(error));
  };
}

export function addProduct(dataToSubmit) {
  return dispatch => {
    axios
      .post(`${PRODUCT_SERVER}/article`, dataToSubmit)
      .then(response => {
        dispatch({
          type: ADD_PRODUCT,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch(addError(error.response.data));
      });
  };
}

export function clearProduct() {
  return {
    type: CLEAR_PRODUCT,
    payload: ''
  };
}
/*****************
 * CATEGORIES
 * ************** */

export function getBrands() {
  return dispatch => {
    axios
      .get(`${PRODUCT_SERVER}/brands`)
      .then(response => {
        dispatch({
          type: GET_BRANDS,
          payload: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function getWoods() {
  return dispatch => {
    axios
      .get(`${PRODUCT_SERVER}/woods`)
      .then(response => {
        dispatch({
          type: GET_WOODS,
          payload: response.data
        });
      })
      .catch(error => {});
  };
}
