import axios from 'axios'

import { BASE_URL } from 'consts/apis';

// action types
export const GOOGLE_RESULTS_SUCCESS = 'GOOGLE_RESULTS_SUCCESS';
export const GOOGLE_RESULTS_POSTING = 'GOOGLE_RESULTS_POSTING';
export const GOOGLE_RESULTS_FAILURE = 'GOOGLE_RESULTS_FAILURE';

const authToken = JSON.parse(localStorage.getItem('authToken'))

// actions
export const getGoogleResults = params => {
  return dispatch => {
    dispatch(gettingGoogleResults())
    return(googleSearchRequest(params))
    .then(
      response => dispatch(googleResultSuccess(response.data))
    ).catch(
    error => dispatch(googleResultFailure())
    )
  }
}

const googleSearchRequest = ( {pageNum, keyword_id, account_id} ) => {
  let request = axios.create({ baseURL: BASE_URL, timeout: 15000, headers: {'Authorization': authToken} });
  return request.get(
    `/accounts/${account_id}/keywords/${keyword_id}/search_results/${pageNum}`
  );
}

export const requestRemoval = (id, authToken) => {
  return dispatch => {
    return(googleSearchRemovalRequest(id, authToken))
  }
}

const googleSearchRemovalRequest = (id, authToken) => {
  let request = axios.create({ baseURL: BASE_URL, headers: {'Authorization': authToken} });
  return request.post('/removal_requests', {'request': {'search_result_id': id}})
}

const gettingGoogleResults = () => (
  {
    type: GOOGLE_RESULTS_POSTING
  }
);

const googleResultSuccess = results => (
  {
    type: GOOGLE_RESULTS_SUCCESS,
    results
  }
);

const googleResultFailure = error => (
  {
    type: GOOGLE_RESULTS_FAILURE,
    error
  }
);

// reducer
const reducer = (state = {}, action) => {
  switch(action.type) {
    case GOOGLE_RESULTS_POSTING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case GOOGLE_RESULTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        results: action.results
      });
    case GOOGLE_RESULTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        results: null
      })
    default:
      return state
  }
  return state
}

export default reducer;
