import clickadillyApi from 'services/clickadillyApi';
import { receiveClientLogin } from 'routes/auth/modules/auth';

// action types
export const USERS_SUCCESS = 'USERS_SUCCESS';
export const USERS_FAILURE = 'USERS_FAILURE';
export const USERS_PENDING = 'USERS_PENDING';

export const USERS_REQUEST = '/admin/api/users_search'
export const BECOME_USER_REQUEST = '/admin/api/users/become'

// action
export const getAllUsers = (params, pageNum) => {
  const path = `${USERS_REQUEST}/${pageNum}`
  return dispatch => {
    dispatch(gettingAllUsers())
    return clickadillyApi.get(path, params)
    .then(
      response => dispatch(receiveAllUsers(response.data))
    ).catch(
    error => dispatch(receiveAllUsersFailure(error))
    )
  }
}

export const becomeUser = params => {
  return dispatch => {
    return clickadillyApi.patch(BECOME_USER_REQUEST, params)
    .then(
      response => dispatch(receiveClientLogin(response.data))
    ).catch(
    //error => dispatch()
    error => console.log('become user error', error)
    )
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

// reducer
const reducer = (state={}, action) => {
  switch(action.type) {
    case USERS_PENDING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case USERS_SUCCESS:
      return Object.assign({}, state, {
        all: action.data.users,
        pagination: action.data.meta.pagination,
        isFetching: false
      });
    case USERS_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        isFetching: false
      });
    default:
      return state
  }
  return state
}

export default reducer;
