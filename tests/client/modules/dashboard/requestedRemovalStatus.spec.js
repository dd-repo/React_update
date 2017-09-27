import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import infosweepApi from 'services/infosweepApi';

import {
  REQUESTED_REMOVAL_STATUS_SUCCESS,
  REQUESTED_REMOVAL_STATUS_FAILURE,
  REQUESTED_REMOVAL_STATUS_REQUEST,
  configData,
  fetchPrivacyRemovalStatus,
  receivePrivacyRemovalStatus,
  rejectPrivacyRemovalStatus,
  default as reducer
} from 'routes/client/dashboard/modules/privacyRemovalStatus';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const privacyRemovalStatus = {
  inprogress: 1,
  requested: 1,
  queued: 4,
  pending: 11
}

const errorRes = {
  status: 400,
  response: { data: { errorMessage: 'error message' } },
}

describe('(Dashboard module) PrivacyRemovalStatus', () => {
  it('shoule export a constant', () => {
    expect(REQUESTED_REMOVAL_STATUS_SUCCESS).to.eql('REQUESTED_REMOVAL_STATUS_SUCCESS')
    expect(REQUESTED_REMOVAL_STATUS_FAILURE).to.eql('REQUESTED_REMOVAL_STATUS_FAILURE')
    expect(REQUESTED_REMOVAL_STATUS_REQUEST).to.eql('/dashboard/api/v1/requested-removal-status')
  })

  describe('(Action Creator) receivePrivacyRemovalStatus', () => {
    it('should return an action with type "REQUESTED_REMOVAL_STATUS_SUCCESS"', () => {
      expect(receivePrivacyRemovalStatus()).to.have.property('type', REQUESTED_REMOVAL_STATUS_SUCCESS)
    })

    it('should return an action with data', () => {
      expect(receivePrivacyRemovalStatus(privacyRemovalStatus)).to.have.property('data', privacyRemovalStatus)
    })
  })

  describe('(Action Creator) rejectPrivacyRemovalStatus', () => {
    it('should return an action with type "REQUESTED_REMOVAL_STATUS_FAILURE"', () => {
      expect(rejectPrivacyRemovalStatus()).to.have.property('type', REQUESTED_REMOVAL_STATUS_FAILURE)
    })

    it('should return an action with data', () => {
      expect(rejectPrivacyRemovalStatus(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) fetchPrivacyRemovalStatus', () => {
    let removalStatusApi;

    beforeEach(() => {
      removalStatusApi = sinon.stub(infosweepApi, 'get')
    })

    afterEach(() => {
      removalStatusApi.restore()
    })
    it('should be exported as a function', () => {
      expect(fetchPrivacyRemovalStatus).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(fetchPrivacyRemovalStatus()).to.be.a('function')
    })

    it('returns REQUESTED_REMOVAL_STATUS_SUCCESS', done => {
      const resolved = new Promise((r) => r({ data: privacyRemovalStatus }))
      removalStatusApi.returns(resolved)

      const expectedActions = [
        { type: REQUESTED_REMOVAL_STATUS_SUCCESS, data: privacyRemovalStatus }
      ]

      const store = mockStore({ dashboard: {} })

      return store.dispatch(fetchPrivacyRemovalStatus(1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('returns REQUESTED_REMOVAL_STATUS_FAILURE', done => {
      const rejected = new Promise((_, r) => r(errorRes))
      removalStatusApi.returns(rejected)

      const expectedActions = [
        { type: REQUESTED_REMOVAL_STATUS_FAILURE, error: errorRes }
      ]

      const store = mockStore({ dashboard: {} })

      return store.dispatch(fetchPrivacyRemovalStatus(1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('Split reducer configData()', () => {

    it('should return an array', () => {
      expect(configData(privacyRemovalStatus)).to.be.a('array')
    })

    it('should return an array of objects with values of zero', () => {
      const emptyObject = {}
      const expectedObject = [
        { name: 'In Progress', value: 0 },
        { name: 'In Queue', value: 0 },
        { name: 'Potential Risks', value: 0 }
      ]
      expect(configData(emptyObject)).to.eql(expectedObject)
    })

    it('should add in progress values and requested values', () => {
      const data = { inprogress: 1, requested: 1 }
      const expectedObject = [
        { name: 'In Progress', value: 2 },
        { name: 'In Queue', value: 0 },
        { name: 'Potential Risks', value: 0 }
      ]

      expect(configData(data)).to.eql(expectedObject)
    })
  })

  describe('Reducer', () => {

    it('should be a function', () => {
      expect(reducer).to.be.a('function')
    })

    it('Should initilaize with an object.', () => {
      expect(reducer(undefined, {})).to.be.an('array')
    })

    it('should return the previous state if an action was not matched', () => {
      let state = reducer([], { type: 'NOT_MATCHED_ACTION', data: privacyRemovalStatus })
      expect(state).to.be.an('array')
    })

    it('should handle PRIVACY_REMOVAL_STATISTICS_SUCCESS', () => {
      let state = reducer([], { type: REQUESTED_REMOVAL_STATUS_SUCCESS, data: privacyRemovalStatus })
      const expectedState = [
        { name: 'In Progress', value: 2},
        { name: 'In Queue', value: 4},
        { name: 'Potential Risks', value: 11}
      ]
      expect(state).to.eql(expectedState)
    })
  })
})
