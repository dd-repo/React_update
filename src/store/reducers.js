import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';
import { reducer as form } from 'redux-form';
import currentUser from 'routes/auth/modules/auth';
import accounts from 'modules/accounts';
import account from 'routes/client/Account/modules';
import modal from 'modules/modal';
import payment from 'routes/signup/Payment/modules/payment';
import googleResults from 'routes/client/GoogleResults/modules/googleResults';
import monitoring from 'routes/client/Monitoring/modules/monitoring';
import layout from 'layouts/DefaultLayout/modules/layout';
import requestedRemovals from 'routes/admin/Dashboard/Removals/modules/removalRequests';
import transactions from 'routes/admin/Dashboard/Transactions/modules/transactions';
import subscriptions from 'routes/admin/Dashboard/Subscriptions/modules/subscriptions';
import users from 'routes/admin/Dashboard/Users/modules/users';
import subscription from 'routes/client/Account/modules/subscription';
import client from 'routes/admin/Dashboard/Users/Client/modules';
import admin from 'routes/admin/Dashboard/Users/Admin/modules';
import dashboard from 'routes/client/Dashboard/modules';


export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    account,
    dashboard,
    currentUser,
    monitoring,
    googleResults,
    accounts,
    payment,
    layout,
    router,
    form,
    notifications,
    requestedRemovals,
    transactions,
    subscriptions,
    users,
    admin,
    modal,
    client,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
