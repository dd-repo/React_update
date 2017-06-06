import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import BlitzApi from 'services/BlitzApi';
import BASE_URL from 'consts/baseUrl';
import { PAYMENT_SUCCESS } from 'routes/client/Payment/modules/payment';
import {
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_SIGNUP_POSTING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_POSTING,
  USER_LOGOUT,
  postUserSignup,
  postUserLogin,
  postingUserSignup,
  receiveUserSignup,
  receiveUserSignupFailure,
  postingUserLogin,
  receiveClientLogin,
  receiveAdminLogin,
  receiveUserLoginFailure,
  logout,
  fetchUser,
  SIGNUP_REQUEST,
  LOGIN_REQUEST,
  default as reducer
} from 'routes/auth/modules/auth'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('(auth module) Auth', () => {

  it('Should export a constants.', () => {
    expect(USER_SIGNUP_SUCCESS).to.equal('USER_SIGNUP_SUCCESS')
    expect(USER_SIGNUP_FAILURE).to.equal('USER_SIGNUP_FAILURE')
    expect(USER_SIGNUP_POSTING).to.equal('USER_SIGNUP_POSTING')
    expect(USER_LOGIN_SUCCESS).to.equal('USER_LOGIN_SUCCESS')
    expect(USER_LOGIN_FAILURE).to.equal('USER_LOGIN_FAILURE')
    expect(USER_LOGIN_POSTING).to.equal('USER_LOGIN_POSTING')
    expect(USER_LOGOUT).to.equal('USER_LOGOUT')
  })

  describe('(Action Creator) postingUserSignup', () => {
    it('Should return an action with type "USER_SIGNUP_POSTING"', () => {
      expect(postingUserSignup()).to.have.property('type', USER_SIGNUP_POSTING)
    })
  })

  describe('(Action Creator) receiveUserSignup', () => {
    it('Should return an action with type "USER_SIGNUP_SUCCESS"', () => {
      expect(receiveUserSignup()).to.have.property('type', USER_SIGNUP_SUCCESS)
    })

    it('Should return an action with data',  () => {
      let data = {test: 'signup'}
      expect(receiveUserSignup(data)).to.have.property('data', data)
    })
  })

  describe('(Action Creator) receiveUserSignupFailure', () => {
    it('Should return an action with type "USER_SIGNUP_FAILURE"', () => {
      expect(receiveUserSignupFailure()).to.have.property('type', USER_SIGNUP_FAILURE)
    })

    it('Should return an action with error', () => {
      let error = {testErrorMessage: 'errorMessage'}
      expect(receiveUserSignupFailure(error)).to.have.property('error', error)
    })
  })

  describe('(Action Creator) postingUserLogin', () => {
    it('Should return an action with type "USER_LOGIN_POSTING"', () => {
      expect(postingUserLogin()).to.have.property('type', USER_LOGIN_POSTING)
    })
  })

  describe('(Action Creator) receiveClientLogin', () => {
    it('Should return an action with type "USER_LOGIN_SUCCESS"', () => {
      let data = {test: 'login'}
      expect(receiveClientLogin()).to.have.property('type', USER_LOGIN_SUCCESS)
    })

    it('Should return an action with', () => {
      let data = {test: 'login'}
      expect(receiveClientLogin(data)).to.have.property('data', data)
    })
  })

  describe('(Action Creator) receiveUserLoginFailure', () => {
    it('Should return an action with type "USER_LOGIN_FAILURE"', () => {
      expect(receiveUserLoginFailure()).to.have.property('type', USER_LOGIN_FAILURE)
    })

    it('Should return an action with error', () => {
      let error = {testErrorMessage: 'errorMessage'}
      expect(receiveUserLoginFailure(error)).to.have.property('error', error)
    })
  })

  describe('(Action Creator) logout', () => {
    it('Should return an action with type "USER_LOGOUT"', () => {
      expect(logout()).to.have.property('type', USER_LOGOUT)
    })
  })

  describe('(Async Action Creator) postUserSignup', () => {

    let signupApi;

    beforeEach(() => {
      signupApi = sinon.stub(BlitzApi, 'post')
    })

    afterEach(() => {
      signupApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(postUserSignup).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(postUserSignup()).to.be.a('function')
    })

    it('creates USER_SIGNUP_SUCCESS when signing up user', (done) => {
      const payload = {
        user:
          {
            first_name: 'Fred',
            last_name: 'Flintstone',
            email: 'fred@email.com',
            password: 'password'
          }
      }

      const fakeResponse = {
            id: 1,
            first_name: 'Fred',
            last_name: 'Flintstone',
            email: 'fred@email.com',
            role: 'client',
            authToken: '1:aaaaaaaaaaa',
            account_id: 1,
            isFetching: false
      }

      const resolved = new Promise((r) => r({ data: fakeResponse }));
      signupApi.returns(resolved);


      const expectedActions = [
        { type: USER_SIGNUP_POSTING },
        { type: USER_SIGNUP_SUCCESS, data: fakeResponse }
      ]

      const store = mockStore({ currentUser: {} })

      return store.dispatch(postUserSignup(payload))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    })

    it('creates USER_SIGNUP_FAILURE when signing up user', (done) => {

      const payload = {
        user:
          {
            first_name: 'Fred',
            last_name: 'Flintstone',
            email: 'fred@email.com',
            password: 'password'
          }
      }

      const errRes = {
        status: 400,
        response: { data: { errorMessage: 'error message' } },
      }

      const rejected = new Promise((_, r) => r(errRes));
      signupApi.returns(rejected)

      //moxios.wait(() => {
        //const request = moxios.requests.mostRecent();
        //request.reject(errRes);
      //});

      const expectedActions = [
        { type: USER_SIGNUP_POSTING },
        { type: USER_SIGNUP_FAILURE, error: {
          status: 400,
          response: {
            data: { errorMessage: 'error message' }
          }}
        }
      ]

      const store = mockStore({ currentUser: {} })

      return store.dispatch(postUserSignup(payload))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    })
  })

  describe('(Async Action Creator), postUserLogin()', () => {

    let loginApi;

    beforeEach(() => {
    loginApi = sinon.stub(BlitzApi, 'post')
    })

    afterEach(() => {
      loginApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(postUserLogin).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(postUserLogin()).to.be.a('function')
    })

    it('creates USER_LOGIN_SUCCESS when logging in a user', (done) => {
      const payload = {
        user:
          {
            email: 'fred@email.com',
            password: 'password'
          }
      }

      const user = {
        user: {
          id: 1,
          first_name: 'Fred',
          last_name: 'Flintstone',
          email: 'fred@email.com',
          role: 'client',
          access_token: '1:aaaaaaaaaaa',
          account_id: 1,
          isFetching: false
        }
      }

      const resolved = new Promise((r) => r({ data: user }));
      loginApi.returns(resolved);

      const expectedActions = [
        { type: USER_LOGIN_POSTING },
        { type: USER_LOGIN_SUCCESS, data: user }
      ]

      const store = mockStore({ currentUser: {} })

      return store.dispatch(postUserLogin(payload))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    })

    it('creates USER_LOGIN_FAILURE when logging in user', (done) => {

      const payload = {
        user:
          {
            email: 'fred@email.com',
            password: 'password'
          }
      }

      const errRes = {
        status: 400,
        response: { data: { errorMessage: 'error message' } },
      }

      const rejected = new Promise((_, r) => r(errRes));
      loginApi.returns(rejected)

      const expectedActions = [
        { type: USER_LOGIN_POSTING },
        { type: USER_LOGIN_FAILURE, error: {
          status: 400,
          response: {
            data: { errorMessage: 'error message' }
          }}
        }
      ]

      const store = mockStore({ currentUser: {} })

      return store.dispatch(postUserLogin(payload))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    })
  })

  describe('(Async Action Creator), fetchUser()', () => {

    let loginApi;

    beforeEach(() => {
    loginApi = sinon.stub(BlitzApi, 'get')
    })

    afterEach(() => {
      loginApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(fetchUser).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(fetchUser()).to.be.a('function')
    })

    it('creates USER_LOGIN_SUCCESS when fetching user', (done) => {

      const user = {
        user: {
          id: 1,
          first_name: 'Fred',
          last_name: 'Flintstone',
          email: 'fred@email.com',
          role: 'client',
          access_token: '1:aaaaaaaaaaa',
          account_id: 1,
          isFetching: false
        },
        account: {
          id: 1,
          is_active: true,
          email: 'email.com',
          first_name: 'first',
          last_name: 'last',
          keywords: [{id: 1, keyword: 'keyword 1'}, {id: 2, keyword: 'keyword 2'}],
          profile: {id: 1, maiden_name: 'maiden', middle_name: 'middle', avatar: '', drivers_license: ''}
        }
      }

      const resolved = new Promise((r) => r({ data: user }));
      loginApi.returns(resolved);

      const expectedActions = [
        { type: USER_LOGIN_POSTING },
        { type: USER_LOGIN_SUCCESS, data: user }
      ]

      const store = mockStore({ currentUser: {} })

      return store.dispatch(fetchUser())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    })

   it('creates USER_LOGIN_FAILURE when fetching user', (done) => {

      const errRes = {
        status: 400,
        response: { data: { errorMessage: 'error message' } },
      }

      const rejected = new Promise((_, r) => r(errRes));
      loginApi.returns(rejected)

      const expectedActions = [
        { type: USER_LOGIN_POSTING },
        { type: USER_LOGIN_FAILURE, error: {
          status: 400,
          response: {
            data: { errorMessage: 'error message' }
          }}
        }
      ]

      const store = mockStore({ currentUser: {} })

      return store.dispatch(fetchUser())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    })
  })

  describe('(Reducer)', () => {

    const fakeResponse = {
      user: {
        id: 1,
        first_name: 'Fred',
        last_name: 'Flintstone',
        email: 'fred@email.com',
        role: 'client',
        group: 'frontend',
        accounts: [ { id: 1 } ],
      },
      auth_token: 'authToken'
    }

    const fakePaymentResponse = {
      id: 1,
      first_name: 'Fred',
      last_name: 'Flintstone',
      email: 'fred@email.com',
      role: 'client',
      group: 'frontend',
      accounts: [ { id: 1 } ],
    }

    const {
      id,
      first_name,
      last_name,
      email,
      role,
      group,
    } = fakeResponse.user

    const currentUserSuccess = {
      id,
      first_name,
      last_name,
      email,
      role,
      group,
      account_id: 1,
      isFetching: false,
      authToken: fakeResponse.auth_token
    }

    const loggedOutUser = {
      id: null,
      first_name: null,
      last_name: null,
      email: null,
      role: null,
      group: null,
      account_id: null,
      authToken: null,
      isFetching: false
    }

    const currentUserBeforePayment = {
      id,
      first_name,
      last_name,
      email,
      role: 'prospect',
      group,
      account_id: 1,
      isFetching: false,
      authToken: fakeResponse.auth_token
    }

    const error = {
      response: {
        data: {
          errorMessage: 'error message'
        }
      }
    }

    const currentUserFailure = {
      errorMessage: 'error message',
      isFetching: false
    }

    it('Should be a function.', () => {
      expect(reducer).to.be.a('function')
    })

    it('Should initilaize with a currentUser object.', () => {
      expect(reducer(undefined, {})).to.be.an('object')
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = reducer({}, { type: USER_SIGNUP_POSTING })
      expect(state).to.be.an('object')
      expect(state).to.have.property('isFetching', true)
      state = reducer(state, { type: 'NOT_AUTH_ACTION' })
      expect(state).to.have.property('isFetching', true)
    })

    it('should handle USER_SIGNUP_POSTING', () => {
      expect(reducer({}, {
        type: USER_SIGNUP_POSTING }))
        .to.eql( { isFetching: true })
    })

    it('should handle USER_SIGNUP_SUCCESS', () => {
      expect(reducer({ isFetching: true }, {
        type: USER_SIGNUP_SUCCESS,
        data: fakeResponse }))
       .to.eql(currentUserSuccess)
    })

    it('should handle USER_SIGNUP_FAILURE', () => {
      expect(reducer({ isFetching: true },
       { type: USER_SIGNUP_FAILURE, error: error }))
       .to.eql(currentUserFailure)
    })

    it('should handle USER_LOGIN_POSTING', () => {
      expect(reducer(
        {},
        { type: USER_LOGIN_POSTING }))
        .to.eql( { isFetching: true })
    })

    it('should handle USER_LOGIN_SUCCESS', () => {
      expect(reducer({ isFetching: true }, {
        type: USER_LOGIN_SUCCESS,
        data: fakeResponse }))
        .to.eql(currentUserSuccess)
    })

    it('should handle USER_LOGIN_FAILURE', () => {
      expect(reducer({ isFetching: true },
       { type: USER_LOGIN_FAILURE, error: error }))
       .to.eql(currentUserFailure)
    })

    it('should update user role PAYMENT_SUCCESS', () => {
      //console.log('payment success', reducer(currentUserBeforePayment, {type: PAYMENT_SUCCESS, user: fakePaymentResponse}))
      //console.log('payment success', currentUserSuccess)
      //console.log('payment before', currentUserBeforePayment)
      //console.log('fake payment', fakePaymentResponse)
      expect(reducer(currentUserBeforePayment, {
        type: PAYMENT_SUCCESS,
        user: fakePaymentResponse
      }))
      .to.eql(currentUserSuccess)
    })

    it('should clear currentUser LOGOUT_USER', () => {
      expect(reducer(currentUserSuccess, {
        type: USER_LOGOUT
      }))
      .to.eql(loggedOutUser)
    })
  })
})
