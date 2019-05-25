import { combineReducers } from 'redux';
import user from './UserReducer';
import error from './errorReducer';
const rootReducer = combineReducers({
  user: user,
  error: error
});

export default rootReducer;
