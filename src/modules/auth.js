import axios from 'axios';
import { BASE_URL } from 'consts/apis';
import { PAYMENT_SUCCESS } from './payment';

// constants
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE';
export const USER_SIGNUP_POSTING = 'USER_SIGNUP_POSTING';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGIN_POSTING = 'USER_LOGIN_POSTING';
export const USER_LOGOUT = 'USER_LOGOUT';
const SIGNUP_REQUEST = `${BASE_URL}/users/sign-up/create`;
const LOGIN_REQUEST = `${BASE_URL}/users/sign-in`;

//actions
export const logoutUser = () => (
  {
    type: USER_LOGOUT
  }

)

const request = (data, userRequest) => {
  return {
    method: 'post',
    url: userRequest,
    headers: {'Content-Type': 'application/json'},
    data: JSON.stringify({ user: data })
  }
}

export const postUserSignup = (data) => {
  return dispatch => {
    dispatch(postingUserSignup(data))
    return axios(request(data, SIGNUP_REQUEST))
    .then(
      response => dispatch(receiveUserSignup(response.data))
    ).catch(
    error =>
      dispatch(receiveUserSignupError(error))
    )
  }
}

export const postUserLogin = (data) => {
  return dispatch => {
    dispatch(postingUserLogin())
    return axios(request(data, LOGIN_REQUEST))
    .then(
      response => dispatch(receiveUserLogin(response.data))
    ).catch(
    error =>
      dispatch(receiveUserLoginError(error.response))
    )
  }
}

const postingUserSignup = data => (
  {
    type: USER_SIGNUP_POSTING,
    data
  }
);

const receiveUserSignup = data => (
  {
    type: USER_SIGNUP_SUCCESS,
    data
  }
);

const receiveUserSignupError = error => (
  {
    type: USER_SIGNUP_FAILURE,
    error
  }
);

const postingUserLogin = () => (
  {
    type: USER_LOGIN_POSTING,
  }
);

const receiveUserLogin = data => (
  {
    type: USER_LOGIN_SUCCESS,
    data
  }
)

const receiveUserLoginError = error => (
  {
    type: USER_LOGIN_FAILURE,
    error
  }
);

// reducer
const reducer = (state = {}, action) => {
  switch(action.type) {
    case USER_SIGNUP_POSTING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case USER_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        id: action.data.id,
        first_name: action.data.first_name,
        last_name: action.data.last_name,
        email: action.data.email,
        access_token: action.data.access_token,
        isFetching: false,
        account_id: action.data.accounts[0].id,
        role: action.data.role
      });
    case USER_LOGIN_POSTING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        id: action.data.user.id,
        first_name: action.data.user.first_name,
        last_name: action.data.user.last_name,
        email: action.data.user.email,
        access_token: action.data.user.access_token,
        isFetching: false,
        account_id: action.data.user.accounts[0].id,
        role: action.data.user.role
      });
    case USER_LOGIN_FAILURE:
      return Object.assign({}, state, {
        idFetching: false,
        error: action.error.data.errorMessage
      });
    case USER_LOGOUT:
      return Object.assign({}, state, {
        id: undefined,
        access_token: undefined
      });
    case PAYMENT_SUCCESS:
      return Object.assign({}, state, {
        role: action.user.role
      });
    default:
      return state
  }
  return state
}

export default reducer;
