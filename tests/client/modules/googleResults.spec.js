import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import clickadillyApi from 'services/clickadillyApi';
import BASE_URL from 'consts/baseUrl';
import {
  GOOGLE_RESULTS_SUCCESS,
  GOOGLE_RESULTS_POSTING,
  GOOGLE_RESULTS_FAILURE,
  UPDATE_GOOGLE_RESULT_SUCCESS,
  UPDATE_GOOGLE_RESULT_FAILURE,
  gettingGoogleResults,
  googleResultSuccess,
  googleResultFailure,
  updateGoogleResultSuccess,
  updateGoogleResultFailure,
  getGoogleResults,
  requestRemoval,
  default as reducer,
} from 'routes/client/Dashboard/GoogleResults/modules/googleResults';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const googleResults = {
  search_results: [
    {
      id: "1",
      title: "title",
      description: "description",
      url: "someUrl.com",
      friendly_url: "someFriendlyUrl.com",
      rank: 1,
      page_position: 1,
      page_number: 1,
      source: "google",
      keyword_id: 37,
      listing_site_id: 2,
      site: "mugshots.com",
      created_at: "2017-05-16T09:33:00.571-07:00",
      updated_at: "2017-05-16T09:33:00.571-07:00",
      status: null,
      is_type: "removal",
    }
  ],
  meta: {
    pagination: {
      page: 1,
      limit: 10,
      total: 30,
    }
  }
}

const googleResultUpdate = {
  id: "1",
  title: "title",
  description: "description",
  url: "someUrl.com",
  friendly_url: "someFriendlyUrl.com",
  rank: 1,
  page_position: 1,
  page_number: 1,
  source: "google",
  keyword_id: 37,
  listing_site_id: 2,
  site: "mugshots.com",
  created_at: "2017-05-16T09:33:00.571-07:00",
  updated_at: "2017-05-16T09:33:00.571-07:00",
  status: "requested",
  is_type: "removal",
}

const errRes = {
  status: 400,
  response: { data: { errorMessage: 'error message' } },
}

describe( '(googleResults module) googleResults', () => {

  it('Should export a constant.', () => {
    expect(GOOGLE_RESULTS_SUCCESS).to.equal('GOOGLE_RESULTS_SUCCESS')
    expect(GOOGLE_RESULTS_POSTING).to.equal('GOOGLE_RESULTS_POSTING')
    expect(GOOGLE_RESULTS_FAILURE).to.equal('GOOGLE_RESULTS_FAILURE')
    expect(UPDATE_GOOGLE_RESULT_SUCCESS).to.equal('UPDATE_GOOGLE_RESULT_SUCCESS')
    expect(UPDATE_GOOGLE_RESULT_FAILURE).to.equal('UPDATE_GOOGLE_RESULT_FAILURE')
  })

  describe('(Action Creator) gettingGoogleResults', () => {
    it('Should return an action with type "GOOGLE_RESULTS_POSTING"', () => {
      expect(gettingGoogleResults()).to.have.property('type', GOOGLE_RESULTS_POSTING)
    })
  })

  describe('(Action Creator) googleResultSuccess', () => {
    it('Should return an action with type "GOOGLE_RESULTS_SUCCESS"', () => {
      expect(googleResultSuccess()).to.have.property('type', GOOGLE_RESULTS_SUCCESS)
    })

    it('Should return an action with data',  () => {
      let results = {test: ['google results']}
      expect(googleResultSuccess(results)).to.have.property('results', results)
    })
  })

  describe('(Action Creator) googleResultFailure', () => {
    it('Should return an action with type "GOOGLE_RESULTS_FAILURE"', () => {
      expect(googleResultFailure()).to.have.property('type', GOOGLE_RESULTS_FAILURE)
    })

    it('Should return an action with error',  () => {
      let error = {test: 'some error message'}
      expect(googleResultFailure(error)).to.have.property('error', error)
    })
  })

  describe('(Action Creator) updateGoogleResultSuccess', () => {
    it('Should return an action with type "UPDATE_GOOGLE_RESULT_SUCCESS"', () => {
      expect(updateGoogleResultSuccess()).to.have.property('type', UPDATE_GOOGLE_RESULT_SUCCESS)
    })

    it('Should return an action with data',  () => {
      let result = {test: 'google result'}
      expect(updateGoogleResultSuccess(result)).to.have.property('result', result)
    })
  })

  describe('(Action Creator) updateGoogleResultFailure', () => {
    it('Should return an action with type "UPDATE_GOOGLE_RESULT_FAILURE"', () => {
      expect(updateGoogleResultFailure()).to.have.property('type', UPDATE_GOOGLE_RESULT_FAILURE)
    })
  })

  describe('(Async Action Creator) getGoogleResults', () => {

    let googleResultApi;
    const payload = {pageNum: 1, keyword_id: 1, account_id: 1}

    beforeEach(() => {
      googleResultApi = sinon.stub(clickadillyApi, 'get')
    })

    afterEach(() => {
      googleResultApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(getGoogleResults).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(getGoogleResults(payload)).to.be.a('function')
    })

    it('creates GOOGLE_RESULTS_SUCCESS when fetching google results', (done) => {

      const resolved = new Promise((r) => r({ data: googleResults }));
      googleResultApi.returns(resolved);

      const expectedActions = [
        { type: GOOGLE_RESULTS_POSTING},
        { type: GOOGLE_RESULTS_SUCCESS, results: googleResults }
      ]

      const store = mockStore({ googleResults: {} })

      return store.dispatch(getGoogleResults(payload))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    })

    it('creates GOOGLE_RESULTS_FAILURE', (done) => {


      const rejected = new Promise((_, r) => r(errRes));
      googleResultApi.returns(rejected)

      //moxios.wait(() => {
      //const request = moxios.requests.mostRecent();
      //request.reject(errRes);
      //});

      const expectedActions = [
        { type: GOOGLE_RESULTS_POSTING},
        { type: GOOGLE_RESULTS_FAILURE, error: {
          status: 400,
          response: {
            data: { errorMessage: 'error message' }
          }}
        }
      ]

      const store = mockStore({ googleResults: {} })

      return store.dispatch(getGoogleResults(payload))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    })
  })

  describe('(Async Action Creator) requestRemoval', () => {

    let updateGoogleResultApi;

    const payload = {
      request: {
        search_result_id: 1,
      }
    }

    beforeEach(() => {
      updateGoogleResultApi = sinon.stub(clickadillyApi, 'post')
    })

    afterEach(() => {
      updateGoogleResultApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(requestRemoval).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(requestRemoval()).to.be.a('function')
    })

    it('creates UPDATE_GOOGLE_RESULT_SUCCESS when posting request removal', (done) => {


      const resolved = new Promise((r) => r({ data: googleResultUpdate }));
      updateGoogleResultApi.returns(resolved);

      const expectedActions = [
        { type: UPDATE_GOOGLE_RESULT_SUCCESS, result: googleResultUpdate }
      ]

      const store = mockStore({ googleResults: {} })

      return store.dispatch(requestRemoval(payload))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    })

    it('creates UPDATE_GOOGLE_RESULT_FAILURE', (done) => {

      const rejected = new Promise((_, r) => r(errRes));
      updateGoogleResultApi.returns(rejected)

      //moxios.wait(() => {
        //const request = moxios.requests.mostRecent();
        //request.reject(errRes);
      //});

      const expectedActions = [
        { type: UPDATE_GOOGLE_RESULT_FAILURE, error: {
          status: 400,
          response: {
            data: { errorMessage: 'error message' }
          }}
        }
      ]

      const store = mockStore({ googleResults: {} })

      return store.dispatch(requestRemoval(payload))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    })
  })

  describe('(Reducer)', () => {

    const googleResultState = {
      all: googleResults.search_results,
      pagination: googleResults.meta.pagination,
      isFetching: false
    }

    const googleResultFailureState = {
      isFetching: false,
      errorMessage: 'error message'
    }

    const state = {
      all: [
        {
          id: "1",
          title: "title",
          description: "description",
          url: "someUrl.com",
          friendly_url: "someFriendlyUrl.com",
          rank: 1,
          page_position: 1,
          page_number: 1,
          source: "google",
          keyword_id: 37,
          listing_site_id: 2,
          site: "mugshots.com",
          created_at: "2017-05-16T09:33:00.571-07:00",
          updated_at: "2017-05-16T09:33:00.571-07:00",
          status: 'requested',
          is_type: "removal",
        }
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 30,
      }
    }

    const updatedState = {
      all: [
        {
          id: "1",
          title: "title",
          description: "description",
          url: "someUrl.com",
          friendly_url: "someFriendlyUrl.com",
          rank: 1,
          page_position: 1,
          page_number: 1,
          source: "google",
          keyword_id: 37,
          listing_site_id: 2,
          site: "mugshots.com",
          created_at: "2017-05-16T09:33:00.571-07:00",
          updated_at: "2017-05-16T09:33:00.571-07:00",
          status: 'requested',
          is_type: "removal",
        }
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 30,
      }
    }

    const updateResultFailureState = {
      all: [
        {
          id: "1",
          title: "title",
          description: "description",
          url: "someUrl.com",
          friendly_url: "someFriendlyUrl.com",
          rank: 1,
          page_position: 1,
          page_number: 1,
          source: "google",
          keyword_id: 37,
          listing_site_id: 2,
          site: "mugshots.com",
          created_at: "2017-05-16T09:33:00.571-07:00",
          updated_at: "2017-05-16T09:33:00.571-07:00",
          status: 'requested',
          is_type: "removal",
        }
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 30,
      },
      errorMessage: 'error message'
    }

    it('Should be a function.', () => {
      expect(reducer).to.be.a('function')
    })

    it('Should initilaize with an object.', () => {
      expect(reducer(undefined, {})).to.be.an('object')
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = reducer({}, { type: GOOGLE_RESULTS_POSTING })
      expect(state).to.be.an('object')
      expect(state).to.have.property('isFetching', true)
      state = reducer(state, { type: 'NOT_ACTION' })
      expect(state).to.have.property('isFetching', true)
    })

    it('should handle GOOGLE_RESULTS_POSTING', () => {
      expect(reducer({}, {
        type: GOOGLE_RESULTS_POSTING }))
        .to.eql( { isFetching: true })
    })

    it('should handle GOOGLE_RESULTS_SUCCESS', () => {
      expect(reducer({ isFetching: true }, {
        type: GOOGLE_RESULTS_SUCCESS,
        results: googleResults
      })).to.eql(googleResultState)
    })

    it('should handle GOOGLE_RESULTS_FAILURE', () => {
      expect(reducer({ isFetching: true }, {
        type: GOOGLE_RESULTS_FAILURE,
        error: errRes
      })).to.eql(googleResultFailureState)
    });

    it('should handle UPDATE_GOOGLE_RESULT_SUCCESS', () => {
      expect(reducer(state, {
        type: UPDATE_GOOGLE_RESULT_SUCCESS,
        result: googleResultUpdate
      })).to.eql(updatedState)
    })

    it('should handle UPDATE_GOOGLE_RESULT_FAILURE', () => {
      expect(reducer(state, {
        type: UPDATE_GOOGLE_RESULT_FAILURE,
        error: errRes
      })).to.eql(updateResultFailureState)
    })
  })
})
