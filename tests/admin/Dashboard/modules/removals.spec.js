import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import BlitzApi from 'services/BlitzApi';
import {
  ADMIN_REQUESTED_REMOVALS_PENDING,
  ADMIN_REQUESTED_REMOVALS_SUCCESS,
  ADMIN_REQUESTED_REMOVALS_FAILURE,
  UPDATING_STATUS,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAILURE,
  ADMIN_REMOVAL_REQUEST_PATH,
  getRemovalsRequested,
  updateStatus,
  gettingRemovalRequests,
  receivedRemovalRequests,
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
  all: [
    {
      id: 154,
      created_at: "2017-05-23T20:48:26.197-07:00",
      updated_at: "2017-05-23T20:48:27.552-07:00",
      site: "radaris.com",
      status: "requested",
      status_label: "Pending",
      client_name: "test name",
      age: 17,
      addresses: ['123'],
      is_active: false
    }
  ],
  pagination: {
    page: 1,
    limit: 20,
    total: 10
  }
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
    expect(UPDATING_STATUS).to.equal('UPDATING_STATUS')
    expect(UPDATE_STATUS_SUCCESS).to.equal('UPDATE_STATUS_SUCCESS')
    expect(UPDATE_STATUS_FAILURE).to.equal('UPDATE_STATUS_FAILURE')
    expect(ADMIN_REMOVAL_REQUEST_PATH).to.equal('/admin/api/monitoring-requests')
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

    it('Should return an action with removals',  () => {
      let removals = {test: [{id: 1}]}
      expect(receivedRemovalRequests(removals)).to.have.property('removals', removals)
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
      let removal =  {id: 1}
      expect(receivedUpdateStatus(removal)).to.have.property('removal', removal)
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
    it('Should remove updated removal', () => {
      let removals = [{id: 1}, {id: 2}, {id: 3}]
      let action = {removal: {id: 1}}
      let result = updateRemovals(removals, action)

      expect(result).to.be.an('array')
      expect(result).to.not.include({id: 1})
    })
  })

  describe('(Async Action Creator) getRemovalsRequested', () => {

    let removalsRequestedApi;

    beforeEach(() => {
      removalsRequestedApi = sinon.stub(BlitzApi, 'get')
    })

    afterEach(() => {
      removalsRequestedApi.restore()
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
      removalsRequestedApi.returns(resolved);

      const expectedActions = [
        { type: ADMIN_REQUESTED_REMOVALS_PENDING},
        { type: ADMIN_REQUESTED_REMOVALS_SUCCESS, removals: fakeResponse}
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
      removalsRequestedApi.returns(rejected);

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

  describe('(Async Action Creator) updateStatus', () => {
    let removalsUpdatedApi;

    beforeEach(() => {
      removalsUpdatedApi = sinon.stub(BlitzApi, 'patch')
    })

    afterEach(() => {
      removalsUpdatedApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(updateStatus).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(updateStatus()).to.be.a('function')
    })

    it('creates UPDATE_STATUS_SUCCESS', (done) => {
      const payload = {id: 1, requested: 'inprogress'}
      const  fakeResponse =  {id: 1}

      const resolved = new Promise((r) => r({ data: fakeResponse }));
      removalsUpdatedApi.returns(resolved);

      const expectedActions = [
        { type: UPDATING_STATUS},
        { type: UPDATE_STATUS_SUCCESS, removal: fakeResponse}
      ]

      const store = mockStore({ requestedRemovals: {} })

      return store.dispatch(updateStatus(payload))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('creates UPDATE_STATUS_FAILURE', (done) => {
      const rejected = new Promise((_, r) => r(errRes));
      removalsUpdatedApi.returns(rejected);

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

  })
})
