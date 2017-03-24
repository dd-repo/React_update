import axios from 'axios'
import { BASE_URL } from 'consts/apis'

// constants
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';
export const USER_POSTING = 'USER_POSTING';
const SIGNUP_REQUEST = `${BASE_URL}/users/sign-up/create`;
const LOGIN_REQUEST = `${BASE_URL}/users/sign-in`;
const LOGOUT_REQUEST = `${BASE_URL}/users/sign-out`

//actions
export const logoutUser = () => {
  return axios.delete(LOGOUT_REQUEST)
  .then(
  ).catch(
  error =>
    console.log('error', error)
  )
}

const request = (userInfo, selector) => {
  const urlRequest = selector === 'signup' ? SIGNUP_REQUEST : LOGIN_REQUEST
  return {
    method: 'post',
    url: urlRequest,
    headers: {'Content-Type': 'application/json'},
    data: JSON.stringify({ user: userInfo })
  }
}

export const postUser = (userInfo, selector) => {
  return dispatch => {
    dispatch(postingUser(userInfo))
    return axios(request(userInfo, selector))
    .then(
      response => dispatch(receiveUser(response.data))
    ).catch(
    error =>
      dispatch(receiveUserError(error.response.data.errorMessage))
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

// reducer
const reducer = (state = {}, action) => {
  switch(action.type) {
    case USER_POSTING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case USER_SUCCESS:
      return Object.assign({}, state, {
        id: action.userData.id,
        first_name: action.userData.first_name,
        last_name: action.userData.last_name,
        email: action.userData.email,
        access_token: action.userData.access_token,
        isFetching: false,
        account_id: action.userData.accounts[0].id
      });
    default:
      return state
  }
  return state
}

export default reducer;
