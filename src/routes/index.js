// We only need to import the modules necessary for initial render
import DefaultLayout from '../layouts/DefaultLayout';
import Home from './Home';
import { injectReducer } from '../store/reducers';
import ROUTES from './routes';

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

const handleRouteChange = (store, prevState, nextState, replace) => {
  authTransition(store, nextState, replace)
}

const handleRouteOnEnter = (store, nextState, replace) => {
  authTransition(store, nextState, replace)
}

const authTransition = (store, nextState, replace) => {
  const pathname = nextState.location.pathname
  const { currentUser, keywords } = store.getState()

  if(pathname.startsWith('/dashboard')) {
    validateClient(currentUser, replace)
    validateKeywords(keywords, replace)
  }

  if(pathname.startsWith('/admin/dashboard')) {
    validateAdmin(currentUser, replace)
  }
}


const validateClient = (currentUser, replace) => {
  const isProspect = currentUser.role === 'prospect'
  const isClient = currentUser.role === 'client'
  const auth_token = localStorage.getItem('authToken')

  !auth_token && replace('/login')
  auth_token && isProspect && replace('/payment-info')
}

const validateAdmin = (currentUser, replace) => {
  const isAdmin = currentUser.role === 'admin'
  const auth_token = localStorage.getItem('authToken')

  !auth_token && replace('/login')
  !isAdmin && replace('/login')
}

const validateKeywords = (keywords, replace) => {
  !keywords && replace('/keywords')
}


export const createRoutes = (store) => ({
    path: '/',
    component: DefaultLayout,
    indexRoute: Home,
    childRoutes: ROUTES,
    onEnter: (nextState, replace) => {
      handleRouteOnEnter(store, nextState, replace)
    },
    onChange: (prevState, nextState, replace) => {
      handleRouteChange(store, prevState, nextState, replace)
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
