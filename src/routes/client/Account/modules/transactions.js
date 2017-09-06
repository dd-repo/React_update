import clickadillyApi from 'services/clickadillyApi';

// action types
export const TRANSACTIONS_FETCHING = 'TRANSACTIONS_FETCHING';
export const TRANSACTIONS_SUCCESS = 'TRANSACTIONS_SUCCESS';
export const TRANSACTIONS_FAILURE = 'TRANSACTIONS_FAILURE';

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
    return clickadillyApi.get(TRANSACTIONS_REQUEST, params)
    .then( response => dispatch(receiveTransactionSuccess(response.data)))
    .catch( error => dispatch(receiveTransactionFailure(error)))
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

const reducer = (state=[], action) => {
  switch(action.type) {
    case TRANSACTIONS_SUCCESS:
      return action.data.transactions
    default:
      return state
  }
  return state
}

export default reducer;
