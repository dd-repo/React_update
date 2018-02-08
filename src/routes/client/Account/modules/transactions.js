import infosweepApi from 'services/infosweepApi';
import { USER_LOGOUT } from 'routes/auth/modules/auth';

// action types
export const TRANSACTIONS_FETCHING       = 'TRANSACTIONS_FETCHING';
export const TRANSACTIONS_SUCCESS        = 'TRANSACTIONS_SUCCESS';
export const TRANSACTIONS_FAILURE        = 'TRANSACTIONS_FAILURE';
export const TRANSACTION_RECEIPT_SENDING = 'TRANSACTION_RECEIPT_SENDING';
export const TRANSACTION_RECEIPT_SUCCESS = 'TRANSACTION_RECEIPT_SUCCESS';
export const TRANSACTION_RECEIPT_FAILURE = 'TRANSACTION_RECEIPT_FAILURE';

export const TRANSACTIONS_REQUEST = '/dashboard/api/v1/transactions/search';

// actions
export const fetchTransactions = subscriberId => {
  const params = {
    q: {
      subscription_user_id_eq: subscriberId,
      s: 'updated_at desc'
    }
  }

  return dispatch => {
    return infosweepApi.get(TRANSACTIONS_REQUEST, params)
    .then( response => dispatch(receiveTransactionSuccess(response.data)))
    .catch( error => dispatch(receiveTransactionFailure(error)))
  }
}

export const sendTransactionReceipt = (subscriptionId, transactionId) => {
  const path = '/dashboard/api/v1/emails/receipt'
  const params = {
    subscription_id: subscriptionId,
    transaction_id: transactionId
  }

  return dispatch => {
    return infosweepApi.patch(path, params)
      .then( response => dispatch(receiveTransactionReceiptSuccess(response.data)))
      .catch( error => dispatch(receiveTransactionReceiptFailure(error)))
  }
}

export const receiveTransactionSuccess = data => (
  {
    type: TRANSACTIONS_SUCCESS,
    data
  }
)

export const receiveTransactionFailure = error => (
  {
    type: TRANSACTIONS_FAILURE,
    error
  }
)

export const receiveTransactionReceiptSuccess = data => (
  {
    type: TRANSACTION_RECEIPT_SUCCESS,
    data
  }
)

export const receiveTransactionReceiptFailure = error => (
  {
    type: TRANSACTION_RECEIPT_FAILURE,
    error
  }
)

const reducer = (state=[], action) => {
  switch(action.type) {
    case TRANSACTIONS_SUCCESS:
      return action.data.transactions
    case USER_LOGOUT:
      return []
    default:
      return state
  }
  return state
}

export default reducer;
