import BlitzApi from 'services/BlitzApi';
import { ACCOUNT_SUCCESS } from './account';

export const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_FAILURE = 'UPDATE_ADDRESS_FAILURE';
export const CREATE_ADDRESS_SUCCESS = 'CREATE_ADDRESS_SUCCESS';
export const CREATE_ADDRESS_FAILURE = 'CREATE_ADDRESS_FAILURE';

export const ADDRESS_REQUEST = '/admin/api/addresses';

export const submitAddress = (address, accountId) => {
  return dispatch => {
    if(address.id) {
      return dispatch(updateAddress(address))
    }else{
      return dispatch(createAddress(address, accountId))
    }
  }
}

export const updateAddress = address => {
  const payload = { address }
  return dispatch => {
    return BlitzApi.patch(`${ADDRESS_REQUEST}/${address.id}`, payload)
    .then( response => dispatch(updateAddressSuccess(response.data)))
    .catch( error => dispatch(updateAddressFailure(error)))
  }
}

export const createAddress = (address, account_id) => {
  const payload = Object.assign({}, address, { account_id })
  return dispatch => {
    return BlitzApi.post(ADDRESS_REQUEST, payload)
    .then( response => dispatch(createAddressSuccess(response.data)))
    .catch( error => dispatch(createAddressFailure(error)))
  }
}

export const updateAddressSuccess = data => (
  {
    type: UPDATE_ADDRESS_SUCCESS,
    data
  }
)

export const updateAddressFailure = error => (
  {
    type: UPDATE_ADDRESS_FAILURE,
    error
  }
)

export const createAddressSuccess = data => (
  {
    type: CREATE_ADDRESS_SUCCESS,
    data
  }
)

export const createAddressFailure = error => (
  {
    type: CREATE_ADDRESS_FAILURE,
    error
  }
)

const insertAddress = (state, address) => {
  const index = state.findIndex(a => a.id === address.id)
  return [
    ...state.slice(0, index),
    address,
    ...state.slice(index + 1)
  ]
}
const reducer = (state=[], action) => {
  switch(action.type) {
    case ACCOUNT_SUCCESS:
      return action.data.addresses
    case UPDATE_ADDRESS_SUCCESS:
      return insertAddress(state, action.data)
    case CREATE_ADDRESS_SUCCESS:
      return [
        action.data,
        ...state
      ]
    default:
      return state
  }
  return state
}

export default reducer
