import infosweepApi from 'services/infosweepApi'
import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from 'routes/auth/modules/auth'

// action types
export const CREATE_KEYWORD_POSTING = 'CREATE_KEYWORD_POSTING'
export const CREATE_KEYWORD_SUCCESS = 'CREATE_KEYWORD_SUCCESS'
export const CREATE_KEYWORD_FAILURE = 'CREATE_KEYWORD_FAILURE'
export const CURRENT_KEYWORD_UPDATE = 'CURRENT_KEYWORD_UPDATE'
export const RECEIVE_KEYWORDS_SUCCESS = 'RECEIVE_KEYWORDS_SUCCESS'
export const RECEIVE_KEYWORDS_FAILURE = 'RECEIVE_KEYWORDS_FAILURE'
export const KEYWORD_UPDATE_SUCCESS = 'KEYWORD_UPDATE_SUCCESS'
export const KEYWORD_UPDATE_FAILURE = 'KEYWORD_UPDATE_FAILURE'

export const KEYWORD_REQUEST = '/dashboard/api/v1/users/sign-up/keyword'
export const KEYWORDS_REQUEST = '/dashboard/api/v1/accounts'

// actions
export const updateCurrentKeyword = keyword => (
  {
    type: CURRENT_KEYWORD_UPDATE,
    keyword
  }
)

export const postKeywords = payload => {
  return dispatch => {
    dispatch(postingKeywords())
    return infosweepApi.post(KEYWORD_REQUEST, { signup_keyword: payload })
    .then(
      response => dispatch(keywordSuccess(response.data))
    ).catch(
    error => dispatch(keywordFailure(error))
    )
  }
}

export const updateKeyword = (keyword, accountId) => {
  const path = `/dashboard/api/v1/accounts/${accountId}/keywords/${keyword.id}`
  const payload = { id: keyword.id, value: keyword.label }
  return dispatch => {
    return infosweepApi.patch(path, payload)
   .then(response => dispatch(receiveKeywordUpdateSuccess(response.data)))
   .catch(error => dispatch(receieveKeywordUpdateFailure(error)))
  }
}

export const fetchKeywords = (account_id, params) => {
  const path = `${KEYWORDS_REQUEST}/${account_id}/keywords/search`
  return dispatch => {
    return infosweepApi.get(path, params)
    .then(response => dispatch(receiveKeywords(response.data)))
    .catch(error => dispatch(rejectKeywords(error)))
  }
}

export const postingKeywords = () => (
  {
    type: CREATE_KEYWORD_POSTING
  }
)

export const keywordSuccess = keywords => (
  {
    type: CREATE_KEYWORD_SUCCESS,
    keywords
  }
)

export const keywordFailure = error => (
  {
    type: CREATE_KEYWORD_FAILURE,
    error
  }
)

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

export const receiveKeywordUpdateSuccess = data => (
  {
    type: KEYWORD_UPDATE_SUCCESS,
    data
  }
)

export const receieveKeywordUpdateFailure = error => (
  {
    type: KEYWORD_UPDATE_FAILURE,
    error
  }
)

// reducer
export const configKeywords = keywords => (
  keywords.map(keyword => ({
    id: keyword.id,
    value: keyword.id,
    label: keyword.value
  }))
)

export const configKeyword = (keyword) => {
  if (keyword) {
    return ({
      id: keyword.id,
      value: keyword.id,
      label: keyword.label || keyword.value
    })
  }
  return {}
}

export const insertKeyword = (state, keyword) => {
  const index = state.findIndex(k => k.id === keyword.id)
  return [
    ...state.slice(0, index),
    configKeyword(keyword),
    ...state.slice(index + 1)
  ]
}

export const updateCurrentKeywordValue = (currentKeyword, updatedKeyword) => {
  return currentKeyword.id === updatedKeyword.id ?
    configKeyword(updatedKeyword)
      :
        currentKeyword
}

const initialState = { all: [], currentKeyword: {} }

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case CREATE_KEYWORD_POSTING:
    return Object.assign({}, state, {
      isFetching: true
    })
  case CREATE_KEYWORD_SUCCESS:
    return Object.assign({}, state, {
      all: configKeywords(action.keywords),
      currentKeyword: configKeyword(action.keywords[0]),
      isFetching: false
    })
  case CREATE_KEYWORD_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error
    })
  case CURRENT_KEYWORD_UPDATE:
    return Object.assign({}, state, {
      currentKeyword: configKeyword(action.keyword)
    })
  case USER_LOGIN_SUCCESS:
    return Object.assign({}, state, {
      all: configKeywords(action.data.account.keywords),
      currentKeyword: configKeyword(action.data.account.keywords[0]),
      isFetching: false
    })
  case RECEIVE_KEYWORDS_SUCCESS:
    return Object.assign({}, state, {
      all: configKeywords(action.data.keywords),
      currentKeyword: configKeyword(action.data.keywords[0])
    })
  case KEYWORD_UPDATE_SUCCESS:
    return Object.assign({}, state, {
      all: insertKeyword(state.all, action.data),
      currentKeyword: updateCurrentKeywordValue(state.currentKeyword, action.data)
    })
  case USER_LOGOUT:
    return initialState
  default:
    return state
  }
  return state
}

export default reducer

