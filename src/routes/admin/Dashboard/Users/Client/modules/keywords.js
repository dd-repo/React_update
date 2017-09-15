import clickadillyApi from 'services/clickadillyApi';
import { ACCOUNT_SUCCESS } from './account';

import { configKeywords, configKeyword, insertKeyword } from 'routes/client/Account/modules/keywords';
export const UPDATE_KEYWORD_SUCCESS = 'UPDATE_KEYWORD_SUCCESS';
export const UPDATE_KEYWORD_FAILURE = 'UPDATE_KEYWORD_FAILURE';
export const ADD_KEYWORD_SUCCESS = 'ADD_KEYWORD_SUCCESS';
export const ADD_KEYWORD_FAILURE = 'ADD_KEYWORD_FAILURE';
export const KEYWORD_REQUEST = '/admin/api/keywords';

export const submitKeyword = (keyword, accountId) => {
  return dispatch => {
    if(keyword.id) {
      return dispatch(updateKeyword(keyword))
    }else{
      return dispatch(addKeyword(keyword, accountId))
    }
  }
}

export const updateKeyword = keyword => {
  const payload = { keyword: { id: keyword.id, value: keyword.label }}
  return dispatch => {
    return clickadillyApi.patch(`${KEYWORD_REQUEST}/${keyword.id}`, payload)
    .then( response => dispatch(updateKeywordSuccess(response.data)))
    .catch( error => dispatch(updateKeywordFailure(error)))
  }
}

export const addKeyword = (keyword, account_id) => {
  const payload = Object.assign({}, keyword, {
    value: keyword.label, account_id
  })

  return dispatch => {
    return clickadillyApi.post(KEYWORD_REQUEST, payload)
    .then( response => dispatch(addKeywordSuccess(response.data)))
    .catch( error => dispatch(addKeywordFailure(error)))
  }
}

export const updateKeywordSuccess = data => (
  {
    type: UPDATE_KEYWORD_SUCCESS,
    data
  }
)

export const updateKeywordFailure = error => (
  {
    type: UPDATE_KEYWORD_FAILURE,
    error
  }
)

export const addKeywordSuccess = data => (
  {
    type: ADD_KEYWORD_SUCCESS,
    data
  }
)

export const addKeywordFailure = error => (
  {
    type: ADD_KEYWORD_FAILURE,
    error
  }
)

const reducer = (state=[], action) => {
  switch(action.type) {
    case ACCOUNT_SUCCESS:
      return configKeywords(action.data.keywords)
    case UPDATE_KEYWORD_SUCCESS:
      return insertKeyword(state, action.data)
    case ADD_KEYWORD_SUCCESS:
      return [
        ...state,
        configKeyword(action.data)
      ]
    default:
      return state
  }
  return state
}

export default reducer

