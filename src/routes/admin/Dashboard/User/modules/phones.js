import BlitzApi from 'services/BlitzApi';

import { ACCOUNT_SUCCESS } from './account';

export const UPDATE_PHONE_SUCCESS = 'UPDATE_PHONE_SUCCESS';
export const UPDATE_PHONE_FAILURE = 'UPDATE_PHONE_FAILURE';
export const UPDATE_PHONE_REQUEST = '/admin/api/phones';

export const updatePhone = phone => {
  const payload = { phone }
  return dispatch => {
    return BlitzApi.patch(`${UPDATE_PHONE_REQUEST}/${phone.id}`, payload)
    .then( response => dispatch(updatePhoneSuccess(response.data)))
    .catch( error => dispatch(updatePhoneFailure(error)))
  }
}

export const updatePhoneSuccess = data => (
  {
    type: UPDATE_PHONE_SUCCESS,
    data
  }
)

export const updatePhoneFailure = error => (
  {
    type: UPDATE_PHONE_FAILURE,
    error
  }
)

const insertPhone = (state, phone) => {
  const index = state.findIndex( p => p.id === phone.id)
  return [
    ...state.slice(0, index),
    phone,
    ...state.slice(index + 1)
  ]
}

const reducer = (state=[], action) => {
  switch(action.type) {
    case ACCOUNT_SUCCESS:
      return action.data.phones
    case UPDATE_PHONE_SUCCESS:
      return insertPhone(state, action.data)
    default:
      return state
  }
  return state
}

export default reducer
