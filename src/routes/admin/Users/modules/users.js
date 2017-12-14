import infosweepApi from 'services/infosweepApi'
import { receiveClientLogin } from 'routes/auth/modules/auth'

// action types
export const USERS_SUCCESS = 'USERS_SUCCESS'
export const USERS_FAILURE = 'USERS_FAILURE'
export const USERS_PENDING = 'USERS_PENDING'
export const BECOME_USER_FAILURE = 'BECOME_USER_FAILURE'
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE'

export const USERS_REQUEST = '/admin/api/users_search'
export const BECOME_USER_REQUEST = '/admin/api/users/become'
export const DELETE_USER_REQUEST = '/admin/api/users/'

// action
export const getAllUsers = (params, pageNum) => {
  const path = `${USERS_REQUEST}/${pageNum}`
  return dispatch => {
    dispatch(gettingAllUsers())
    return infosweepApi.get(path, params)
    .then(
      response => dispatch(receiveAllUsers(response.data))
    ).catch(
    error => dispatch(receiveAllUsersFailure(error))
    )
  }
}

export const becomeUser = params => {
  return dispatch => {
    return infosweepApi.patch(BECOME_USER_REQUEST, params)
    .then(response => dispatch(receiveClientLogin(response.data)))
    .catch(error => dispatch(receiveBecomeUserFailure(error)))
  }
}

export const deleteUser = id => {
  const path = `${DELETE_USER_REQUEST}/${id}/delete-client`
  return dispatch => {
    return infosweepApi.patch(path)
    .then(response => dispatch(receiveDeletedUserSuccess(response.data)))
    .catch(error => dispatch(receiveDeletedUserfailure(error)))
  }
}

export const gettingAllUsers = () => (
  {
    type: USERS_PENDING
  }
)

export const receiveAllUsers = data => (
  {
    type: USERS_SUCCESS,
    data
  }
)

export const receiveAllUsersFailure = error => (
  {
    type: USERS_FAILURE,
    error
  }
)

export const receiveBecomeUserFailure = error => (
  {
    type: BECOME_USER_FAILURE,
    error
  }
)

export const clearNotification = () => (
  {
    type: CLEAR_NOTIFICATION
  }
)

export const receiveDeletedUserSuccess = data => (
  {
    type: DELETE_USER_SUCCESS,
    data
  }
)

export const receiveDeletedUserfailure = error => (
  {
    type: DELETE_USER_FAILURE,
    error
  }
)

// reducer

const removeUser = (state, deletedUser) => (
  state.all.filter(user => user.id !== deletedUser.id)
)

const reducer = (state = {notification: {}}, action) => {
  switch (action.type) {
  case USERS_PENDING:
    return Object.assign({}, state, {
      isFetching: true
    })
  case USERS_SUCCESS:
    return Object.assign({}, state, {
      all: action.data.users,
      pagination: action.data.meta.pagination,
      isFetching: false
    })
  case USERS_FAILURE:
    return Object.assign({}, state, {
      notification: {
        message: action.error.response.data.errorMessage,
        status: 'danger'
      },
      isFetching: false
    })
  case BECOME_USER_FAILURE:
    return Object.assign({}, state, {
      notification: {
        message: action.error.response.data.errorMessage,
        status: 'danger'
      }
    })
  case DELETE_USER_SUCCESS:
    return Object.assign({}, state, {
      all: removeUser(state, action.data),
      notification: {
        message: 'User was successfully deleted',
        status: 'success'
      }
    })
  case DELETE_USER_FAILURE:
    return Object.assign({}, state, {
      notification: {
        message: action.error.response.data.errorMessage,
        status: 'danger'
      }
    })
  case CLEAR_NOTIFICATION:
    return Object.assign({}, state, {
      notification: {}
    })
  default:
    return state
  }
  return state
}

export default reducer
