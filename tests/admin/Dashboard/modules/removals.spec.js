import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import clickadillyApi from 'services/clickadillyApi';
import {
  ADMIN_REQUESTED_REMOVALS_PENDING,
  ADMIN_REQUESTED_REMOVALS_SUCCESS,
  ADMIN_REQUESTED_REMOVALS_FAILURE,
  ADMIN_COMPLETED_REMOVALS_SUCCESS,
  ADMIN_REMOVAL_COMPLETED_REQUEST,
  UPDATING_STATUS,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAILURE,
  ADMIN_REMOVAL_REQUEST_PATH,
  getRemovals,
  getRemovalsRequested,
  getRemovalsCompleted,
  updateStatus,
  gettingRemovalRequests,
  receivedRemovalRequests,
  receivedRemovalsCompleted,
  rejectedRemovalRequests,
  updatingStatus,
  receivedUpdateStatus,
  rejectedUpdateStatus,
  updateRemovals,
  default as reducer
} from 'routes/admin/Dashboard/Removals/modules/removalRequests';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const requestedRemovals = {
  isFetching: false,
  monitoring_requests: [
    {
      id: 154,
      site: "radaris.com",
      status: "requested",
      status_label: "Pending",
      client_name: "test name",
      age: 17,
      addresses: ['123'],
      is_active: false
    }
  ],
  meta: {
    pagination: {
      page: 1,
      limit: 20,
      total: 10
    }
  }
}

const completedRemovals = {
  isFetching: false,
  monitoring_request_receipts: [
    {
      id: 154,
      site: "radaris.com",
      status: "completed",
      client_name: "test name",
      age: 17,
      addresses: ['123'],
    }
  ],
  meta: {
    pagination: {
      page: 1,
      limit: 20,
      total: 10
    }
  }
}

const requestedRemoval = {
  id: 154,
  site: "radaris.com",
  status: "inprogress",
  status_label: "Pending",
  client_name: "test name",
  age: 17,
  addresses: ['123'],
  is_active: false
}

const errRes = {
  status: 400,
  response: { data: { errorMessage: 'error message' } },
}

describe('(RequestedMovals module)', () => {

  it('should export constants', () => {
    expect(ADMIN_REQUESTED_REMOVALS_PENDING).to.equal('ADMIN_REQUESTED_REMOVALS_PENDING')
    expect(ADMIN_REQUESTED_REMOVALS_SUCCESS).to.equal('ADMIN_REQUESTED_REMOVALS_SUCCESS')
    expect(ADMIN_REQUESTED_REMOVALS_FAILURE).to.equal('ADMIN_REQUESTED_REMOVALS_FAILURE')
    expect(ADMIN_COMPLETED_REMOVALS_SUCCESS).to.equal('ADMIN_COMPLETED_REMOVALS_SUCCESS')
    expect(UPDATING_STATUS).to.equal('UPDATING_STATUS')
    expect(UPDATE_STATUS_SUCCESS).to.equal('UPDATE_STATUS_SUCCESS')
    expect(UPDATE_STATUS_FAILURE).to.equal('UPDATE_STATUS_FAILURE')
    expect(ADMIN_REMOVAL_REQUEST_PATH).to.equal('/admin/api/monitoring-requests')
    expect(ADMIN_REMOVAL_COMPLETED_REQUEST).to.equal('/admin/api/monitoring-request-receipts/search')
  })

  describe('(Action Creator) gettingRemovalRequests', () => {
    it('Should return a type with "ADMIN_REQUESTED_REMOVALS_PENDING"', () => {
      expect(gettingRemovalRequests()).to.have.property('type', ADMIN_REQUESTED_REMOVALS_PENDING)
    })
  })

  describe('(Action Creator) receivedRemovalRequests', () => {
    it('Should return a type with "ADMIN_REQUESTED_REMOVALS_SUCCESS"', () => {
      expect(receivedRemovalRequests()).to.have.property('type', ADMIN_REQUESTED_REMOVALS_SUCCESS)
    })

    it('Should return an action with requestedRemovals',  () => {
      expect(receivedRemovalRequests(requestedRemovals)).to.have.property('requestedRemovals', requestedRemovals)
    })
  })

  describe('(Action Creator) rejectedRemovalRequests', () => {
    it('Should return a type with "ADMIN_REQUESTED_REMOVALS_FAILURE"', () => {
      expect(rejectedRemovalRequests()).to.have.property('type', ADMIN_REQUESTED_REMOVALS_FAILURE)
    })

    it('Should return an action with error', () => {
      let error = {testErrorMessage: 'errorMessage'}
      expect(rejectedRemovalRequests(error)).to.have.property('error', error)
    })
  })

  describe('(Action Creator) receivedRemovalsCompleted', () => {
    it('Should return a type with "ADMIN_COMPLETED_REMOVALS_SUCCESS"', () => {
      expect(receivedRemovalsCompleted()).to.have.property('type', ADMIN_COMPLETED_REMOVALS_SUCCESS)
    })
  })

  describe('(Action Creator) updatingStatus', () => {
    it('Should return a type with "UPDATING_STATUS"', () => {
      expect(updatingStatus()).to.have.property('type', UPDATING_STATUS)
    })
  })

  describe('(Action Creator) receivedUpdateStatus', () => {
    it('Should return a type with ""', () => {
      expect(receivedUpdateStatus()).to.have.property('type', UPDATE_STATUS_SUCCESS)
    })

    it('Should return an action with data', () => {
      expect(receivedUpdateStatus(requestedRemoval)).to.have.property('requestedRemoval', requestedRemoval)
    })
  })

  describe('(Action Creator) rejectedUpdateStatus', () => {
    it('Should return a type with "rejectedUpdateStatus"', () => {
      expect(rejectedUpdateStatus()).to.have.property('type', UPDATE_STATUS_FAILURE)
    })

    it('Should return an action with error', () => {
      let error = {errorMessage: 'error message'}
      expect(rejectedUpdateStatus(error)).to.have.property('error', error )
    })
  })

  describe('(Splitting reducers) updateRemovals', () => {
    it('Should remove updated requestedRemoval', () => {
      let action = {requestedRemoval}
      let result = updateRemovals(requestedRemovals.monitoring_requests, action)

      expect(result).to.be.an('array')
      expect(result.length).to.eql(0)
    })
  })

  describe('(Async Action Creator) getRemovalsRequested', () => {

    let requestedRemovalsApi;

    beforeEach(() => {
      requestedRemovalsApi = sinon.stub(clickadillyApi, 'get')
    })

    afterEach(() => {
      requestedRemovalsApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(getRemovalsRequested).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(getRemovalsRequested()).to.be.a('function')
    })

    it('creates ADMIN_REQUESTED_REMOVALS_SUCCESS', (done) => {
      const  fakeResponse =  [{id: 1}, {id: 2}]


      const resolved = new Promise((r) => r({ data: fakeResponse }));
      requestedRemovalsApi.returns(resolved);

      const expectedActions = [
        { type: ADMIN_REQUESTED_REMOVALS_PENDING},
        { type: ADMIN_REQUESTED_REMOVALS_SUCCESS, requestedRemovals: fakeResponse}
      ]

      const store = mockStore({ requestedRemovals: {} })

      return store.dispatch(getRemovalsRequested())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('creates ADMIN_REQUESTED_REMOVALS_FAILURE', (done) => {
      const rejected = new Promise((_, r) => r(errRes));
      requestedRemovalsApi.returns(rejected);

      const expectedActions = [
        { type: ADMIN_REQUESTED_REMOVALS_PENDING},
        { type: ADMIN_REQUESTED_REMOVALS_FAILURE, error: errRes }
      ]

      const store = mockStore({ requestedRemovals: {} })

      return store.dispatch(getRemovalsRequested())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('(Async Action Creator) getRemovalsRequested', () => {

    let requestedRemovalsApi;

    beforeEach(() => {
      requestedRemovalsApi = sinon.stub(clickadillyApi, 'get')
    })

    afterEach(() => {
      requestedRemovalsApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(getRemovalsCompleted).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(getRemovalsCompleted()).to.be.a('function')
    })

    it('creates ADMIN_COMPLETED_REMOVALS_SUCCESS', done => {
      const  fakeResponse =  [{id: 1}, {id: 2}]


      const resolved = new Promise((r) => r({ data: fakeResponse }));
      requestedRemovalsApi.returns(resolved);

      const expectedActions = [
        { type: ADMIN_REQUESTED_REMOVALS_PENDING},
        { type: ADMIN_COMPLETED_REMOVALS_SUCCESS, data: fakeResponse }
      ]

      const store = mockStore({ requestedRemovals: {} })

      return store.dispatch(getRemovalsCompleted())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('(Async Action Creator) updateStatus', () => {
    let requestedRemovalsApi;

    beforeEach(() => {
      requestedRemovalsApi = sinon.stub(clickadillyApi, 'patch')
    })

    afterEach(() => {
      requestedRemovalsApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(updateStatus).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(updateStatus()).to.be.a('function')
    })

    it('creates UPDATE_STATUS_SUCCESS', (done) => {

      const resolved = new Promise((r) => r({ data: requestedRemoval }));
      requestedRemovalsApi.returns(resolved);

      const expectedActions = [
        { type: UPDATING_STATUS},
        { type: UPDATE_STATUS_SUCCESS, requestedRemoval}
      ]

      const store = mockStore({ requestedRemovals: {} })

      return store.dispatch(updateStatus())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('creates UPDATE_STATUS_FAILURE', (done) => {
      const rejected = new Promise((_, r) => r(errRes));
      requestedRemovalsApi.returns(rejected);

      const expectedActions = [
        { type: UPDATING_STATUS},
        { type: UPDATE_STATUS_FAILURE, error: errRes }
      ]

      const store = mockStore({ requestedRemovals: {} })

      return store.dispatch(updateStatus())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('(Reducer)', () => {

    it('Should be a function.', () => {
      expect(reducer).to.be.a('function')
    })

    it('Should initilaize with an object.', () => {
      expect(reducer(undefined, {})).to.be.an('object')
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = reducer({isFetching: false}, { type: ADMIN_REQUESTED_REMOVALS_PENDING })
      expect(state).to.be.an('object')
      expect(state).to.have.property('isFetching', true)
      state = reducer(state, { type: 'NOT_ACTION' })
      expect(state).to.have.property('isFetching', true)
    })

    it('should handle ADMIN_REQUESTED_REMOVALS_PENDING', () => {
      expect(reducer({}, {
        type: ADMIN_REQUESTED_REMOVALS_PENDING }))
        .to.eql( { isFetching: true })
    })

    it('should handle ADMIN_REQUESTED_REMOVALS_SUCCESS', () => {
      expect(reducer({}, {
        type: ADMIN_REQUESTED_REMOVALS_SUCCESS,
        requestedRemovals
      }))
      .to.eql({
        isFetching: false,
        all: requestedRemovals.monitoring_requests,
        pagination: requestedRemovals.meta.pagination
      })
    })

    it('should handle ADMIN_COMPLETED_REMOVALS_SUCCESS', () => {
      const state = reducer({}, { type: ADMIN_COMPLETED_REMOVALS_SUCCESS, data: completedRemovals })
      const expected = { isFetching: false, completed: completedRemovals.monitoring_request_receipts, pagination: completedRemovals.meta.pagination }

      expect(state).to.eql(expected)
    })

    it('shoulde handle ADMIN_REQUESTED_REMOVALS_FAILURE', () => {
      expect(reducer({}, {
        type: ADMIN_REQUESTED_REMOVALS_FAILURE,
        error: errRes
      }))
      .to.eql({
        isFetching: false,
        error: errRes
      })
    })

    it('should handle UPDATE_STATUS_SUCCESS', () => {
      const requestedRemovalsState = {
        isFetching: false,
        all: [],
        pagination: {
          page: 1,
          limit: 20,
          total: 10
        }
      }

      expect(reducer(requestedRemovalsState, {
        type: UPDATE_STATUS_SUCCESS,
        requestedRemoval
      }))
      .to.eql({
        isFetching: false,
        all: [],
        pagination: requestedRemovals.meta.pagination
      })
    })
  })
})
