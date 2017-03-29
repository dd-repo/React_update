import axios from 'axios'
import { BASE_URL } from 'consts/apis'

// constants
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGIN_POSTING = 'USER_LOGIN_POSTING';
const LOGIN_REQUEST = `${BASE_URL}/users/sign-in`;

//actions
const request = (userInfo) => {
  return {
    method: 'post',
    url: LOGIN_REQUEST,
    headers: {'Content-Type': 'application/json'},
    data: JSON.stringify({ user: userInfo })
  }
}

export const postUserLogin = (userInfo) => {
  return dispatch => {
    dispatch(postingUserLogin(userInfo))
    return axios(request(userInfo))
    .then(
      response => dispatch(receiveUserLogin(response.data))
    ).catch(
    error =>
      dispatch(receiveUserLoginError(error.response.data.errorMessage))
    )
  }
}

const postingUserLogin = userInfo => (
  {
    type: USER_LOGIN_POSTING,
    userInfo
  }
);

const receiveUserLogin = userData => (
  {
    type: USER_LOGIN_SUCCESS,
    userData
  }
);

const receiveUserLoginError = error => (
  {
    type: USER_LOGIN_FAILURE,
    error
  }
);

// reducer
const reducer = (state = {}, action) => {
  switch(action.type) {
    case USER_LOGIN_POSTING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
      });
    case USER_LOGIN_FAILURE:
      return Object.assign({}, state, {
        idFetching: false,
        error: action.error
      });
    default:
      return state
  }
  return state
}

export default reducer;
