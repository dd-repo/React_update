import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';
import { reducer as form } from 'redux-form';
import planSelection from 'modules/planSelection';
import currentUser from 'modules/auth';
import accounts from 'modules/accounts';
import payment from 'routes/client/Payment/modules/payment';
import keywords from 'routes/client/Keywords/modules/keywords';
import googleResults from 'routes/client/Dashboard/GoogleResults/modules/googleResults';
import profile from 'routes/client/Dashboard/Profile/modules/profile';
import monitoring from 'routes/client/Dashboard/Monitoring/modules/monitoring';
import layout from 'layouts/DefaultLayout/modules/layout';
import requestedRemovals from 'routes/admin/Dashboard/Removals/modules/removalRequests';
import clientSignupForm from 'routes/admin/Dashboard/ClientSignup/modules/clientSignup';
import transactions from 'routes/admin/Dashboard/Transactions/modules/transactions';

// for testing purposes
import loggedInUser from 'modules/loggedInUser';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    accounts,
    currentUser,
    googleResults,
    keywords,
    loggedInUser,
    layout,
    monitoring,
    payment,
    planSelection,
    profile,
    requestedRemovals,
    router,
    form,
    clientSignupForm,
    notifications,
    transactions,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
