import { USER_SIGNUP_SUCCESS } from './auth';
import { USER_LOGIN_SUCCESS } from './auth';
// reducer

const reducer = (state = [], action) => {
  switch(action.type) {
    case USER_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        accounts: action.data.accounts
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
