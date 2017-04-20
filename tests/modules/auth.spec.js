import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import BlitzApi from 'services/BlitzApi';
import { BASE_URL } from 'consts/apis';
import { PAYMENT_SUCCESS } from 'routes/client/Payment/modules/payment';
import {
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_SIGNUP_POSTING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_POSTING,
  USER_LOGOUT,
  logoutUser,
  postUserSignup,
  postUserLogin,
  postingUserSignup,
  receiveUserSignup,
  receiveUserSignupError,
  postingUserLogin,
  receiveUserLogin,
  receiveUserLoginError,
  SIGNUP_REQUEST,
  LOGIN_REQUEST,
  default as reducer
} from 'modules/auth'

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

  describe('(Action Creator) receiveUserSignupError', () => {
    it('Should return an action with type "USER_SIGNUP_FAILURE"', () => {
      expect(receiveUserSignupError()).to.have.property('type', USER_SIGNUP_FAILURE)
    })

    it('Should return an action with error', () => {
      let error = {testErrorMessage: 'errorMessage'}
      expect(receiveUserSignupError(error)).to.have.property('error', error)
    })
  })

  describe('(Action Creator) postingUserLogin', () => {
    it('Should return an action with type "USER_LOGIN_POSTING"', () => {
      expect(postingUserLogin()).to.have.property('type', USER_LOGIN_POSTING)
    })
  })

  describe('(Action Creator) receiveUserLogin', () => {
    it('Should return an action with type "USER_LOGIN_SUCCESS"', () => {
      let data = {test: 'login'}
      expect(receiveUserLogin()).to.have.property('type', USER_LOGIN_SUCCESS)
    })

    it('Should return an action with', () => {
      let data = {test: 'login'}
      expect(receiveUserLogin(data)).to.have.property('data', data)
    })
  })

  describe('(Action Creator) receiveUserLoginError', () => {
    it('Should return an action with type "USER_LOGIN_FAILURE"', () => {
      expect(receiveUserLoginError()).to.have.property('type', USER_LOGIN_FAILURE)
    })

    it('Should return an action with error', () => {
      let error = {testErrorMessage: 'errorMessage'}
      expect(receiveUserLoginError(error)).to.have.property('error', error)
    })
  })

  describe('(Action Creator) logoutUser', () => {
    it('Should return an action with type USER_LOGOUT', () => {
      expect(logoutUser()).to.have.property('type', USER_LOGOUT)
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
            access_token: '1:aaaaaaaaaaa',
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

      const fakeResponse = {
        id: 1,
        first_name: 'Fred',
        last_name: 'Flintstone',
        email: 'fred@email.com',
        role: 'client',
        access_token: '1:aaaaaaaaaaa',
        account_id: 1,
        isFetching: false
      }

      //moxios.wait(() => {
        //const request = moxios.requests.mostRecent();
        //request.respondWith({
          //status: 200,
          //response: fakeResponse,
        //});
      //});

      const resolved = new Promise((r) => r({ data: fakeResponse }));
      loginApi.returns(resolved);

      const expectedActions = [
        { type: USER_LOGIN_POSTING },
        { type: USER_LOGIN_SUCCESS, data: fakeResponse }
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

      //moxios.wait(() => {
        //const request = moxios.requests.mostRecent();
        //request.reject(errRes);
      //});

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

  describe('(Reducer)', () => {

    const fakeResponse = {
      id: 1,
      first_name: 'Fred',
      last_name: 'Flintstone',
      email: 'fred@email.com',
      role: 'client',
      access_token: '1:aaaaaaaaaaa',
      accounts: [ { id: 1 } ],
    }

    const {
      id,
      first_name,
      last_name,
      email,
      role,
      access_token
    } = fakeResponse

    const currentUserSuccess = {
      id,
      first_name,
      last_name,
      email,
      role,
      access_token,
      account_id: 1,
      isFetching: false
    }

    const currentUserBeforePayment = {
      id,
      first_name,
      last_name,
      email,
      role: 'prospect',
      access_token,
      account_id: 1,
      isFetching: false
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
        data: { user: fakeResponse }}))
        .to.eql(currentUserSuccess)
    })

    it('should handle USER_LOGIN_FAILURE', () => {
      expect(reducer({ isFetching: true },
       { type: USER_LOGIN_FAILURE, error: error }))
       .to.eql(currentUserFailure)
    })

    it('should handle USER_LOGOUT', () => {
      expect(reducer(currentUserSuccess, { type: USER_LOGOUT }))
      .to.eql({
        id: undefined,
        access_token: undefined,
        first_name,
        last_name,
        email,
        role,
        account_id: 1,
        isFetching: false
      })
    })

    it('should update user role PAYMENT_SUCCESS', () => {
      expect(reducer(currentUserBeforePayment, {
        type: PAYMENT_SUCCESS,
        user: currentUserSuccess
      }))
      .to.eql(currentUserSuccess)
    })
  })
})
