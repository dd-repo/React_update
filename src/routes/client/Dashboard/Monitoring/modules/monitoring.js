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

export const requestRemoval = request_id => {
  const path = `/dashboard/api/v1/monitoring/${request_id}`
  const payload = { request_status: 'requested' }

  return dispatch => {
    return BlitzApi.patch(path, payload)
    .then(
      response => dispatch(removalRequestSuccess(response.status))
    ).catch(
    error => dispatch(removalRequestFailure(error))
    )
  }
}

const removalRequestSuccess = () => (
  {
    type: MONITORING_UPDATE_SUCCESS,
  }
)

const removalRequestFailure = () => (
  {
    type: MONITORING_UPDATE_FAILURE
  }
)

const gettingMonitoring = () => (
  {
    type: MONITORING_PENDING
  }
);

const monitoringSuccess = (response) => (
  {
    type: MONITORING_SUCCESS,
    response
  }
)

const monitoringFailure = (error) => (
  {
    type: MONITORING_FAILURE,
    error
  }
)

// reducer
const reducer = (state = {}, action) => {
  switch(action.type) {
    case MONITORING_PENDING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case MONITORING_SUCCESS:
      return Object.assign({}, state, {
        sites: action.response,
        isFetching: false
      });
    case MONITORING_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error
      });
    default:
      return state
  }
  return state
}
export default reducer;
