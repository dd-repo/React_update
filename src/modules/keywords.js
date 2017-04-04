import axios from 'axios';
import { BASE_URL } from 'consts/apis';
import { USER_LOGIN_SUCCESS } from './auth';

// action types
export const KEYWORD_POSTING = 'KEYWORD_POSTING';
export const KEYWORD_SUCCESS = 'KEYWORD_SUCCESS';
export const KEYWORD_FAILURE = 'KEYWORD_FAILURE';
export const CURRENT_KEYWORD_ADD = 'CURRENT_KEYWORD_ADD';

export const KEYWORD_REQUEST = `${BASE_URL}/users/sign-up/keyword`;

// actions
export const addCurrentKeyword = keyword => (
  {
    type: CURRENT_KEYWORD_ADD,
    keyword
  }
);

export const postKeywords = (keywords, authToken) => {
  return dispatch => {
    dispatch(postingKeywords(keywords))
    return axios(keywordRequest(keywords, authToken))
    .then(
      response => dispatch(keywordSuccess(response.data))
    ).catch(
    error => dispatch(keywordFailure(error.response.data.errorMessage))
    )
  }
}

const keywordRequest = (keywords, authToken) => (
  {
    method: 'post',
    url: KEYWORD_REQUEST,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authToken
    },
    data: JSON.stringify({ signup_keyword: keywords })
  }
);


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
    type: FAILURE,
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
        all: action.userData.keywords,
        currentKeyword: action.userData.keywords[0],
        isFetching: false,
      });
    default:
      return state
  }
  return state
}

export default reducer;
