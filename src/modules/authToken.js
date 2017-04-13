import {
  USER_SIGNUP_SUCCESS,
  USER_LOGIN_SUCCESS
} from './auth';

const reducer = (state = {}, action) => {
  switch(action.type) {
    case USER_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        authToken: action.data.access_token
      });
    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        authToken: action.data.user.access_token
      });
    default:
      return state
  }
  return state
}

export default reducer;
