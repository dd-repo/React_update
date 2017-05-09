import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import pace from 'pace';
import { loadPersistedData } from 'localStorage';

// ========================================================
// Browser History Setup
// ========================================================
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
})

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const defaultUserInfo = {
  first_name: 'joe',
  last_name: 'bob',
  email: 'joebob@email.com',
  phone_number: '123-123-1234',
  password: 'password12',
  account_id: 1,
  role: 'signup',
}

const defaultLoggedInUser = {
  email: 'joebob@email.com',
  password: 'Password12'
}

const defaultPaymentInfo = {
  first_name: 'joe',
  last_name: 'bob',
  creditCardNumber: '4242424242424242',
  expirationDate: '02/2020',
  cvCode: '123'
}

const defaultKeywords = {
  all: [
    {
      address: 'Sesame Street',
      city: 'New York City',
      state: 'NY',
      zipcode: '12345',
      dob: '02/02/2000'
    }
  ],
  currentKeyword: {value:'joe bob'}
}

const defaultClientSignupForm = {
  creditCardNumber: '4242424242424242'
}

const initialState = {
  //currentUser: loadPersistedData('currentUser') || defaultUserInfo,
  payment: defaultClientSignupForm,
  //keywords: loadPersistedData('keywords') || defaultKeywords,
  //accounts: loadPersistedData('accounts'),
  //profile: loadPersistedData('profile'),
  clientSignupForm: defaultClientSignupForm,
  //loggedInUser: defaultLoggedInUser,
}

const store = createStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
})

// ========================================================
// Developer Tools Setup
// ========================================================
//if (__DEBUG__) {
  //if (window.devToolsExtension) {
    //window.devToolsExtension.open()
  //}
//}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = (routerKey = null) => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer
      store={store}
      history={history}
      routes={routes}
      routerKey={routerKey}
    />,
    MOUNT_NODE
  )
}

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__ && module.hot) {
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react').default

    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
  }
  render = () => {
    try {
      renderApp(Math.random())
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept(['./routes/index'], () => render())
}

// ========================================================
// Go!
// ========================================================
pace.start();
render()
