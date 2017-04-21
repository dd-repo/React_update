//import { default as callApi } from 'services/clientApi';
import BlitzApi from 'services/BlitzApi';

// action types
export const ADMIN_REQUESTED_REMOVALS_PENDING = 'ADMIN_REQUESTED_REMOVALS_PENDING';
export const ADMIN_REQUESTED_REMOVALS_SUCCESS = 'ADMIN_REQUESTED_REMOVALS_SUCCESS';
export const ADMIN_REQUESTED_REMOVALS_FAILURE = 'ADMIN_REQUESTED_REMOVALS_FAILURE';
export const UPDATING_STATUS = 'UPDATING_STATUS';
export const UPDATING_STATUS_SUCCESS = 'UPDATING_STATUS_SUCCESS';
export const UPDATE_STATUS_FAILURE = 'UPDATE_STATUS_FAILURE';
export const ADMIN_REMOVAL_REQUEST_PATH = '/admin/api/monitoring-requests';

// actions
export const getRemovalsRequested = () => {
  return dispatch => {
    dispatch(gettingRemovalRequests())
    return BlitzApi.get(ADMIN_REMOVAL_REQUEST_PATH)
    .then(
      response => dispatch(receivedRemovalRequests(response.data))
    ).catch(
    error => dispatch(rejectedRemovalRequests(error))
    )
  }
}

export const updateStatus = payload => {
  return dispatch => {
    dispatch(updatingStatus())
    return BlitzApi.patch(ADMIN_REMOVAL_REQUEST_PATH, payload)
    .then(
      response => dispatch(receivedUpdateStatus())
    ).catch(
    //error => dispatch(rejectedUpdateStatus(error))
    error => console.log('error', error.response)

    )
  }
}

export const gettingRemovalRequests = () => (
  {
    type: ADMIN_REQUESTED_REMOVALS_PENDING
  }
)

export const receivedRemovalRequests = removals => (
  {
    type: ADMIN_REQUESTED_REMOVALS_SUCCESS,
    removals
  }
)

export const rejectedRemovalRequests = error => (
  {
    type: ADMIN_REQUESTED_REMOVALS_FAILURE,
    error
  }
)

export const updatingStatus = () => (
  {
    type: UPDATING_STATUS
  }
)

export const receivedUpdateStatus = () => (
  {
    type: UPDATE_STATUS_SUCCESS
  }
)

export const rejectedUpdateStatus = error => (
  {
    type: UPDATE_STATUS_FAILURE
  }
)

// reducer
const reducer = (state = {}, action) => {
  switch(action.type) {
    case ADMIN_REQUESTED_REMOVALS_PENDING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case ADMIN_REQUESTED_REMOVALS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        all: action.removals
      });
    case ADMIN_REQUESTED_REMOVALS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state
  }
  return state
}

export default reducer;
