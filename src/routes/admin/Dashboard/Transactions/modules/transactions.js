import BlitzApi from 'services/BlitzApi';

import {
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAILURE
} from 'routes/admin/Dashboard/User/modules/transactions';

// action types
export const TRANSACTIONS_PENDING = 'TRANSACTIONS_PENDING';
export const TRANSACTIONS_SUCCESS = 'TRANSACTIONS_SUCCESS';
export const TRANSACTIONS_FAILURE = 'TRANSACTIONS_FAILURE';
export const TRANSACTIONS_REQUEST = '/admin/api/transactions/search';
export const TRANSACTION_REFUND_REQUEST = '/admin/api/transactions/refund';

// actions
export const getTransactions = (params, pageNum) => {
  const path = `${TRANSACTIONS_REQUEST}/${pageNum}`
  return dispatch => {
    dispatch(gettingTransactions())
    return BlitzApi.get(path, params)
    .then(
      response => dispatch(receiveTransactions(response.data)))
      .catch(
        error => dispatch(receiveTransactionsFailure(error))
      )
  }
}

export const gettingTransactions = () => (
  {
    type: TRANSACTIONS_PENDING
  }
)

export const receiveTransactions = data => (
  {
    type: TRANSACTIONS_SUCCESS,
    data
  }
)

export const receiveTransactionsFailure = error => (
  {
    type: TRANSACTIONS_FAILURE,
    error
  }
)

// reducer
const updateTransaction = (state, transaction) => {
  const index = state.findIndex(t => t.id === transaction.id)
   return [
     ...state.slice(1, index),
     transaction,
     ...state.slice(index + 1)
   ]
}
const reducer = (state={}, action) => {
  switch(action.type) {
    case TRANSACTIONS_PENDING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case TRANSACTIONS_SUCCESS:
      return Object.assign({}, state, {
        all: action.data.transactions,
        pagination: action.data.meta.pagination,
        isFetching: false,
      });
    case TRANSACTIONS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case UPDATE_TRANSACTION_SUCCESS:
      return Object.assign({}, state, {
        all: updateTransaction(state.all, action.data),
      })
    case UPDATE_TRANSACTION_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });
    default:
      return state
  }
  return state
}

export default reducer;
