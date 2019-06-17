import {
  GET_PRODUCT_BY_ARRIVAL,
  GET_PRODUCT_BY_SELL,
  GET_BRANDS,
  GET_WOODS,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  ADD_BRAND,
  ADD_WOOD,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL
} from '../actions/actionTypes';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCT_BY_SELL:
      return {
        ...state,
        bySell: action.payload
      };
    case GET_PRODUCT_BY_ARRIVAL:
      return { ...state, byArrival: action.payload };

    case GET_BRANDS:
      return {
        ...state,
        brands: action.payload
      };
    case ADD_BRAND:
      return {
        ...state,
        addedBrand: action.payload.success,
        brands: action.payload.brands
      };
    case GET_WOODS:
      return {
        ...state,
        woods: action.payload
      };
    case ADD_WOOD:
      return {
        ...state,
        addedWood: action.payload.success,
        woods: action.payload.woods
      };

    case GET_PRODUCTS_TO_SHOP:
      return {
        ...state,
        toShop: action.payload.articles,
        toShopSize: action.payload.size
      };
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        prodDetail: action.payload
      };
    case CLEAR_PRODUCT_DETAIL:
      return {
        ...state,
        prodDetail: action.payload
      };
    case ADD_PRODUCT:
      return {
        ...state,
        addedProduct: action.payload
      };

    case CLEAR_PRODUCT:
      return { ...state, addedProduct: action.payload };

    default:
      return state;
  }
}
