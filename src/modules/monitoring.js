import axios from 'axios'

import { BASE_URL } from 'consts/apis';

//action types
export const MONITORING_PENDING = 'MONITORING_PENDING';
export const MONITORING_SUCCESS = 'MONITORING_SUCCESS';
export const MONITORING_FAILURE = 'MONITORING_FAILURE';

//actions
export const getMonitoring = (account_id, authToken) => {
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

const monitoringRequest = (account_id, authToken) => {
  let request = axios.create({baseURL: BASE_URL, headers: {'Authorization': authToken} });
  return request.get(
    `/accounts/${account_id}/monitoring`
  );
}

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
