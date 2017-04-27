import BlitzApi from 'services/BlitzApi';
import { PAYMENT_SUCCESS } from 'routes/client/Payment/modules/payment';

// constants
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE';
export const USER_SIGNUP_POSTING = 'USER_SIGNUP_POSTING';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGIN_POSTING = 'USER_LOGIN_POSTING';
export const USER_LOGOUT = 'USER_LOGOUT';
export const SIGNUP_REQUEST = `/dashboard/api/v1/users/sign-up/create`;
export const LOGIN_REQUEST = `/dashboard/api/v1/users/sign-in`;

//actions
export const logoutUser = () => (
  {
    type: USER_LOGOUT
  }

)

export const postUserSignup = (payload) => {
  return dispatch => {
    dispatch(postingUserSignup())
    return BlitzApi.post(SIGNUP_REQUEST, { user: payload })
    .then(
    response => dispatch(receiveUserSignup(response.data)))
    .catch(
      error => dispatch(receiveUserSignupError(error))
    )
  }
}

export const postUserLogin = (payload) => {
  return dispatch => {
    dispatch(postingUserLogin())
    return BlitzApi.post(LOGIN_REQUEST, { user: payload })
    .then(
      response => dispatch(receiveUserLogin(response.data))
    ).catch(
    error =>
      dispatch(receiveUserLoginError(error))
    )
  }
}

export const postingUserSignup = data => (
  {
    type: USER_SIGNUP_POSTING
  }
);

export const receiveUserSignup = data => (
  {
    type: USER_SIGNUP_SUCCESS,
    data
  }
);

export const receiveUserSignupError = error => (
  {
    type: USER_SIGNUP_FAILURE,
    error
  }
);

export const postingUserLogin = () => (
  {
    type: USER_LOGIN_POSTING,
  }
);

export const receiveUserLogin = data => (
  {
    type: USER_LOGIN_SUCCESS,
    data
  }
)

export const receiveUserLoginError = error => (
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
    case USER_SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error.response.data.errorMessage
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
        isFetching: false,
        errorMessage: action.error.response.data.errorMessage
      });
    case USER_LOGOUT:
      return Object.assign({}, state, {
        id: undefined,
        access_token: undefined,
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
