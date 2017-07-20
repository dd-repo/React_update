import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BlitzApi from 'services/BlitzApi';

import { formatDate } from 'utils/dateHelper';

import {
  ACCOUNT_SUCCESS,
  ACCOUNT_FAILURE,
  USER_SUCCESS,
  ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILURE,
  fetchAccount,
  gettingAccount,
  receiveAccountSuccess,
  receiveAccountFailure,
  updateAccount,
  updateAccountSuccess,
  updateAccountFailure,
  default as reducer
} from 'routes/admin/Dashboard/User/modules/account';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const accountResponse = {
  id: 1,
  is_active: true,
  email: 'email.com',
  first_name: 'first',
  last_name: 'last',
}

const errorRes = {
  status: 400,
  response: {data: {errorMessage: 'error message'}}
}

describe('(Account module)', () => {

  it('should export constants', () => {
    expect(ACCOUNT_SUCCESS).to.equal('ACCOUNT_SUCCESS')
    expect(ACCOUNT_FAILURE).to.equal('ACCOUNT_FAILURE')
    expect(UPDATE_ACCOUNT_FAILURE).to.equal('UPDATE_ACCOUNT_FAILURE')
    expect(UPDATE_ACCOUNT_SUCCESS).to.equal('UPDATE_ACCOUNT_SUCCESS')
    expect(ACCOUNT_REQUEST).to.equal('/admin/api/accounts')
  })

  describe('(Action Creator) "receiveAccountSuccess"', () => {
    it('should return a type with "ACCOUNT_SUCCESS"', () => {
      expect(receiveAccountSuccess()).to.have.property('type', ACCOUNT_SUCCESS)
    })

    it('should return property with data', () => {
      expect(receiveAccountSuccess(accountResponse)).to.have.property('data', accountResponse)
    })
  })

  describe('(Action Creator) "updateAccountSuccess"', () => {
    it('should return a type with "UPDATE_ACCOUNT_SUCCESS"', () => {
      expect(updateAccountSuccess()).to.have.property('type', UPDATE_ACCOUNT_SUCCESS)
    })

    it('should return property with data', () => {
      expect(updateAccountSuccess(accountResponse)).to.have.property('data', accountResponse)
    })
  })

  describe('(Action Creator) "updateAccountFailure"', () => {
    it('should return a type with "UPDATE_ACCOUNT_FAILURE"', () => {
      expect(updateAccountFailure()).to.have.property('type', UPDATE_ACCOUNT_FAILURE)
    })

    it('should return property with data', () => {
      expect(updateAccountFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) "fetchAccount"', () => {
    let accountApi;

    beforeEach(() => {
      accountApi = sinon.stub(BlitzApi, 'get')
    })

    afterEach(() => {
      accountApi.restore()
    })

    it('should be exported as a function', () => {
      expect(fetchAccount).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(fetchAccount()).to.be.a('function')
    })

    it('creates ACCOUNT_SUCCESS', (done) => {
      const resolved = new Promise((r) => r({data: accountResponse}));
      accountApi.returns(resolved)

      const expectedActions = [
        { type: ACCOUNT_SUCCESS, data: accountResponse }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(fetchAccount())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('created ACCOUNT_FAILURE', done => {
      const rejected = new Promise((_, r) => r(errorRes));
      accountApi.returns(rejected)

      const expectedActions = [
        { type: ACCOUNT_FAILURE, error: errorRes }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(fetchAccount())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('(Async Action Creator) "updateAccount"', () => {
    let accountApi;

    beforeEach(() => {
      accountApi = sinon.stub(BlitzApi, 'patch')
    })

    afterEach(() => {
      accountApi.restore()
    })

    it('should be exported as a function', () => {
      expect(updateAccount).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(updateAccount()).to.be.a('function')
    })

    it('creates UPDATE_ACCOUNT_SUCCESS', (done) => {
      const resolved = new Promise((r) => r({data: accountResponse}));
      accountApi.returns(resolved)

      const expectedActions = [
        { type: UPDATE_ACCOUNT_SUCCESS, data: accountResponse }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(updateAccount({id: 1}))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('created UPDATE_ACCOUNT_FAILURE', done => {
      const rejected = new Promise((_, r) => r(errorRes));
      accountApi.returns(rejected)

      const expectedActions = [
        { type: UPDATE_ACCOUNT_FAILURE, error: errorRes }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(updateAccount({id: 1}))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('(Reducer)', () => {
    it('Should be a function', () => {
      expect(reducer).to.be.a('function')
    })

    it('should initialize with an object', () => {
      expect(reducer(undefined, {})).to.be.an('object')
    })

    it('should handle ACCOUNT_SUCCESS', () => {
      const userState = reducer({}, { type: ACCOUNT_SUCCESS, data: accountResponse})

      expect(userState).to.eql(accountResponse)
    })

    it('should handle UPDATE_ACCOUNT_SUCCESS', () => {
      const account = {
        id: 1,
        is_active: true,
        email: 'oldEmail.com',
        first_name: 'oldFirst',
        last_name: 'oldLast',
      }

      const updatedAccount = {
        id: 1,
        is_active: true,
        email: 'newEmail.com',
        first_name: 'newFirst',
        last_name: 'newLast',
      }
      const userState = reducer(account, { type: UPDATE_ACCOUNT_SUCCESS, data: updatedAccount})

      expect(userState).to.eql(updatedAccount)
    })

    //it('should handle ACCOUNT_FAILURE', () => {
      //const userState = reducer({}, { type: ACCOUNT_FAILURE, error: errorRes})

      //expect(userState).to.eql({errorMessage: errorRes.response.data.errorMessage})
    //})
  })
})
