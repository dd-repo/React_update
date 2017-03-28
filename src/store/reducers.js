import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';
import { reducer as form } from 'redux-form';
import planSelection from 'modules/planSelection';
import currentUser from 'modules/auth';
import payment from 'modules/payment';
import keywords from 'modules/keywords';
import googleResults from 'modules/googleResults';
import accounts from 'modules/accounts';
import profile from 'modules/profile';
// for testing purposes
import loggedInUser from 'modules/loggedInUser';

import layout from 'layouts/DefaultLayout/modules/layout';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    planSelection,
    keywords,
    currentUser,
    payment,
    googleResults,
    accounts,
    loggedInUser,
    layout,
    profile,
    router,
    form,
    notifications,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
