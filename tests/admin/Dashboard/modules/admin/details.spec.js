import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import clickadillyApi from 'services/clickadillyApi';

import getFullName from 'utils/fullName';
import { formatDate } from 'utils';

import {
  RECEIVE_ADMIN_PENDING,
  RECEIVE_ADMIN_SUCCESS,
  RECEIVE_ADMIN_FAILURE,
  FETCH_ADMIN_REQUEST,
  fetchAdmin,
  gettingAdmin,
  receiveAdminSuccess,
  receiveAdminFailure,
  default as reducer
} from 'routes/admin/Dashboard/Admin/modules/admin';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const adminResponse = {
  id: 1,
  first_name: 'first',
  last_name: 'last',
  email: 'admin@email.com',
  group: 'backend',
  role: 'admin',
  is_active: true,
  created_at: "2017-07-17T08:47:42.858-07:00",
  active_until: "2017-07-17T08:47:42.858-07:00",
}

const errorRes = {
  status: 400,
  response: {data: {errorMessage: 'error message'}}
}

describe('(Admin module)', () => {

  it('should export constants', () => {
    expect(RECEIVE_ADMIN_PENDING).to.eql('RECEIVE_ADMIN_PENDING')
    expect(RECEIVE_ADMIN_SUCCESS).to.eql('RECEIVE_ADMIN_SUCCESS')
    expect(RECEIVE_ADMIN_FAILURE).to.eql('RECEIVE_ADMIN_FAILURE')
    expect(FETCH_ADMIN_REQUEST).to.eql('/admin/api/user')
  })

  describe('(Action Creator) "gettingAdmin"', () => {
    it('should return a type with "RECEIVE_ADMIN_PENDING"', () => {
      expect(gettingAdmin()).to.have.property('type', RECEIVE_ADMIN_PENDING)
    })
  })

  describe('(Action Creator) "receiveAdminSuccess"', () => {
    it('should return a type with "RECEIVE_ADMIN_SUCCESS"', () => {
      expect(receiveAdminSuccess()).to.have.property('type', RECEIVE_ADMIN_SUCCESS)
    })

    it('should return with data', () => {
      expect(receiveAdminSuccess(adminResponse)).to.have.property('data', adminResponse)
    })
  })

  describe('(Action Creator) "receiveAdminFailure"', () => {
    it('should return a type with "RECEIVE_ADMIN_FAILURE"', () => {
      expect(receiveAdminFailure()).to.have.property('type', RECEIVE_ADMIN_FAILURE)
    })

    it('should return an error', () => {
      expect(receiveAdminFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) "fetchAdmin"', () => {
    let adminApi;

    beforeEach(() => {
      adminApi = sinon.stub(clickadillyApi, 'get')
    })

    afterEach(() => {
      adminApi.restore()
    })

    it('should be exported as a function', () => {
      expect(fetchAdmin).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(fetchAdmin()).to.be.a('function')
    })

    it('creates RECEIVE_ADMIN_SUCCESS', done => {
      const resolved = new Promise((r) => r({data: adminResponse}));
      adminApi.returns(resolved)

      const expectedActions = [
        { type: RECEIVE_ADMIN_PENDING },
        { type: RECEIVE_ADMIN_SUCCESS, data: adminResponse }
      ]

      const store = mockStore({ admin: {} })

      return store.dispatch(fetchAdmin())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('creates RECEIVE_ADMIN_FAILURE', done => {
      const rejected = new Promise((_, r) => r(errorRes))
      adminApi.returns(rejected)

      const expectedActions = [
        { type: RECEIVE_ADMIN_PENDING },
        { type: RECEIVE_ADMIN_FAILURE, error: errorRes }
      ]

      const store = mockStore({ admin: {} })

      return store.dispatch(fetchAdmin())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('Reducer', () => {
    it('Should be a function', () => {
      expect(reducer).to.be.a('function')
    })

    it('should initialize with an object', () => {
      expect(reducer(undefined, {})).to.be.an('object')
    })

    it('should handle RECEIVE_ADMIN_PENDING', () => {
      const state = reducer({}, { type: RECEIVE_ADMIN_PENDING })
      const expected = { isFetching: true }

      expect(state).to.eql(expected)
    })

    it('shoulde handle RECEIVE_ADMIN_SUCCESS', () => {
      const state = reducer({}, { type: RECEIVE_ADMIN_SUCCESS, data: adminResponse })
      const expected = {
        id: adminResponse.id,
        first_name: adminResponse.first_name,
        fullName: getFullName(adminResponse),
        last_name: adminResponse.last_name,
        email: adminResponse.email,
        group: adminResponse.group,
        role: adminResponse.role,
        is_active: adminResponse.is_active,
        created_at: formatDate(adminResponse.created_at),
        active_until: formatDate(adminResponse.active_until),
        isFetching: false
      }

      expect(state).to.eql(expected)
    })

    it('should handle RECEIVE_ADMIN_FAILURE', () => {
      const state = reducer({}, { type: RECEIVE_ADMIN_FAILURE, error: errorRes })
      const expected = {
        isFetching: false,
        notification: {
          message: errorRes.response.data.errorMessage,
          status: 'danger'
        }
      }

      expect(state).to.eql(expected)
    })
  })
})

