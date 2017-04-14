import axios from 'axios'

import { BASE_URL } from 'consts/apis';

//action types
export const MONITORING_PENDING = 'MONITORING_PENDING';
export const MONITORING_SUCCESS = 'MONITORING_SUCCESS';
export const MONITORING_FAILURE = 'MONITORING_FAILURE';
export const MONITORING_UPDATE_SUCCESS = 'MONITORING_UPDATE_SUCCESS';
export const MONITORING_UPDATE_FAILURE = 'MONITORING_UPDATE_FAILURE';

const authToken = JSON.parse(localStorage.getItem('authToken'));

//actions
export const getMonitoring = account_id => {
  return dispatch => {
    dispatch(gettingMonitoring())
    return(monitoringRequest(account_id, authToken))
    .then(
      response => dispatch(monitoringSuccess(response.data))
    ).catch(
    error => dispatch(monitoringFailure(error))
    )
  }
}

export const requestRemoval = request_id => {
  return dispatch => {
    return axios(removalRequest(request_id))
    .then(
      response => dispatch(removalRequestSuccess(response.status))
    ).catch(
    error => dispatch(removalRequestFailure(error))
    )
  }
}

const removalRequest = request_id => {
  return (
    {
      method: 'patch',
      url: `${BASE_URL}/monitoring/${request_id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken
      },
      data: JSON.stringify({ request_status: 'requested' })
    });
}

const monitoringRequest = account_id => {
  let request = axios.create({
    baseURL: BASE_URL,
    headers: {'Authorization': authToken}
  });

  return request.get(
    `/accounts/${account_id}/monitoring`
  );
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
