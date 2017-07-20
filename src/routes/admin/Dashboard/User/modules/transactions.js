import BlitzApi from 'services/BlitzApi';
import { USER_SUCCESS } from './user';

export const UPDATE_TRANSACTION_SUCCESS = 'UPDATE_TRANSACTION_SUCCESS';
export const UPDATE_TRANSACTION_FAILURE = 'UPDATE_TRANSACTION_FAILURE';
export const UPDATE_TRANSACTION_REQUEST = '/admin/api/transactions';

export const updateTransaction = transaction => {
  const action = transaction.status === 'completed' ? 'refund' : 'update-charge'
  const path = `${UPDATE_TRANSACTION_REQUEST}/${action}`
  const payload = { id: transaction.id }

  return dispatch => {
    return BlitzApi.patch(path, payload)
    .then( response => dispatch(updateTransactionSuccess(response.data)))
    .catch( error => dispatch(updateTransactionFailure(error)))
  }
}

export const updateTransactionSuccess = data => (
  {
    type: UPDATE_TRANSACTION_SUCCESS,
    data
  }
)

export const updateTransactionFailure = error => (
  {
    type: UPDATE_TRANSACTION_FAILURE,
    error
  }
)

export const insertTransaction = (state=[], transaction) => {
  const index = state.findIndex(t => t.id === transaction.id)
  if(index !== -1) {
    return [
      ...state.slice(0, index),
      transaction,
      ...state.slice(index + 1)
    ]
  }
  return state
}

const reducer = (state=[], action) => {
  switch(action.type) {
    case USER_SUCCESS:
       return action.data.transactions
    case UPDATE_TRANSACTION_SUCCESS:
       return insertTransaction(state, action.data)
    default:
      return state
  }
  return state
}

export default reducer;
