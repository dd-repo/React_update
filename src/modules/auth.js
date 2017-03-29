import axios from 'axios'
import { BASE_URL } from 'consts/apis'

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

const request = (userInfo, userRequest) => {
  console.log('request', userRequest)
  return {
    method: 'post',
    url: userRequest,
    headers: {'Content-Type': 'application/json'},
    data: JSON.stringify({ user: userInfo })
  }
}

export const postUserSignup = (userInfo) => {
  return dispatch => {
    dispatch(postingUser(userInfo))
    return axios(request(userInfo, SIGNUP_REQUEST))
    .then(
      //response => console.log('response', response)
      response => dispatch(receiveUser(response.data))
    ).catch(
    error =>
      dispatch(receiveUserError(error.response.data.errorMessage))
    )
  }
}

export const postUserLogin = (userInfo) => {
  return dispatch => {
    dispatch(postingUserLogin(userInfo))
    return axios(request(userInfo, LOGIN_REQUEST))
    .then(
      //response => console.log('response', response)
      response => dispatch(receiveUserLogin(response.data))
    ).catch(
    error =>
      dispatch(receiveUserLoginError(error.response.data.errorMessage))
    )
  }
}

const postingUser = userInfo => (
  {
    type: USER_POSTING,
    userInfo
  }
);

const receiveUser = userData => (
  {
    type: USER_SUCCESS,
    userData
  }
);

const receiveUserError = error => (
  {
    type: USER_FAILURE,
    error
  }
);

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
    case USER_SIGNUP_POSTING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case USER_SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        id: action.userData.id,
        first_name: action.userData.first_name,
        last_name: action.userData.last_name,
        email: action.userData.email,
        access_token: action.userData.access_token,
        isFetching: false,
        account_id: action.userData.accounts[0].id
      });
    case USER_LOGIN_POSTING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        id: action.userData.user.id,
        first_name: action.userData.user.first_name,
        last_name: action.userData.user.last_name,
        email: action.userData.user.email,
        access_token: action.userData.user.access_token,
        isFetching: false,
        account_id: action.userData.accounts[0].id
      });
    case USER_LOGIN_FAILURE:
      return Object.assign({}, state, {
        idFetching: false,
        error: action.error
      });
    case USER_LOGOUT:
      return Object.assign({}, state, {
        id: undefined,
        access_token: undefined
      });
    default:
      return state
  }
  return state
}

export default reducer;
