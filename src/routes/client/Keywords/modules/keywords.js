import ClientApi from 'services/ClientApi';
import { USER_LOGIN_SUCCESS } from 'modules/auth';

// action types
export const KEYWORD_POSTING = 'KEYWORD_POSTING';
export const KEYWORD_SUCCESS = 'KEYWORD_SUCCESS';
export const KEYWORD_FAILURE = 'KEYWORD_FAILURE';
export const CURRENT_KEYWORD_ADD = 'CURRENT_KEYWORD_ADD';

export const KEYWORD_REQUEST = `/users/sign-up/keyword`;


// actions
export const addCurrentKeyword = keyword => (
  {
    type: CURRENT_KEYWORD_ADD,
    keyword
  }
);

export const postKeywords = payload => {
  return dispatch => {
    dispatch(postingKeywords())
    return ClientApi.post(KEYWORD_REQUEST, { signup_keyword: payload })
    .then(
      response => dispatch(keywordSuccess(response.data))
    ).catch(
    error => dispatch(keywordFailure(error.response.data.errorMessage))
    )
  }
}

const postingKeywords = keywords => (
  {
    type: KEYWORD_POSTING,
    keywords
  }
);

const keywordSuccess = keywords => (
  {
    type: KEYWORD_SUCCESS,
    keywords
  }
);

const keywordFailure = error => (
  {
    type: KEYWORD_FAILURE,
    error
  }
);

// reducer
const reducer = (state = {}, action) => {
  switch(action.type) {
    case KEYWORD_POSTING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case KEYWORD_SUCCESS:
      return Object.assign({}, state, {
        all: action.keywords,
        currentKeyword: action.keywords[0],
        isFetching: false,
      });
    case KEYWORD_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case CURRENT_KEYWORD_ADD:
      return Object.assign({}, state, {
        currentKeyword: action.keyword
      });
    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        all: action.data.account.keywords,
        currentKeyword: action.data.account.keywords[0],
        isFetching: false,
      });
    default:
      return state
  }
  return state
}

export default reducer;

