import clickadillyApi from 'services/clickadillyApi';
import getFullName from 'utils/fullName';
import { formatDate } from 'utils/dateHelper';
import { CARDS_SUCCESS } from './cards';

// action types
export const USER_PENDING = 'USER_PENDING';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const USER_REQUEST = '/admin/api/user';
export const USER_UPDATE_REQUEST = '/admin/api/users';

// action
export const fetchUser = params => {
  return dispatch => {
    dispatch(gettingUser())
    return clickadillyApi.get(USER_REQUEST, params)
    .then( response => dispatch(receiveUserSuccess(response.data)))
    .catch( error => dispatch(receiveUserFailure(error)))
  }
}

export const updateUser = data => {
  const payload = { user : data }
  return dispatch => {
    return clickadillyApi.patch(`${USER_UPDATE_REQUEST}/${data.id}`, payload)
    .then( response => dispatch(updateUserSuccess(response.data)))
    .catch( error => dispatch(updateUserFailure(error)))
  }
}

export const gettingUser = () => (
  {
    type: USER_PENDING
  }
)

export const receiveUserSuccess = data => (
  {
    type: USER_SUCCESS,
    data
  }
)

export const receiveUserFailure = error => (
  {
    type: USER_FAILURE,
    error
  }
)

export const updateUserSuccess = data => (
  {
    type: UPDATE_USER_SUCCESS,
    data
  }
)

export const updateUserFailure = error => (
  {
    type: UPDATE_USER_FAILURE,
    error
  }
)

const setUser = (state, user) => (
  Object.assign({}, state, {
    id: user.id,
    first_name: user.first_name,
    fullName: getFullName(user),
    last_name: user.last_name,
    email: user.email,
    is_active: user.is_active,
    created_at: formatDate(user.created_at),
    active_until: formatDate(user.active_until)
  })
)

//reducer
const reducer = (state={isFetching: true}, action) => {
  switch(action.type) {
    case USER_PENDING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case USER_SUCCESS:
      return setUser(state, action.data)
    case UPDATE_USER_SUCCESS:
       return setUser(state, action.data)
     case CARDS_SUCCESS:
       return Object.assign({}, state, {
         isFetching: false
       })
    default:
      return state;
  }
  return state;
}

export default reducer
