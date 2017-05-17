import BlitzApi from 'services/BlitzApi';

// action types
export const GOOGLE_RESULTS_SUCCESS = 'GOOGLE_RESULTS_SUCCESS';
export const GOOGLE_RESULTS_POSTING = 'GOOGLE_RESULTS_POSTING';
export const GOOGLE_RESULTS_FAILURE = 'GOOGLE_RESULTS_FAILURE';
export const UPDATE_GOOGLE_RESULT_SUCCESS = 'UPDATE_GOOGLE_RESULT_SUCCESS'
export const UPDATE_GOOGLE_RESULT_FAILURE = 'UPDATE_GOOGLE_RESULT_FAILURE'

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
    .then(
      response => dispatch(updateGoogleResultSuccess(response.data)))
      .catch(
        error => dispatch(updateGoogleResultFailure(error)))
  }
}

export const gettingGoogleResults = () => (
  {
    type: GOOGLE_RESULTS_POSTING
  }
);

export const googleResultSuccess = results => (
  {
    type: GOOGLE_RESULTS_SUCCESS,
    results
  }
);

export const googleResultFailure = error => (
  {
    type: GOOGLE_RESULTS_FAILURE,
    error
  }
);

export const updateGoogleResultSuccess = result => (
  {
    type: UPDATE_GOOGLE_RESULT_SUCCESS,
    result
  }
)

export const updateGoogleResultFailure = error => (
  {
    type: UPDATE_GOOGLE_RESULT_FAILURE,
    error
  }
)

// reducer

export const updateGoogleResults = (state, action) => {
  return [
    ...state.filter(removal => removal.id !== action.result.id),
      Object.assign({}, action.result)
  ]
}

const reducer = (state = {}, action) => {
  switch(action.type) {
    case GOOGLE_RESULTS_POSTING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case GOOGLE_RESULTS_SUCCESS:
      return Object.assign({}, state, {
        all: action.results.search_results,
        pagination: action.results.meta.pagination,
        isFetching: false,
      });
    case GOOGLE_RESULTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error.response.data.errorMessage
      })
    case UPDATE_GOOGLE_RESULT_SUCCESS:
      return Object.assign({}, state, {
         all: updateGoogleResults(state.all, action)
      })
    case UPDATE_GOOGLE_RESULT_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.error.response.data.errorMessage
      })
    default:
      return state
  }
  return state
}

export default reducer;
