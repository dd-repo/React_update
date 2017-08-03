import clickadillyApi from 'services/clickadillyApi';

// action types
export const RECEIVE_KEYWORDS_SUCCESS = 'RECEIVE_KEYWORDS_SUCCESS'
export const RECEIVE_KEYWORDS_FAILURE = 'RECEIVE_KEYWORDS_FAILURE'
export const KEYWORDS_REQUEST = '/dashboard/api/v1/accounts'

export const fetchKeywords = (account_id, params) => {
  const path = `${KEYWORDS_REQUEST}/${account_id}/keywords/search`
  return dispatch => {
    return clickadillyApi.get(path, params)
    .then( response => dispatch(receiveKeywords(response.data)))
    .catch( error => dispatch(rejectKeywords(error)))
  }
}

export const receiveKeywords = data => (
  {
    type: RECEIVE_KEYWORDS_SUCCESS,
    data
  }
)

export const rejectKeywords = error => (
  {
    type: RECEIVE_KEYWORDS_FAILURE,
    error
  }
)

const reducer = (state=[], action) => {
  switch(action.type) {
    case RECEIVE_KEYWORDS_SUCCESS:
      return action.data.keywords
    default:
      return state
  }
  return state
}

export default reducer;
