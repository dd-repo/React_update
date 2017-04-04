import axios from 'axios'

import { BASE_URL } from 'consts/apis';

// action types
export const GOOGLE_RESULTS_SUCCESS = 'GOOGLE_RESULTS_SUCCESS';
export const GOOGLE_RESULTS_POSTING = 'GOOGLE_RESULTS_POSTING';
export const GOOGLE_RESULTS_FAILURE = 'GOOGLE_RESULTS_FAILURE';

// actions
export const getGoogleResults = (params, authToken) => {
  return dispatch => {
    dispatch(gettingGoogleResults())
    return(googleSearchRequest(params, authToken))
    .then(
      response => dispatch(googleResultSuccess(response.data))
    ).catch(
    error => dispatch(googleResultFailure())
    )
  }
}

const googleSearchRequest = ( {pageNum, keyword_id, account_id}, authToken) => {
  let request = axios.create({ baseURL: BASE_URL, timeout: 15000, headers: {'Authorization': authToken} });
  return request.get(
    `/accounts/${account_id}/keywords/${keyword_id}/search_results/${pageNum}`
  );
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
