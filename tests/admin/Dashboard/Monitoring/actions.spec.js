import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import BlitzApi from 'services/BlitzApi';
import {
  ADMIN_REQUESTED_REMOVALS_PENDING,
  ADMIN_REQUESTED_REMOVALS_SUCCESS,
  ADMIN_REQUESTED_REMOVALS_FAILURE,
  ADMIN_REMOVAL_REQUEST_PATH,
  getRemovalsRequested,
  gettingRemovalRequests,
  receivedRemovalRequests,
  rejectedRemovalRequests
} from 'routes/admin/Dashboard/Removals/modules/removalRequests';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('(RequestedMovals module)', () => {

  it('should export constants', () => {
    expect(ADMIN_REQUESTED_REMOVALS_PENDING).to.equal('ADMIN_REQUESTED_REMOVALS_PENDING')
    expect(ADMIN_REQUESTED_REMOVALS_SUCCESS).to.equal('ADMIN_REQUESTED_REMOVALS_SUCCESS')
    expect(ADMIN_REQUESTED_REMOVALS_FAILURE).to.equal('ADMIN_REQUESTED_REMOVALS_FAILURE')
    expect(ADMIN_REMOVAL_REQUEST_PATH).to.equal('/admin/api/monitoring-requests/search')
  })

  describe('(Action Creator) gettingRemovalRequests', () => {
    it('Should return an action with "ADMIN_REQUESTED_REMOVALS_PENDING"', () => {
      expect(gettingRemovalRequests()).to.have.property('type', ADMIN_REQUESTED_REMOVALS_PENDING)
    })
  })

  describe('(Action Creator) receivedRemovalRequests', () => {
    it('Should return an action with "ADMIN_REQUESTED_REMOVALS_SUCCESS"', () => {
      expect(receivedRemovalRequests()).to.have.property('type', ADMIN_REQUESTED_REMOVALS_SUCCESS)
    })

    it('Should return an action with removals',  () => {
      let removals = {test: [{id: 1}]}
      expect(receivedRemovalRequests(removals)).to.have.property('removals', removals)
    })
  })

  describe('(Action Creator) rejectedRemovalRequests', () => {
    it('Should return an action with "ADMIN_REQUESTED_REMOVALS_FAILURE"', () => {
      expect(rejectedRemovalRequests()).to.have.property('type', ADMIN_REQUESTED_REMOVALS_FAILURE)
    })

    it('Should return an action with error', () => {
      let error = {testErrorMessage: 'errorMessage'}
      expect(rejectedRemovalRequests(error)).to.have.property('error', error)
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
  })
})
