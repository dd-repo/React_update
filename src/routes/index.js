// We only need to import the modules necessary for initial render
import DefaultLayout from '../layouts/DefaultLayout'
import Home from './Home'
import ROUTES from './routes'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

const handleRouteChange = (store, prevState, nextState, replace) => {
  const authToken = localStorage.getItem('authToken')
  const args = {store, nextState, replace, authToken}

  authTransition(args)
}

const handleRouteOnEnter = (store, nextState, replace) => {
  const authToken = localStorage.getItem('authToken')
  const args = {store, nextState, replace, authToken}

  authTransition(args)
}

const authTransition = ({store, nextState, replace, authToken}) => {
  const pathname = nextState.location.pathname
  const { currentUser, account: { keywords } } = store.getState()

  if (pathname.startsWith('/dashboard')) {
    isValidClient(currentUser, replace, authToken) &&
      validateKeywords(keywords, replace)
  }

  if (pathname.startsWith('/admin/dashboard')) {
    validateAdmin(currentUser, replace, authToken)
  }

  if (pathname.startsWith('/login')) {
    redirectToDashboardIfLoggedIn(store, nextState, replace, authToken)
  }

  if (pathname.startsWith('/signup')) {
    currentUser.role === 'prospect' && replace('/payment')
  }

  if (pathname.startsWith('/keywords')) {
    currentUser.role !== 'client' && replace('/signup')
  }
}

const isValidClient = (currentUser, replace, authToken) => {
  const isProspect = currentUser.role === 'prospect'
  const isClient = currentUser.role === 'client'

  !authToken && replace('/login')
  authToken && isProspect && replace('/payment')
  return isClient
}

const validateAdmin = (currentUser, replace, authToken) => {
  const isAdmin = currentUser.group === 'backend'

  !authToken && replace('/login')
  !isAdmin && replace('/login')
}

const validateKeywords = (keywords, replace) => {
  if (keywords.all) {
    keywords.all.length === 0 && replace('/keywords')
  }
  if (!keywords.all) {
    replace('/login')
  }
}

const redirectToDashboardIfLoggedIn = (store, nextState, replace, authToken) => {
  if (authToken) {
    const pathname = nextState.location.pathname
    const { currentUser } = store.getState()

    if (pathname === '/' || pathname === '/login') {
      currentUser.role === 'client' && replace('/dashboard')
      currentUser.group === 'backend' && replace('/admin/dashboard')
    }
  }
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
