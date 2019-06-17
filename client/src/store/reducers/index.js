import { combineReducers } from 'redux';
import user from './UserReducer';
import error from './errorReducer';
import products from './products_reducer';
import site from './siteReducer';
const rootReducer = combineReducers({
  user: user,
  error: error,
  products: products,
  site: site
});

export default rootReducer;
