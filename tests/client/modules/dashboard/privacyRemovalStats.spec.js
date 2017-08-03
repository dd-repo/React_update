import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import clickadillyApi from 'services/clickadillyApi';

import {
  PRIVACY_REMOVAL_STATISTICS_SUCCESS,
  PRIVACY_REMOVAL_STATISTICS_FAILURE,
  PRIVACY_REMOVAL_STATISTICS_REQUEST,
  fetchPrivacyRemovalStatistics,
  receivePrivacyRemovalStatistics,
  rejectPrivacyRemovalStatistics,
  default as reducer
} from 'routes/client/dashboard/modules/privacyRemovalStats';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const statsData = {
  stats: [
    {
      site: 'radaris',
      value: 2
    },
    {
      site: 'peoplefinder',
      value: 3
    }
  ]
}

const errorRes = {
  status: 400,
  response: { data: { errorMessage: 'error message' } },
}

describe('(Dashboard module) PrivacyRemovalStats', () => {
  it('should export a constant', () => {
    expect(PRIVACY_REMOVAL_STATISTICS_SUCCESS).to.equal('PRIVACY_REMOVAL_STATISTICS_SUCCESS')
    expect(PRIVACY_REMOVAL_STATISTICS_FAILURE).to.equal('PRIVACY_REMOVAL_STATISTICS_FAILURE')
    expect(PRIVACY_REMOVAL_STATISTICS_REQUEST).to.equal('/dashboard/api/v1/privacy-removal-statistics')
  })

  describe('(Action Creator) receivePrivacyRemovalStatistics', () => {
    it('should return an action with type "PRIVACY_REMOVAL_STATISTICS_SUCCESS"', () => {
      expect(receivePrivacyRemovalStatistics()).to.have.property('type', PRIVACY_REMOVAL_STATISTICS_SUCCESS)
    })

    it('should return an action with data', () => {
      expect(receivePrivacyRemovalStatistics(statsData)).to.have.property('data', statsData)
    })
  })

  describe('(Action Creator) rejectPrivacyRemovalStatistics', () => {
    it('should return an action with type "PRIVACY_REMOVAL_STATISTICS_FAILURE"', () => {
      expect(rejectPrivacyRemovalStatistics()).to.have.property('type', PRIVACY_REMOVAL_STATISTICS_FAILURE)
    })

    it('should return an action with error', () => {
      expect(rejectPrivacyRemovalStatistics(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) fetchPrivacyRemovalStatistics', () => {
    let removalStatsApi;

    beforeEach(() => {
      removalStatsApi = sinon.stub(clickadillyApi, 'get')
    })

    afterEach(() => {
      removalStatsApi.restore()
    })

    it('should be exported as a function', () => {
      expect(fetchPrivacyRemovalStatistics).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(fetchPrivacyRemovalStatistics()).to.be.a('function')
    })

    it('creates PRIVACY_REMOVAL_STATISTICS_SUCCESS when fetching privacy removal statistics', done => {
      const resolved = new Promise((r) => r({ data: statsData }))
      removalStatsApi.returns(resolved)

      const expectedActions = [
        { type: PRIVACY_REMOVAL_STATISTICS_SUCCESS, data: statsData }
      ]

      const store = mockStore({ dashboard: {} })

      return store.dispatch(fetchPrivacyRemovalStatistics(1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('creates PRIVACY_REMOVAL_STATISTICS_FAILURE when fetching privacy removal statistics', (done) => {
      const rejected = new Promise((_, r) => r(errorRes))
      removalStatsApi.returns(rejected)

      const expectedActions = [
        { type: PRIVACY_REMOVAL_STATISTICS_FAILURE, error: errorRes }
      ]

      const store = mockStore({ dashboard: {} })

      return store.dispatch(fetchPrivacyRemovalStatistics(1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
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
      let state = reducer([], { type: PRIVACY_REMOVAL_STATISTICS_SUCCESS, data: statsData.stats })
      expect(state).to.be.an('array')
    })

    it('should handle PRIVACY_REMOVAL_STATISTICS_SUCCESS', () => {
      let state = reducer([], { type: PRIVACY_REMOVAL_STATISTICS_SUCCESS, data: statsData.stats })
      const expectedState = statsData.stats
      expect(state).to.eql(expectedState)
    })

    //it('should handle PRIVACY_REMOVAL_STATISTICS_FAILURE', () => {
      //let state = reducer({}, { type: PRIVACY_REMOVAL_STATISTICS_FAILURE, error: errorRes })
      //const expectedState = { errorMessage: errorRes.response.data.errorMessage }
      //expect(state).to.eql(expectedState)
    //})
  })
})
