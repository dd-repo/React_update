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

    // auth
    {
        path: '/signup',
        getComponent: (nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./auth/Signup').default);
            }, 'signup');
        }
    },
    {
        path: '/login',
        getComponent: (nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./auth/Login').default);
            }, 'login');
        }
    },
    {
      path: '/create-password(?:token=)',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./auth/CreatePassword').default);
        }, 'password-create');
      }
    },
    {
        path: '/forgot-password',
        getComponent: (nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./auth/ForgotPassword').default);
            }, 'forgotPassword');
        }
    },

    // client signup process
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
    {
      path: '/dashboard/account-settings',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
              cb(null, require('./client/Dashboard/AccountEdit').default);
        }, 'dashboard-account-settings');
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
      path: '/admin/dashboard/transactions',
        getComponent: (nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./admin/Dashboard/Transactions').default);
            }, 'admin-dashboard-transactions');
        }
    },
    {
      path: '/admin/dashboard/subscriptions',
        getComponent: (nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./admin/Dashboard/Subscriptions').default);
            }, 'admin-dashboard-subscriptions');
        }
    },
    {
        path: '*',
        component: require('./Pages/NotFound').default
    }
];
