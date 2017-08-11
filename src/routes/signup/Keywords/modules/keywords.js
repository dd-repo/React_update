import clickadillyApi from 'services/clickadillyApi';
import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from 'routes/auth/modules/auth';

// action types
export const KEYWORD_POSTING = 'KEYWORD_POSTING';
export const KEYWORD_SUCCESS = 'KEYWORD_SUCCESS';
export const KEYWORD_FAILURE = 'KEYWORD_FAILURE';
export const CURRENT_KEYWORD_UPDATE = 'CURRENT_KEYWORD_UPDATE';
export const RECEIVE_KEYWORDS_SUCCESS = 'RECEIVE_KEYWORDS_SUCCESS'
export const RECEIVE_KEYWORDS_FAILURE = 'RECEIVE_KEYWORDS_FAILURE'

export const KEYWORD_REQUEST = '/dashboard/api/v1/users/sign-up/keyword';
export const KEYWORDS_REQUEST = '/dashboard/api/v1/accounts'


// actions
export const updateCurrentKeyword = keyword => (
  {
    type: CURRENT_KEYWORD_UPDATE,
    keyword
  }
);

export const postKeywords = payload => {
  return dispatch => {
    dispatch(postingKeywords())
    return clickadillyApi.post(KEYWORD_REQUEST, { signup_keyword: payload })
    .then(
      response => dispatch(keywordSuccess(response.data))
    ).catch(
    error => dispatch(keywordFailure(error))
    )
  }
}

export const fetchKeywords = (account_id, params) => {
  const path = `${KEYWORDS_REQUEST}/${account_id}/keywords/search`
  return dispatch => {
    return clickadillyApi.get(path, params)
    .then( response => dispatch(receiveKeywords(response.data)))
    .catch( error => dispatch(rejectKeywords(error)))
  }
}

export const postingKeywords = () => (
  {
    type: KEYWORD_POSTING
  }
);

export const keywordSuccess = keywords => (
  {
    type: KEYWORD_SUCCESS,
    keywords
  }
);

export const keywordFailure = error => (
  {
    type: KEYWORD_FAILURE,
    error
  }
);

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

// reducer
const configKeywords = keywords => (
  keywords.map(keyword => ({
    id: keyword.id,
    value: keyword.id,
    label: keyword.value
    }))
)

const configKeyword = keyword => ({
  id: keyword.id,
  value: keyword.id,
  label: keyword.label || keyword.value
})

const reducer = (state = {}, action) => {
  switch(action.type) {
    case KEYWORD_POSTING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case KEYWORD_SUCCESS:
      return Object.assign({}, state, {
        all: configKeywords(action.keywords),
        currentKeyword: configKeyword(action.keywords[0]),
        isFetching: false,
      });
    case KEYWORD_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case CURRENT_KEYWORD_UPDATE:
      return Object.assign({}, state, {
        currentKeyword: configKeyword(action.keyword)
      });
    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        all: configKeywords(action.data.account.keywords),
        currentKeyword: configKeyword(action.data.account.keywords[0]),
        isFetching: false,
      });
    case RECEIVE_KEYWORDS_SUCCESS:
      return Object.assign({}, state, {
        all: configKeywords(action.data.keywords),
        currentKeyword: configKeyword(action.data.keywords[0]),
      });
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
  return state
}

export default reducer;

