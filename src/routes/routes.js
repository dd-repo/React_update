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
    {
      path: '/create-password(?:token=)',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./client/CreatePassword').default);
        }, 'password-create');
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
      path: '/dashboard/user-profile',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./client/Dashboard/Profile/Details').default);
        }, 'dashboard-profile-details');
      }
    },
    {
      path: '/dashboard/user-profile/edit',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./client/Dashboard/Profile/Edit').default);
        }, 'dashboard-profile-edit');
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
              cb(null, require('./admin/Dashboard/Removals').default);
            }, 'admin-dashboard-removals-pending');
        }
    },
    {
      path: '/admin/dashboard/removals/in-progress',
        getComponent: (nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./admin/Dashboard/Removals/RequestedRemovalsContainer').default);
            }, 'admin-dashboard-removals-in-progress');
        }
    },
    {
      path: '/admin/dashboard/client-signup',
        getComponent: (nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./admin/Dashboard/ClientSignup').default);
            }, 'admin-dashboard-removals-in-progress');
        }
    },
    {
        path: '*',
        component: require('./Pages/NotFound').default
    }
];
