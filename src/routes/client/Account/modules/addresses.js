import infosweepApi from 'services/infosweepApi'
import { USER_LOGOUT } from 'routes/auth/modules/auth'

// action types
export const ADDRESSES_FETCHING = 'ADDRESSES_FETCHING'
export const ADDRESSES_SUCCESS = 'ADDRESSES_SUCCESS'
export const ADDRESSES_FAILURE = 'ADDRESSES_FAILURE'

export const ADDRESSES_REQUEST = '/dashboard/api/v1/accounts'

// actions
export const fetchAddresses = accountId => {
  const path = `${ADDRESSES_REQUEST}/${accountId}/addresses`
  return dispatch => {
    return infosweepApi.get(path)
    .then(response => dispatch(receiveAddressesSuccess(response.data)))
    .catch(error => dispatch(receiveAddressFailure(error)))
  }
}

export const receiveAddressesSuccess = data => (
  {
    type: ADDRESSES_SUCCESS,
    data
  }
)

export const receiveAddressFailure = error => (
  {
    type: ADDRESSES_FAILURE,
    error
  }
)

const reducer = (state = [], action) => {
  switch (action.type) {
  case ADDRESSES_SUCCESS:
    return Object.assign({}, state, {
      all: action.data
    })
  case ADDRESSES_FAILURE:
    return Object.assign({}, state, {
      errorMessage: action.error.response.data.errorMessage
    })
  case USER_LOGOUT:
    return []
  default:
    return state
  }
  return state
}

export default reducer

