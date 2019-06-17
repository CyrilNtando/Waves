import axios from 'axios';
import {
  GET_PRODUCT_BY_ARRIVAL,
  GET_PRODUCT_BY_SELL,
  GET_BRANDS,
  GET_WOODS,
  ADD_WOOD,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  ADD_BRAND,
  CLEAR_PRODUCT,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL
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
export function getProductDetail(id) {
  return dispatch => {
    return axios
      .get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
      .then(response => {
        dispatch({
          type: GET_PRODUCT_DETAIL,
          payload: response.data[0]
        });
      });
  };
}

export function clearProductDetails() {
  return {
    type: CLEAR_PRODUCT_DETAIL,
    payload: ''
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
  return dispatch => {
    dispatch({
      type: CLEAR_PRODUCT,
      payload: ''
    });
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
export function addBrand(dataToSubmit, existingBrands) {
  const request = axios
    .post(`${PRODUCT_SERVER}/brand`, dataToSubmit)
    .then(response => {
      let brands = [...existingBrands, response.data.brand];

      return {
        success: response.data.success,
        brands
      };
    });

  return {
    type: ADD_BRAND,
    payload: request
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
export function addWood(dataToSubmit, existingWood) {
  const request = axios
    .post(`${PRODUCT_SERVER}/wood`, dataToSubmit)
    .then(response => {
      let woods = [...existingWood, response.data.wood];

      return {
        success: response.data.success,
        woods
      };
    });

  return {
    type: ADD_WOOD,
    payload: request
  };
}
