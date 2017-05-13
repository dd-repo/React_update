import BlitzApi from 'services/BlitzApi';

// action types
export const ADMIN_REQUESTED_REMOVALS_PENDING = 'ADMIN_REQUESTED_REMOVALS_PENDING';
export const ADMIN_REQUESTED_REMOVALS_SUCCESS = 'ADMIN_REQUESTED_REMOVALS_SUCCESS';
export const ADMIN_REQUESTED_REMOVALS_FAILURE = 'ADMIN_REQUESTED_REMOVALS_FAILURE';
export const UPDATING_STATUS = 'UPDATING_STATUS';
export const UPDATE_STATUS_SUCCESS = 'UPDATE_STATUS_SUCCESS';
export const UPDATE_STATUS_FAILURE = 'UPDATE_STATUS_FAILURE';
export const PAGE_NUMBER_UPDATE = 'PAGE_NUMBER_UPDATE';
export const ADMIN_REMOVAL_REQUEST_PATH = '/admin/api/monitoring-requests';

// actions
export const getRemovalsRequested = pageNum => {
  const path = `${ADMIN_REMOVAL_REQUEST_PATH}/${pageNum}`
  return dispatch => {
    dispatch(gettingRemovalRequests())
    return BlitzApi.get(path)
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
    error => dispatch(rejectedUpdateStatus(error))
    //error => console.log('error', error.response)
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
    type: UPDATE_STATUS_FAILURE,
    error
  }
)

const testRemoval = {
  id: 12,
  created_at: "2017-05-12T12:50:03.902-07:00",
  updated_at: "2017-05-12T15:52:40.484-07:00",
  site: "whitepages.com",
  status: "completed",
  status_label: "completed",
  client_name: "god zilla",
  age: 17,
  addresses: [{
    id: 1,
    address1: "123",
    address2: null,
    city: "denver",
    state: "AL",
    zip: "12424",
    country: null,
    created_at: "2017-05-12T12:49:57.110-07:00",
    updated_at: "2017-05-12T12:49:57.110-07:00",
    account_id: 1,
  }],
  is_active: false,
}
// reducer
const updateRemovals = (removals, action) => {
  return [
    ...removals.filter(removal => removal.id !== testRemoval.id),
      Object.assign({}, testRemoval)
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
        all: action.removals.monitoring_requests,
        pagination: action.removals.meta.pagination
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
