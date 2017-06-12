import BlitzApi from 'services/BlitzApi';

// action types
export const TRANSACTIONS_PENDING = 'TRANSACTIONS_PENDING';
export const TRANSACTIONS_SUCCESS = 'TRANSACTIONS_SUCCESS';
export const TRANSACTIONS_FAILURE = 'TRANSACTIONS_FAILURE';
export const TRANSACTIONS_CANCEL_PENDING = 'TRANSACTIONS_CANCEL_PENDING';
export const TRANSACTIONS_CANCEL_SUCCESS = 'TRANSACTIONS_CANCEL_SUCCESS';
export const TRANSACTIONS_CANCEL_FAILURE = 'TRANSACTIONS_CANCEL_FAILURE';
export const TRANSACTIONS_REQUEST = '/admin/api/transactions';

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
  const path = `${TRANSACTIONS_REQUEST}/refund`
  const params = { transaction: { id }}
  return dispatch => {
    dispatch(cancelingTransaction())
    return BlitzApi.patch(path, params)
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
    type: TRANSACTIONS_CANCEL_PENDING
  }
)

export const receiveCanceledTransaction = transaction => (
  {
    type: TRANSACTIONS_CANCEL_SUCCESS,
    transaction
  }
)

export const receiveCanceledTransactionFailure = error => (
  {
    type: TRANSACTIONS_CANCEL_FAILURE,
    error
  }
)

// reducer
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
    default:
      return state
  }
  return state
}

export default reducer;
