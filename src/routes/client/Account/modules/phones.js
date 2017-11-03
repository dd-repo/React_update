import infosweepApi from 'services/infosweepApi'
import { USER_LOGOUT } from 'routes/auth/modules/auth'

// action types
export const PHONES_FETCHING = 'PHONES_FETCHING'
export const PHONES_SUCCESS = 'PHONES_SUCCESS'
export const PHONES_FAILURE = 'PHONES_FAILURE'

export const PHONES_REQUEST = '/dashboard/api/v1/accounts'

// actions
export const fetchPhones = accountId => {
  const path = `${PHONES_REQUEST}/${accountId}/phones`
  return dispatch => {
    return infosweepApi.get(path)
    .then(response => dispatch(receivePhonesSuccess(response.data)))
    .catch(error => dispatch(receivePhonesFailure(error)))
  }
}

export const receivePhonesSuccess = data => (
  {
    type: PHONES_SUCCESS,
    data
  }
)

export const receivePhonesFailure = error => (
  {
    type: PHONES_FAILURE,
    error
  }
)

const reducer = (state = [], action) => {
  switch (action.type) {
  case PHONES_SUCCESS:
    return Object.assign({}, state, {
      all: action.data
    })
  case PHONES_FAILURE:
    return Object.assign({}, state, {
      errorMessage: error.response.data.errorMessage
    })
  case USER_LOGOUT:
    return []
  default:
    return state
  }
  return state
}

export default reducer

