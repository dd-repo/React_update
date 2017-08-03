import clickadillyApi from 'services/clickadillyApi';

// action types
export const ADMIN_REQUESTED_REMOVALS_PENDING = 'ADMIN_REQUESTED_REMOVALS_PENDING';
export const ADMIN_REQUESTED_REMOVALS_SUCCESS = 'ADMIN_REQUESTED_REMOVALS_SUCCESS';
export const ADMIN_REQUESTED_REMOVALS_FAILURE = 'ADMIN_REQUESTED_REMOVALS_FAILURE';
export const ADMIN_COMPLETED_REMOVALS_SUCCESS = 'ADMIN_COMPLETED_REMOVALS_SUCCESS';
export const UPDATING_STATUS = 'UPDATING_STATUS';
export const UPDATE_STATUS_SUCCESS = 'UPDATE_STATUS_SUCCESS';
export const UPDATE_STATUS_FAILURE = 'UPDATE_STATUS_FAILURE';
export const PAGE_NUMBER_UPDATE = 'PAGE_NUMBER_UPDATE';
export const ADMIN_REMOVAL_REQUEST_PATH = '/admin/api/monitoring-requests';
export const ADMIN_REMOVAL_COMPLETED_REQUEST = '/admin/api/monitoring-request-receipts/search';

// actions
export const getRemovals = (pageNum, params) => {
  return dispatch => {
    if(params.q.completed_at_not_null) {
      return dispatch(getRemovalsCompleted(pageNum, params))
    }else{
      return dispatch(getRemovalsRequested(pageNum, params))
    }
  }
}
export const getRemovalsRequested = (pageNum, params) => {
  const path = `${ADMIN_REMOVAL_REQUEST_PATH}/search/${pageNum}`
  return dispatch => {
    dispatch(gettingRemovalRequests())
    return clickadillyApi.get(path, params)
    .then( response => dispatch(receivedRemovalRequests(response.data)))
    .catch( error => dispatch(rejectedRemovalRequests(error)))
  }
}

export const getRemovalsCompleted = (pageNum, params) => {
  const path = `${ADMIN_REMOVAL_COMPLETED_REQUEST}/${pageNum}`
  return dispatch => {
    dispatch(gettingRemovalRequests())
    return clickadillyApi.get(path, params)
    .then(response => dispatch(receivedRemovalsCompleted(response.data)))
    .catch(error => dispatch(rejectedRemovalRequests(error)))
  }
}

export const updateStatus = payload => {
  return dispatch => {
    dispatch(updatingStatus())
    return clickadillyApi.patch(ADMIN_REMOVAL_REQUEST_PATH, payload)
    .then( response => dispatch(receivedUpdateStatus(response.data)))
    .catch( error => dispatch(rejectedUpdateStatus(error)))
  }
}

export const gettingRemovalRequests = () => (
  {
    type: ADMIN_REQUESTED_REMOVALS_PENDING
  }
)

export const receivedRemovalRequests = requestedRemovals => (
  {
    type: ADMIN_REQUESTED_REMOVALS_SUCCESS,
    requestedRemovals
  }
)

export const receivedRemovalsCompleted = data => (
  {
    type: ADMIN_COMPLETED_REMOVALS_SUCCESS,
    data
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

export const receivedUpdateStatus = requestedRemoval => (
  {
    type: UPDATE_STATUS_SUCCESS,
    requestedRemoval
  }
)

export const rejectedUpdateStatus = error => (
  {
    type: UPDATE_STATUS_FAILURE,
    error
  }
)

// reducer

export const updateRemovals = (requestedRemovals, action) => {
  return [
    ...requestedRemovals.filter(removal => removal.id !== action.requestedRemoval.id)
  ]
}

const reducer = (state = {}, action) => {
  switch(action.type) {
    case ADMIN_REQUESTED_REMOVALS_PENDING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case ADMIN_REQUESTED_REMOVALS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        all: action.requestedRemovals.monitoring_requests,
        pagination: action.requestedRemovals.meta.pagination
      });
    case ADMIN_COMPLETED_REMOVALS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        completed: action.data.monitoring_request_receipts,
        pagination: action.data.meta.pagination
      });
    case ADMIN_REQUESTED_REMOVALS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case UPDATE_STATUS_SUCCESS:
      return Object.assign({}, state, {
        all: updateRemovals(state.all, action)
      });
    case UPDATE_STATUS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state
  }
  return state
}

export default reducer;
