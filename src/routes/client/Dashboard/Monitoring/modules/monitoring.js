import BlitzApi from 'services/BlitzApi';

//action types
export const MONITORING_PENDING = 'MONITORING_PENDING';
export const MONITORING_SUCCESS = 'MONITORING_SUCCESS';
export const MONITORING_FAILURE = 'MONITORING_FAILURE';
export const MONITORING_UPDATE_SUCCESS = 'MONITORING_UPDATE_SUCCESS';
export const MONITORING_UPDATE_FAILURE = 'MONITORING_UPDATE_FAILURE';

//actions
export const getMonitoring = account_id => {

  const path = `dashboard/api/v1/accounts/${account_id}/monitoring`

  return dispatch => {
    dispatch(gettingMonitoring())
    return BlitzApi.get(path)
    .then(
      response => dispatch(monitoringSuccess(response.data))
    ).catch(
    error => dispatch(monitoringFailure(error))
    )
  }
}

export const monitoringRequestRemoval = request_id => {
  const path = `/dashboard/api/v1/monitoring/${request_id}`
  const payload = { request_status: 'requested' }

  return dispatch => {
    return BlitzApi.patch(path, payload)
    .then(
      response => dispatch(removalRequestSuccess(response.data))
    ).catch(
    error => dispatch(removalRequestFailure(error))
    )
  }
}

export const removalRequestSuccess = removal => (
  {
    type: MONITORING_UPDATE_SUCCESS,
    removal
  }
)

export const removalRequestFailure = error => (
  {
    type: MONITORING_UPDATE_FAILURE,
    error
  }
)

export const gettingMonitoring = () => (
  {
    type: MONITORING_PENDING
  }
);

export const monitoringSuccess = response => (
  {
    type: MONITORING_SUCCESS,
    response
  }
)

export const monitoringFailure = error => (
  {
    type: MONITORING_FAILURE,
    error
  }
)

// reducers
export const updateMonitoringSite = (state, removal) => {
  return [
    ...state.filter(monitoring => monitoring.id !== removal.id),
      Object.assign({}, removal)
  ]
}

const reducer = (state = {}, action) => {
  switch(action.type) {
    case MONITORING_PENDING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case MONITORING_SUCCESS:
      return Object.assign({}, state, {
        all: action.response.monitoring_requests,
        isFetching: false
      });
    case MONITORING_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error
      });
    case MONITORING_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        all: updateMonitoringSite(state.all, action.removal)
      });
    default:
      return state
  }
  return state
}
export default reducer;
