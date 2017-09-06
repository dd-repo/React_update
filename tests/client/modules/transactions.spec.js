import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import clickadillyApi from 'services/clickadillyApi';

import {
  TRANSACTIONS_FETCHING,
  TRANSACTIONS_SUCCESS,
  TRANSACTIONS_FAILURE,
  TRANSACTIONS_REQUEST,
  fetchTransactions,
  receiveTransactionSuccess,
  receiveTransactionFailure,
  default as reducer
<<<<<<< HEAD
} from 'routes/client/Account/modules/transactions';
=======
} from 'routes/clients/Account/modules/transactions';
>>>>>>> e697493f42167dc537bfebaf5bcc6284c70673ef
