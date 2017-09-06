import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';
import { reducer as form } from 'redux-form';
import currentUser from 'routes/auth/modules/auth';
import accounts from 'modules/accounts';
import account from 'routes/client/Account/modules';
import modal from 'modules/modal';
import payment from 'routes/signup/Payment/modules/payment';
import keywords from 'routes/signup/Keywords/modules/keywords';
import googleResults from 'routes/client/GoogleResults/modules/googleResults';
import monitoring from 'routes/client/Monitoring/modules/monitoring';
import layout from 'layouts/DefaultLayout/modules/layout';
import requestedRemovals from 'routes/admin/Dashboard/Removals/modules/removalRequests';
import transactions from 'routes/admin/Dashboard/Transactions/modules/transactions';
import subscriptions from 'routes/admin/Dashboard/Subscriptions/modules/subscriptions';
import users from 'routes/admin/Dashboard/Users/modules/users';
import subscription from 'routes/client/Account/modules/subscription';
import user from 'routes/admin/Dashboard/User/modules';
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
    keywords,
    payment,
    layout,
    router,
    form,
    notifications,
    requestedRemovals,
    transactions,
    subscriptions,
    users,
    modal,
    user,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
