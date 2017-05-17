import {
  USER_SIGNUP_SUCCESS,
  USER_LOGIN_SUCCESS,
} from '../routes/auth/modules/auth';

// reducer
const reducer = (state = [], action) => {
  switch(action.type) {
    case USER_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        accounts: action.data.user.accounts
      });
    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        accounts: action.data.user.accounts
      });
    default:
      return state
  }
  return state
}

export default reducer;
