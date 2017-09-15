import clickadillyApi from 'services/clickadillyApi';
import getFullName from 'utils/fullName';
import { formatDate, createNotification } from 'utils';

// action types
export const RECEIVE_ADMIN_PENDING = 'RECEIVE_ADMIN_PENDING';
export const RECEIVE_ADMIN_SUCCESS = 'RECEIVE_ADMIN_SUCCESS';
export const RECEIVE_ADMIN_FAILURE = 'RECEIVE_ADMIN_FAILURE';
export const RECEIVE_ADMIN_UPDATE_SUCCESS = 'RECEIVE_ADMIN_UPDATE_SUCCESS';
export const RECEIVE_ADMIN_UPDATE_FAILURE = 'RECEIVE_ADMIN_UPDATE_FAILURE';

export const FETCH_ADMIN_REQUEST = '/admin/api/user';

// aciton
export const fetchAdmin = params => {
  return dispatch => {
    dispatch(gettingAdmin())
    return clickadillyApi.get(FETCH_ADMIN_REQUEST, params)
    .then( response => dispatch(receiveAdminSuccess(response.data)))
    .catch( error => dispatch(receiveAdminFailure(error)))
  }
}

export const updateAdminDetails = params => {
  const path = `/admin/api/users/${params.user.id}/update-backend-user`
  return dispatch => {
    return clickadillyApi.patch(path, params)
    .then( response => dispatch(receieveAdminUpdateSuccess(response.data)))
    .catch( error => dispatch(receiveAdminUpdateFailure(error)))
  }
}

export const gettingAdmin = () => (
  {
    type: RECEIVE_ADMIN_PENDING
  }
)

export const receiveAdminSuccess = data => (
  {
    type: RECEIVE_ADMIN_SUCCESS,
    data
  }
)

export const receiveAdminFailure = error => (
  {
    type: RECEIVE_ADMIN_FAILURE,
    error
  }
)

export const receieveAdminUpdateSuccess = data => (
  {
    type: RECEIVE_ADMIN_UPDATE_SUCCESS,
    data
  }
)

export const receiveAdminUpdateFailure = error => (
  {
    type: RECEIVE_ADMIN_UPDATE_FAILURE,
    error
  }
)

const setAdmin = (state, user) => (
  Object.assign({}, state, {
    id: user.id,
    first_name: user.first_name,
    fullName: getFullName(user),
    last_name: user.last_name,
    email: user.email,
    group: user.group,
    role: user.role,
    is_active: user.is_active,
    created_at: formatDate(user.created_at),
    active_until: formatDate(user.active_until),
    isFetching: false
  })
)

const initialState = {
  isFetching: true
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case RECEIVE_ADMIN_PENDING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_ADMIN_SUCCESS:
      return setAdmin(state, action.data)
    case RECEIVE_ADMIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      })
    case RECEIVE_ADMIN_UPDATE_SUCCESS:
      return setAdmin(state, action.data)
    default:
      return state;
  }
  return state
}

export default reducer;
