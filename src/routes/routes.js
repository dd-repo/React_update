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
              cb(null, require('./signup/Payment').default);
            }, 'payment-info');
        }
    },
    {
      path: '/keywords',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./signup/Keywords').default);
        }, 'keywords');
      }
    },

    // client dashboard
    {
      path: '/dashboard',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./client/Dashboard').default);
        }, 'client-dashboard');
      }
    },
    {
      path: '/dashboard/google-results',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./client/GoogleResults').default);
        }, 'dashboard-googleResults');
      }
    },
    {
      path: '/dashboard/user-profile/edit',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./client/Profile/Edit').default);
        }, 'dashboard-profile-edit');
      }
    },
    {
        path: '/dashboard/privacy',
        getComponent: (nextState, cb) => {
            require.ensure([], require => {
              cb(null, require('./client/Monitoring').default);
            }, 'dashboard-monitoring');
        }
    },
    {
      path: '/dashboard/account',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
              cb(null, require('./client/Account').default);
        }, 'dashboard-account');
      }
    },
    {
      path: '/dashboard/feedback',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
              cb(null, require('./client/Feedback').default);
        }, 'dashboard-feedback');
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
          cb(null, require('./admin/Dashboard/Users/Client').default);
        }, 'admin-dashboard-user-edit');
      }
    },
    {
      path: '/admin/dashboard/users/admin/:id',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./admin/Dashboard/Users/Admin').default);
        }, 'admin-dashboard-admin-edit');
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

    // public
    {
      path: '/terms-of-service',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./Pages/TermsOfService').default);
        }, 'terms-of-service');
      }
    },
    {
      path: '/privacy-policy',
      getComponent: (nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./Pages/PrivacyPolicy').default);
        }, 'privacy-policy');
      }
    },
    {
      path: '*',
      component: require('./Pages/NotFound').default
    }
];
