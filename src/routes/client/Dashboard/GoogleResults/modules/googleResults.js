import BlitzApi from 'services/BlitzApi';

// action types
export const GOOGLE_RESULTS_SUCCESS = 'GOOGLE_RESULTS_SUCCESS';
export const GOOGLE_RESULTS_POSTING = 'GOOGLE_RESULTS_POSTING';
export const GOOGLE_RESULTS_FAILURE = 'GOOGLE_RESULTS_FAILURE';
export const REMOVAL_REQUEST = '/dashboard/api/v1/removal_requests';

// actions
export const getGoogleResults = params => {
  const {pageNum, keyword_id, account_id} = params
  const path = `/dashboard/api/v1/accounts/${account_id}/keywords/${keyword_id}/search_results/${pageNum}`

  return dispatch => {
    dispatch(gettingGoogleResults())
    return BlitzApi.get(path)
    .then(
      response => dispatch(googleResultSuccess(response.data))
    ).catch(
    error => dispatch(googleResultFailure(error))
    )
  }
}

export const requestRemoval = payload => {
  return dispatch => {
    return(BlitzApi.post(REMOVAL_REQUEST, payload))
    //.then(
      //response => )
      //.catch(
        //error => )
  }
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
        all: action.results.search_results,
        pagination: action.results.meta.pagination
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
