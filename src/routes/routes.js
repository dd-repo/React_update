export default [
  // Home
  {
    path: '/',
    /*  Async WebPack code split  */
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./Home').default)
      }, 'home')
    }
  },

  // auth
  {
    path: '/signup',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./signup/Signup').default)
      }, 'signup')
    }
  },
  {
    path: '/login',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./auth/Login').default)
      }, 'login')
    }
  },
  {
    path: '/create-password(?:token=)',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./auth/CreatePassword').default);
      }, 'password-create');
    }
  },
  {
    path: '/forgot-password',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./auth/ForgotPassword').default);
      }, 'forgotPassword');
    }
  },

  // client signup process
  {
    path: '/payment',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./signup/Payment').default);
      }, 'payment');
    }
  },
  {
    path: '/keywords',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./signup/Keywords').default);
      }, 'keywords');
    }
  },

  // client dashboard
  {
    path: '/dashboard',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./client/Dashboard').default);
      }, 'client-dashboard');
    }
  },
  {
    path: '/dashboard/google-results',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./client/GoogleResults').default);
      }, 'dashboard-googleResults');
    }
  },
  {
    path: '/dashboard/user-profile/edit',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./client/Profile/Edit').default);
      }, 'dashboard-profile-edit');
    }
  },
  {
    path: '/dashboard/privacy',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./client/Monitoring').default);
      }, 'dashboard-monitoring');
    }
  },
  {
    path: '/dashboard/account',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./client/Account').default);
      }, 'dashboard-account');
    }
  },
  {
    path: '/dashboard/feedback',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./client/Feedback').default);
      }, 'dashboard-feedback');
    }
  },

  //admin dashboard
  {
    path: '/admin/dashboard',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./admin/Users').default);
      }, 'admin-dashboard-users');
    }
  },
  {
    path: '/admin/dashboard/removals/requested',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./admin/Removals').default);
      }, 'admin-dashboard-removals');
    }
  },
  {
    path: '/admin/dashboard/removals/in-progress',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./admin/Removals').default);
      }, 'admin-dashboard-removals');
    }
  },
  {
    path: '/admin/dashboard/removals/completed',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./admin/Removals').default);
      }, 'admin-dashboard-removals');
    }
  },
  {
    path: '/admin/dashboard/client-registration',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./admin/ClientRegistration').default);
      }, 'admin-dashboard-client-registration');
    }
  },
  {
    path: '/admin/dashboard/transactions',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./admin/Transactions').default);
      }, 'admin-dashboard-transactions');
    }
  },
  {
    path: '/admin/dashboard/users/clients',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./admin/Users').default);
      }, 'admin-dashboard-users-clients');
    }
  },
  {
    path: '/admin/dashboard/users/admin',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./admin/Users').default);
      }, 'admin-dashboard-users-admin');
    }
  },
  {
    path: '/admin/dashboard/users/client/:id',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./admin/Users/Client').default);
      }, 'admin-dashboard-user-edit');
    }
  },
  {
    path: '/admin/dashboard/users/admin/:id',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./admin/Users/Admin').default);
      }, 'admin-dashboard-admin-edit');
    }
  },
  {
    path: '/admin/dashboard/subscriptions',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./admin/Subscriptions').default);
      }, 'admin-dashboard-subscriptions');
    }
  },
  {
    path: '/admin/dashboard/create-user',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./admin/CreateUser').default);
      }, 'admin-dashboard-create-user');
    }
  },

  // public
  {
    path: '/terms-of-service',
    getComponent: (location, cb) => {
      require.ensure([], require => {
        cb(null, require('./Pages/TermsOfService').default);
      }, 'terms-of-service');
    }
  },
  {
    path: '/privacy-policy',
    getComponent: (location, cb) => {
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
