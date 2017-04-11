export default [
  // Home
    {
        path: '/',
        /*  Async WebPack code split  */
        getComponent: (nextState, cb) => {
            require.ensure([], require => {
                cb(null, require('./Home').default);
            }, 'home');
        }
    },

    // Login
    {
        path: '/login',
        getComponent: (nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./client/Login').default);
            }, 'login');
        }
    },

    // client signup process
    {
        path: '/signup',
        getComponent: (nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./client/Signup').default);
            }, 'signup');
        }
    },
    {
        path: '/forgot-password',
        getComponent: (nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./client/ForgotPassword').default);
            }, 'forgotPassword');
        }
    },
    {
      path: '/payment-info',
        getComponent: (nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./client/Payment').default);
            }, 'payment-info');
        }
    },
    {
        path: '/keywords',
        getComponent: (nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./client/Keywords').default);
            }, 'keywords');
        }
    },

    // client dashboard
    {
      path: '/dashboard',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./client/Dashboard/GoogleResults').default);
        }, 'dashboard-googleResults');
      }
    },
    {
      path: '/dashboard/profile',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./client/Dashboard/Profile').default);
        }, 'dashboard-profile');
      }
    },
    {
        path: '/dashboard/privacy',
        getComponent: (nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./client/Dashboard/Monitoring').default);
            }, 'dashboard-monitoring');
        }
    },

     //admin dashboard
    {
      path: '/admin/dashboard',
        getComponent: (nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./admin/Dashboard/Monitoring').default);
            }, 'admin-dashboard');
        }
    },
    {
        path: '*',
        component: require('./Pages/NotFound').default
    }
];
