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
              cb(null, require('./admin/Dashboard/Users').default);
            }, 'admin-dashboard-removals-pending');
        }
    },
    {
      path: '/admin/dashboard/removals/requested',
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
              cb(null, require('./admin/Dashboard/Removals').default);
            }, 'admin-dashboard-removals-pending');
        }
    },
    {
      path: '/admin/dashboard/removals/completed',
        getComponent: (nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./admin/Dashboard/Removals').default);
            }, 'admin-dashboard-removals-pending');
        }
    },
    {
      path: '/admin/dashboard/client-registration',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./admin/Dashboard/ClientRegistration').default);
        }, 'admin-dashboard-client-registration');
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
      path: '/admin/dashboard/users/clients',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./admin/Dashboard/Users').default);
        }, 'admin-dashboard-users-clients');
      }
    },
    {
      path: '/admin/dashboard/users/admin',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./admin/Dashboard/Users').default);
        }, 'admin-dashboard-users-admin');
      }
    },
    {
      path: '/admin/dashboard/users/client/:id',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./admin/Dashboard/User').default);
        }, 'admin-dashboard-user-edit');
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
      path: '/admin/dashboard/create-user',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./admin/Dashboard/CreateUser').default);
        }, 'admin-dashboard-create-user');
      }
    },
    {
      path: '*',
      component: require('./Pages/NotFound').default
    }
];
