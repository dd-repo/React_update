// We only need to import the modules necessary for initial render
import DefaultLayout from '../layouts/DefaultLayout';
import Home from './Home';
import { injectReducer } from '../store/reducers';
import ROUTES from './routes';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

const authTransition = (store, nextState, replace) => {
  const state = store.getState()
  const loggedIn = !!state.currentUser.access_token
  const pathname = nextState.location.pathname
  if(pathname.includes('/dashboard')) {
    !loggedIn && replace('/login')
  }
}

export const createRoutes = (store) => ({
    path: '/',
    component: DefaultLayout,
    indexRoute: Home,
    childRoutes: ROUTES,
    onEnter: (nextState, replace) => {
      authTransition(store, nextState, replace)
    }
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
