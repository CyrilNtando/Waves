import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../actions/actionTypes';
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
    default:
      return state;
  }
}
