import BlitzApi from 'services/BlitzApi';

// action types
export const TRANSACTIONS_PENDING = 'TRANSACTIONS_PENDING';
export const TRANSACTIONS_SUCCESS = 'TRANSACTIONS_SUCCESS';
export const TRANSACTIONS_FAILURE = 'TRANSACTIONS_FAILURE';
export const TRANSACTION_CANCEL_PENDING = 'TRANSACTION_CANCEL_PENDING';
export const TRANSACTION_CANCEL_SUCCESS = 'TRANSACTION_CANCEL_SUCCESS';
export const TRANSACTION_CANCEL_FAILURE = 'TRANSACTION_CANCEL_FAILURE';
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

export const cancelTransaction = id => {
  const params = { transaction: { id }}
  return dispatch => {
    dispatch(cancelingTransaction())
    return BlitzApi.patch(TRANSACTION_REFUND_REQUEST, params)
    .then(
      response => dispatch(receiveCanceledTransaction(response.data)))
      .catch(
        error => dispatch(receiveCanceledTransactionFailure(error))
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

export const cancelingTransaction = () => (
  {
    type: TRANSACTION_CANCEL_PENDING
  }
)

export const receiveCanceledTransaction = transaction => (
  {
    type: TRANSACTION_CANCEL_SUCCESS,
    transaction
  }
)

export const receiveCanceledTransactionFailure = error => (
  {
    type: TRANSACTION_CANCEL_FAILURE,
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
    case TRANSACTION_CANCEL_PENDING:
      return Object.assign({}, state, {
      })
    case TRANSACTION_CANCEL_SUCCESS:
      return Object.assign({}, state, {
        all: updateTransaction(state.all, action.transaction),
        error: null
      })
    case TRANSACTION_CANCEL_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state
  }
  return state
}

export default reducer;
