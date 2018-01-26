import infosweepApi from 'services/infosweepApi'
import _ from 'underscore'
import { USER_SUCCESS } from './details'
import {
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_FAILURE
} from './subscriptions'
export const UPDATE_TRANSACTION_SUCCESS = 'UPDATE_TRANSACTION_SUCCESS'
export const UPDATE_TRANSACTION_FAILURE = 'UPDATE_TRANSACTION_FAILURE'
export const CREATE_TRANSACTION_SUCCESS = 'CREATE_TRANSACTION_SUCCESS'
export const CREATE_TRANSACTION_FAILURE = 'CREATE_TRANSACTION_FAILURE'
export const TRANSACTION_REQUEST = '/admin/api/transactions'

export const updateTransaction = transaction => {
  const action = transaction.status === 'completed' ? 'refund' : 'update-charge'
  const path = `${TRANSACTION_REQUEST}/${action}`
  const payload = { id: transaction.id }

  return dispatch => {
    return infosweepApi.patch(path, payload)
    .then(response => dispatch(updateTransactionSuccess(response.data)))
    .catch(error => dispatch(updateTransactionFailure(error)))
  }
}

export const createTransaction = ({subscription_id, type_of_deal}) => {
  const payload = {subscription_id, type_of_deal: type_of_deal.value}
  return dispatch => {
    return infosweepApi.post(TRANSACTION_REQUEST, payload)
      .then(response => dispatch(createTransactionSuccess(response.data)))
      .catch(error => dispatch(createTransactionFailure(error)))
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

export const createTransactionSuccess = data => (
  {
    type: CREATE_TRANSACTION_SUCCESS,
    data
  }
)

export const createTransactionFailure = error => (
  {
    type: CREATE_TRANSACTION_FAILURE,
    error
  }
)

export const insertTransaction = (state = [], transaction) => {
  const index = state.findIndex(t => t.id === transaction.id)
  if (index !== -1) {
    return [
      ...state.slice(0, index),
      transaction,
      ...state.slice(index + 1)
    ]
  }
  return state
}

export const addTransaction = (state, transaction) => {
  if (transaction) {
    return [ transaction, ...state ]
  }
  return state
}

export const sortTransactionById = transactions => (
  _.sortBy(transactions, t => { return t.id }).reverse()
)

const reducer = (state = [], action) => {
  switch (action.type) {
  case USER_SUCCESS:
    return sortTransactionById(action.data.transactions)
  case CREATE_TRANSACTION_SUCCESS:
    return addTransaction(state, action.data)
  case UPDATE_TRANSACTION_SUCCESS:
    return insertTransaction(state, action.data)
  case CREATE_SUBSCRIPTION_SUCCESS:
    return addTransaction(state, action.data.transaction)
  case CREATE_SUBSCRIPTION_FAILURE:
    return addTransaction(state, action.error.response.data.transaction)
  default:
    return state
  }
  return state
}

export default reducer
