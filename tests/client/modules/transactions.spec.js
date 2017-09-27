import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import infosweepApi from 'services/infosweepApi';

import {
  TRANSACTIONS_FETCHING,
  TRANSACTIONS_SUCCESS,
  TRANSACTIONS_FAILURE,
  TRANSACTIONS_REQUEST,
  fetchTransactions,
  receiveTransactionSuccess,
  receiveTransactionFailure,
  default as reducer
} from 'routes/client/Account/modules/transactions';
