import { combineReducers } from 'redux';
import user from './UserReducer';
import error from './errorReducer';
import products from './products_reducer';
const rootReducer = combineReducers({
  user: user,
  error: error,
  products: products
});

export default rootReducer;
