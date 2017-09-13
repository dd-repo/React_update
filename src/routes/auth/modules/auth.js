import clickadillyApi from 'services/clickadillyApi';
import { PAYMENT_SUCCESS } from 'routes/signup/Payment/modules/payment';
import { KEYWORD_SUCCESS } from 'routes/signup/Keywords/modules/keywords';

// constants
export const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
export const USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE';
export const USER_SIGNUP_POSTING = 'USER_SIGNUP_POSTING';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const ADMIN_LOGIN_SUCCESS = 'ADMIN_LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGIN_POSTING = 'USER_LOGIN_POSTING';

export const FORGOT_USER_PASSWORD_POSTING = 'FORGOT_USET_PASSWORD_POSTING';
export const FORGOT_USER_PASSWORD_SUCCESS = 'FORGOT_USER_PASSWORD_SUCCESS';
export const FORGOT_USER_PASSWORD_FAILURE = 'FORGOT_USER_PASSWORD_FAILURE';

export const PASSWORD_UPDATE_SUCCESS = 'PASSWORD_UPDATE_SUCCESS';
export const PASSWORD_UPDATE_FAILURE = 'PASSWORD_UPDATE_FAILURE';

export const USER_REMOVE_ERROR_MSG = 'USER_REMOVE_ERROR_MSG';
export const USER_LOGOUT = 'USER_LOGOUT'

export const PERMISSION_ERROR_MESSAGE = 'PERMISSION_ERROR_MESSAGE'
export const PERMISSIONS_MESSAGE_CLEAR = 'PERMISSIONS_MESSAGE_CLEAR'

const CLIENT_API = '/dashboard/api/v1/users';
export const SIGNUP_REQUEST = `${CLIENT_API}/sign-up/create`;
export const LOGIN_REQUEST = `${CLIENT_API}/sign-in`;
export const UPDATE_PASSWORD_REQUEST_WITH_TOKEN = `${CLIENT_API}/password/update`;
export const RESET_PASSWORD_REQUEST = `${CLIENT_API}/password/forgot`


//actions

export const postUserSignup = payload => {
  return dispatch => {
    dispatch(postingUserSignup())
    return clickadillyApi.post(SIGNUP_REQUEST, payload)
    .then(
      response => dispatch(receiveUserSignup(response.data)))
      .catch(
        error => dispatch(receiveUserSignupFailure(error))
      )
  }
}

export const postUserLogin = payload => {
  return dispatch => {
    dispatch(postingUserLogin())
    return clickadillyApi.post(LOGIN_REQUEST, { user: payload })
    .then(
      response =>
      response.data.user.group === 'backend'
        ?
          dispatch(receiveAdminLogin(response.data))
            :
              dispatch(receiveClientLogin(response.data))
    ).catch(
    error =>
    dispatch(receiveUserLoginFailure(error))
    )
  }
}

export const fetchUser = () => {
  return dispatch => {
    dispatch(postingUserLogin())
    return clickadillyApi.get(`${CLIENT_API}/users/get`)
    .then(
      response =>
      response.data.user.group === 'backend'
        ?
          dispatch(receiveAdminLogin(response.data))
            :
              dispatch(receiveClientLogin(response.data))
    ).catch(
    error =>
    dispatch(receiveUserLoginFailure(error))
    )
  }
}

export const updateUserPassword = payload => {
  return dispatch => {
    dispatch(postingUserLogin())
    return clickadillyApi.patch(UPDATE_PASSWORD_REQUEST_WITH_TOKEN, { user: payload })
    .then(
      response => dispatch(receiveClientLogin(response.data)))
      .catch(
        error =>
        dispatch(receiveUserLoginFailure(error)))
  }
}

export const updatePassword = password => {
  const payload = { user: { password } }
  return dispatch => {
    return clickadillyApi.patch(CLIENT_API, payload)
    .then( response => dispatch(receievePasswordUpdateSuccess()))
    .catch( error => dispatch(receievePasswordUpdateFailure()))
  }
}

export const resetUserPassword = payload => {
  return dispatch => {
    dispatch(postingForgotPassword(payload.email))
    return clickadillyApi.patch(RESET_PASSWORD_REQUEST, { user: payload })
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

export const receiveUserSignupFailure = error => (
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
);

export const receiveAdminLogin = data => (
  {
    type: ADMIN_LOGIN_SUCCESS,
    data
  }
);

export const receiveUserLoginFailure = error => (
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
);

export const receiveForgotPassword = () => (
  {
    type: FORGOT_USER_PASSWORD_SUCCESS
  }
);

export const receiveForgotPasswordFailure = (error) => (
  {
    type: FORGOT_USER_PASSWORD_FAILURE,
    error
  }
);

export const receievePasswordUpdateSuccess = () => (
  {
    type: PASSWORD_UPDATE_SUCCESS
  }
);

export const receievePasswordUpdateFailure = () => (
  {
    type: PASSWORD_UPDATE_FAILURE
  }
);

export const removeErrorMessage = () => (
  {
    type: USER_REMOVE_ERROR_MSG
  }
);

export const receivePermissionsError = error => (
  {
    type: PERMISSION_ERROR_MESSAGE,
    error
  }
)

export const clearPermissionsMessage = () => (
  {
    type: PERMISSIONS_MESSAGE_CLEAR
  }
)

export const logout = () => (
  {
    type: USER_LOGOUT
  }
);

// reducer
const setClient = (state, data) => {
  return (
    Object.assign({}, state, {
      id: data.user.id,
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      email: data.user.email,
      isFetching: false,
      account_id: data.user.accounts[0].id,
      role: data.user.role,
      group: data.user.group,
      authToken: data.auth_token,
      errorMessage: null
    })
  )
}

const setAdmin = (state, data) => {
  return (
    Object.assign({}, state, {
      id: data.user.id,
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      email: data.user.email,
      isFetching: false,
      role: data.user.role,
      group: data.user.group,
      authToken: data.auth_token,
      errorMessage: null,
      permissionsNotification: {}
    })
  )
}

const removeUser = state => {
  return (
    Object.assign({}, state, {
      id: null,
      first_name: null,
      last_name: null,
      email: null,
      role: null,
      group: null,
      account_id: null,
      authToken: null,
      errorMessage: null
    })
  )
}

const handleError = error => {
  const errorMessage = (
    error.response ?
      error.response.data.errorMessage
        :
          undefined
  )
  return errorMessage === 'expired' ? undefined : errorMessage
}

const reducer = (state = {}, action) => {
  switch(action.type) {
    case USER_SIGNUP_POSTING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case USER_SIGNUP_SUCCESS:
      return setClient(state, action.data)
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
      return setClient(state, action.data)
    case ADMIN_LOGIN_SUCCESS:
      return setAdmin(state, action.data)
    case USER_LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: handleError(action.error)
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
    case USER_REMOVE_ERROR_MSG:
      return Object.assign({}, state, {
        errorMessage: null
      })
    case PERMISSION_ERROR_MESSAGE:
      return Object.assign({}, state, {
        permissionsNotification: {
          message: action.error.data.errorMessage,
          status: 'danger'
        }
      })
    case PERMISSIONS_MESSAGE_CLEAR:
      return Object.assign({}, state, {
        permissionsNotification: {}
      })
    case USER_LOGOUT:
      return removeUser(state)
    default:
      return state
  }
  return state
}

export default reducer;

