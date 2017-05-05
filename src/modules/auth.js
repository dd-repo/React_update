import BlitzApi from 'services/BlitzApi';
import { PAYMENT_SUCCESS } from 'routes/client/Payment/modules/payment';
import { KEYWORD_SUCCESS } from 'routes/client/Keywords/modules/keywords';

// constants
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE';
export const USER_SIGNUP_POSTING = 'USER_SIGNUP_POSTING';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const ADMIN_LOGIN_SUCCESS = 'ADMIN_LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGIN_POSTING = 'USER_LOGIN_POSTING';

export const FORGOT_USER_PASSWORD_POSTING = 'FORGOT_USET_PASSWORD_POSTING'
export const FORGOT_USER_PASSWORD_SUCCESS = 'FORGOT_USER_PASSWORD_SUCCESS'
export const FORGOT_USER_PASSWORD_FAILURE = 'FORGOT_USER_PASSWORD_FAILURE'
export const USER_LOGOUT = 'USER_LOGOUT';

const CLIENT_API = '/dashboard/api/v1/users';
export const SIGNUP_REQUEST = `${CLIENT_API}/sign-up/create`;
export const LOGIN_REQUEST = `${CLIENT_API}/sign-in`;
export const UPDATE_PASSWORD_REQUEST = `${CLIENT_API}/password/update`;
export const RESET_PASSWORD_REQUEST = `${CLIENT_API}/password/forgot`;


//actions

export const postUserSignup = payload => {
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

export const postUserLogin = payload => {
  return dispatch => {
    dispatch(postingUserLogin())
    return BlitzApi.post(LOGIN_REQUEST, { user: payload })
    .then(
      response =>
      response.data.user.role === 'admin'
        ?
          dispatch(receiveAdminLogin(response.data))
            :
              dispatch(receiveClientLogin(response.data))
    ).catch(
    error =>
    dispatch(receiveUserLoginError(error))
    )
  }
}

export const updateUserPassword = payload => {
  return dispatch => {
    dispatch(postingUserLogin())
    return BlitzApi.patch(UPDATE_PASSWORD_REQUEST, { user: payload })
    .then(
      response => dispatch(receiveUserLogin(response.data)))
      .catch(
        error =>
        dispatch(receiveUserLoginError(error)))
  }
}

export const resetUserPassword = payload => {
  return dispatch => {
    dispatch(postingForgotPassword(payload.email))
    return BlitzApi.patch(RESET_PASSWORD_REQUEST, { user: payload })
    .then(
      response =>
      dispatch(receiveForgotPassword()))
      .catch(
        error =>
        dispatch(receiveForgotPasswordFailure(error)))
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

export const receiveClientLogin = data => (
  {
    type: USER_LOGIN_SUCCESS,
    data
  }
)

export const receiveAdminLogin = data => (
  {
    type: ADMIN_LOGIN_SUCCESS,
    data
  }
)

export const receiveUserLoginError = error => (
  {
    type: USER_LOGIN_FAILURE,
    error
  }
);

export const postingForgotPassword = email => (
  {
    type: FORGOT_USER_PASSWORD_POSTING,
    email
  }
)

export const receiveForgotPassword = () => (
  {
    type: FORGOT_USER_PASSWORD_SUCCESS
  }
)

export const recieveForgotPasswordError = (error) => (
  {
    type: FORGOT_USER_PASSWORD_FAILURE,
    error
  }
)

// reducer
const setClient = (state, user) => {
  return (
    Object.assign({}, state, {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      isFetching: false,
      account_id: user.accounts[0].id,
      role: user.role,
      group: user.group,
    })
  )
}

const setAdmin = (state, user) => {
  return (
    Object.assign({}, state, {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      isFetching: false,
      role: user.role,
      group: user.group,
    })
  )
}

const reducer = (state = {}, action) => {
  switch(action.type) {
    case USER_SIGNUP_POSTING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case USER_SIGNUP_SUCCESS:
      return setClient(state, action.data.user)
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
      return setClient(state, action.data.user)
    case ADMIN_LOGIN_SUCCESS:
      return setAdmin(state, action.data.user)
    case USER_LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error.response.data.errorMessage
      });
    case FORGOT_USER_PASSWORD_POSTING:
      return Object.assign({}, state, {
        isFetching: true,
        email: action.email
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
