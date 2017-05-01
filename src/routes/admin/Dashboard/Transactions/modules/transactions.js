import BlitzApi from 'services/BlitzApi';

// action types
export const TRANSACTIONS_PENDING = 'TRANSACTIONS_PENDING';
export const TRANSACTIONS_SUCCESS = 'TRANSACTIONS_SUCCESS';
export const TRANSACTIONS_FAILURE = 'TRANSACTIONS_FAILURE';
export const TRANSACTIONS_REQUEST = '/admin/api/transactions';

// actions
export const getTransactions = pageNum => {
  //const path = ADMIN_REMOVAL_REQUEST_PATH + `/${pageNum}`
  return dispatch => {
    dispatch(gettingTransactions())
    return BlitzApi.get(TRANSACTIONS_REQUEST)
    .then(
      response => dispatch(receiveTransactions(response.data))
      //response => console.log('response', response)
    ).catch(
    error => dispatch(rejectTransactions(error))
    //error => console.log('error', error)
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

export const rejectTransactions = error => (
  {
    type: TRANSACTIONS_FAILURE,
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
