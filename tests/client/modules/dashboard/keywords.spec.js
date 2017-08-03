import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import clickadillyApi from 'services/clickadillyApi';

import {
  RECEIVE_KEYWORDS_SUCCESS,
  RECEIVE_KEYWORDS_FAILURE,
  KEYWORDS_REQUEST,
  fetchKeywords,
  receiveKeywords,
  rejectKeywords,
  default as reducer
} from 'routes/client/dashboard/modules/keywords';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const keywords = [
  {
    account_id: 1,
    created_at: "2017-08-03T16:56:18.539-07:00",
    id: 2346,
    updated_at: "2017-08-03T16:56:18.539-07:00",
    value: "555-555-5555"
  },
  {
    account_id: 2,
    created_at: "2017-08-03T16:56:18.539-07:00",
    id: 2346,
    updated_at: "2017-08-03T16:56:18.539-07:00",
    value: "First Last"
  },
  {
    account_id: 3,
    created_at: "2017-08-03T16:56:18.539-07:00",
    id: 2346,
    updated_at: "2017-08-03T16:56:18.539-07:00",
    value: "First Last 100"
  },
  {
    account_id: 4,
    created_at: "2017-08-03T16:56:18.539-07:00",
    id: 2346,
    updated_at: "2017-08-03T16:56:18.539-07:00",
    value: "address 123"
  }
]

const errorRes = {
  status: 400,
  response: { data: { errorMessage: 'error message' } },
}

describe('(Dashboard module) Keywords', () => {
  it('should export a const', () => {
    expect(RECEIVE_KEYWORDS_SUCCESS).to.equal('RECEIVE_KEYWORDS_SUCCESS')
    expect(RECEIVE_KEYWORDS_FAILURE).to.equal('RECEIVE_KEYWORDS_FAILURE')
    expect(KEYWORDS_REQUEST).to.equal('/dashboard/api/v1/accounts')
  })

  describe('(Action Creator) receiveKeywords', () => {
    it('should return an action with type "RECEIVE_KEYWORDS_SUCCESS"', () => {
      expect(receiveKeywords()).to.have.property('type', RECEIVE_KEYWORDS_SUCCESS)
    })

    it('should return an action with data', () => {
      expect(receiveKeywords(keywords)).to.have.property('data', keywords)
    })
  })

  describe('(Action Creator) rejectKeywords', () => {
    it('should return an action with type "RECEIVE_KEYWORDS_FAILURE"', () => {
      expect(rejectKeywords()).to.have.property('type', RECEIVE_KEYWORDS_FAILURE)
    })

    it('should return an action with data', () => {
      expect(rejectKeywords(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) fetchKeywords', () => {
    let keywordsApi;

    beforeEach(() => {
      keywordsApi = sinon.stub(clickadillyApi, 'get')
    })

    afterEach(() => {
      keywordsApi.restore()
    })

    it('should be exported as a function', () => {
      expect(fetchKeywords).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(fetchKeywords()).to.be.a('function')
    })

    it('returns RECEIVE_KEYWORDS_SUCCESS when fetching keywords', (done) => {
      const resolved = new Promise((r) => r({ data: keywords }))
      keywordsApi.returns(resolved)

      const expectedActions = [
        { type: RECEIVE_KEYWORDS_SUCCESS, data: keywords }
      ]

      const store = mockStore({ dashboard: {} })

      return store.dispatch(fetchKeywords())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('returns RECEIVE_KEYWORDS_FAILURE when fetching keywords', (done) => {
      const rejected = new Promise((_, r) => r(errorRes))
      keywordsApi.returns(rejected)

      const expectedActions = [
        { type: RECEIVE_KEYWORDS_FAILURE, error: errorRes }
      ]

      const store = mockStore({ dashboard: {} })

      return store.dispatch(fetchKeywords())
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
      let state = reducer([], { type: RECEIVE_KEYWORDS_SUCCESS, data: keywords })
      expect(state).to.be.an('array')
    })

    it('should handle PRIVACY_REMOVAL_STATISTICS_SUCCESS', () => {
      let state = reducer([], { type: RECEIVE_KEYWORDS_SUCCESS, data: keywords })
      const expectedState = keywords
      expect(state).to.eql(expectedState)
    })
  })
})



