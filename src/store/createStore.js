import Raven from 'raven-js'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { useRouterHistory } from 'react-router'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import createRavenMiddleware from 'raven-for-redux'

const RAVEN_DSN = 'https://02166c399b7d4708ab5ff97d0e1dcb34@sentry.io/252851'
Raven.config(RAVEN_DSN).install()

const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
})

export const store = (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    thunk,
    routerMiddleware(history),
    createRavenMiddleware(Raven)
  ]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const s = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  s.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers)
    })
  }

  return s
}
export const reduxStore = store({}, browserHistory)
export const history = syncHistoryWithStore(browserHistory, reduxStore, {
  selectLocationState: (state) => state.router
})
