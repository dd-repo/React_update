// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
//
// import infosweepApi from 'services/infosweepApi';
import {
  USER_LOGIN_SUCCESS
} from 'routes/auth/modules/auth';
import {
  CREATE_KEYWORD_POSTING,
  CREATE_KEYWORD_SUCCESS,
  CREATE_KEYWORD_FAILURE,
  CURRENT_KEYWORD_UPDATE,
  KEYWORD_REQUEST,
  RECEIVE_KEYWORDS_SUCCESS,
  RECEIVE_KEYWORDS_FAILURE,
  KEYWORD_UPDATE_SUCCESS,
  KEYWORD_UPDATE_FAILURE,
  KEYWORDS_REQUEST,
  updateKeyword,
  fetchKeywords,
  receiveKeywords,
  rejectKeywords,
  updateCurrentKeyword,
  receiveKeywordUpdateSuccess,
  receieveKeywordUpdateFailure,
  postKeywords,
  postingKeywords,
  keywordSuccess,
  keywordFailure,
  default as reducer
} from 'routes/client/Account/modules/keywords';

// const middlewares = [ thunk ]
// const mockStore = configureMockStore(middlewares)

const keywords = [
  {
    id: 1,
    value: "keyword 1",
    account_id: 1,
  },
  {
    id: 2,
    value: "keyword 2",
    account_id: 1,
  },
  {
    id: 3,
    value: "keyword 3",
    account_id: 1,
  }
]

const keyword = {
  id: 1,
  value: "keyword 1",
  account_id: 1,
}

const errorRes = {errorMessage: 'error message'}

const userLoginInfo = {
  account: { keywords }
}

describe('(client Keyword module) "keyword"', () => {

  it('Should export a constant.', () => {
    expect(CREATE_KEYWORD_POSTING).to.equal('CREATE_KEYWORD_POSTING')
    expect(CREATE_KEYWORD_SUCCESS).to.equal('CREATE_KEYWORD_SUCCESS')
    expect(CREATE_KEYWORD_FAILURE).to.equal('CREATE_KEYWORD_FAILURE')
    expect(CURRENT_KEYWORD_UPDATE).to.equal('CURRENT_KEYWORD_UPDATE')
    expect(RECEIVE_KEYWORDS_SUCCESS).to.equal('RECEIVE_KEYWORDS_SUCCESS')
    expect(RECEIVE_KEYWORDS_FAILURE).to.equal('RECEIVE_KEYWORDS_FAILURE')
    expect(KEYWORD_UPDATE_SUCCESS).to.equal('KEYWORD_UPDATE_SUCCESS')
    expect(KEYWORD_UPDATE_FAILURE).to.equal('KEYWORD_UPDATE_FAILURE')
    expect(KEYWORDS_REQUEST).to.equal('/dashboard/api/v1/accounts')
    expect(KEYWORD_REQUEST).to.equal('/dashboard/api/v1/users/sign-up/keyword')
  })

  describe('(Action Creator) "postingKeywords"', () => {
    it('Should return a action with type CREATE_KEYWORD_POSTING', () => {
      expect(postingKeywords()).to.have.property('type', CREATE_KEYWORD_POSTING)
    })
  })

  describe('(Action Creator) "keywordSuccess"', () => {
    it('Should return a action with type CREATE_KEYWORD_SUCCESS', () => {
      expect(keywordSuccess()).to.have.property('type', CREATE_KEYWORD_SUCCESS)
    })

    it('Should return a action with keywords', () => {
      expect(keywordSuccess(keywords)).to.have.property('keywords', keywords)
    })
  })

  describe('(Action Creator) "keywordFailure"', () => {
    it('Should return a action with type CREATE_KEYWORD_FAILURE', () => {
      expect(keywordFailure()).to.have.property('type', CREATE_KEYWORD_FAILURE)
    })

    it('Should return a action with type CREATE_KEYWORD_SUCCESS', () => {
      expect(keywordFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Action Creator) "updateCurrentKeyword"', () => {
    it('Should return a action with type CURRENT_KEYWORD_UPDATE', () => {
      expect(updateCurrentKeyword()).to.have.property('type', CURRENT_KEYWORD_UPDATE)
    })

    it('Should return a action with type CURRENT_KEYWORD_UPDATE', () => {
      expect(updateCurrentKeyword(keyword)).to.have.property('keyword', keyword)
    })
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

  describe('(Action Creator) receiveKeywordUpdateSuccess', () => {
    it('should return an action with type "KEYWORD_UPDATE_SUCCESS"', () => {
      expect(receiveKeywordUpdateSuccess()).to.have.property('type', KEYWORD_UPDATE_SUCCESS)
    })

    it('should return an action with data', () => {
      const updatedKeyword = { value: 'updated keyword', id: 5 }
      expect(receiveKeywordUpdateSuccess(updatedKeyword)).to.have.property('data', updatedKeyword)
    })
  })

  describe('(Action Creator) receieveKeywordUpdateFailure', () => {
    it('should return an action with type "KEYWORD_UPDATE_FAILURE"', () => {
      expect(receieveKeywordUpdateFailure()).to.have.property('type', KEYWORD_UPDATE_FAILURE)
    })

    it('should return an action with type error', () => {
      expect(receieveKeywordUpdateFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) "postingKeywords"', () => {
    let keywordApi;

    beforeEach(() => {
      keywordApi = sinon.stub(infosweepApi, 'post')
    })

    afterEach(() => {
      keywordApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(postKeywords).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(postKeywords()).to.be.a('function')
    })

    it('creates CREATE_KEYWORD_SUCCESS when posting keywords', (done) => {
      const resolved = new Promise((r) => r({ data: keywords }))
      keywordApi.returns(resolved)

      const expectedActions = [
        { type: CREATE_KEYWORD_POSTING },
        { type: CREATE_KEYWORD_SUCCESS, keywords }
      ]

      const store = mockStore({ keywords: {} })

      return store.dispatch(postKeywords())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })

    it('creates CREATE_KEYWORD_FAILURE when posting keywords', (done) => {
      const rejected = new Promise((_, r) => r(errorRes))
      keywordApi.returns(rejected)

      const expectedActions = [
        { type: CREATE_KEYWORD_POSTING },
        { type: CREATE_KEYWORD_FAILURE, error: errorRes }
      ]

      const store = mockStore({ keywords: {} })

      return store.dispatch(postKeywords())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })
  })

  describe('(Async Action Creator) fetchKeywords', () => {
    let keywordsApi;

    beforeEach(() => {
      keywordsApi = sinon.stub(infosweepApi, 'get')
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

      const store = mockStore({ keywords: {} })

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

      const store = mockStore({ keywords: {} })

      return store.dispatch(fetchKeywords())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('Async Action Creator updateKeyword', () => {
    let keywordsApi;
    const updatedKeyword = { value: 'updated keyword', id: 5 }

    beforeEach(() => {
      keywordsApi = sinon.stub(infosweepApi, 'patch')
    })

    afterEach(() => {
      keywordsApi.restore()
    })

    it('should be exported as a function', () => {
      expect(updateKeyword).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(updateKeyword).to.be.a('function')
    })

    it('returns KEYWORD_UPDATE_SUCCESS when updating keyword', done => {
      const resolved = new Promise(r => r({data: updatedKeyword}))
      keywordsApi.returns(resolved)

      const expectedActions = [
        { type: KEYWORD_UPDATE_SUCCESS, data: updatedKeyword }
      ]

      const store = mockStore({ keywords: {} })

      return store.dispatch(updateKeyword(updatedKeyword, 1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('returns KEYWORD_UPDATE_FAILURE when updating keyword', done => {
      const rejected = new Promise((_, r) => r(errorRes))
      keywordsApi.returns(rejected)

      const expectedActions = [
        { type: KEYWORD_UPDATE_FAILURE, error: errorRes }
      ]

      const store = mockStore({ keywords: {} })

      return store.dispatch(updateKeyword(updatedKeyword, 1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('(Reducer)', () => {

    const expected = {
      all: [
        {
          id: 1,
          value: 1,
          label: "keyword 1",
        },
        {
          id: 2,
          value: 2,
          label: "keyword 2",
        },
        {
          id: 3,
          value: 3,
          label: "keyword 3",
        }
      ],
      currentKeyword: { id: 1, value: 1, label: 'keyword 1' },
      isFetching: false
    }

    it('Should be a function.', () => {
      expect(reducer).to.be.a('function')
    })

    it('Should initilaize with an object.', () => {
      expect(reducer(undefined, {})).to.be.an('object')
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = reducer({}, { type: CREATE_KEYWORD_POSTING })
      expect(state).to.be.an('object')
      expect(state).to.have.property('isFetching', true)
      state = reducer(state, { type: 'NOT_ACTION' })
      expect(state).to.have.property('isFetching', true)
    })

    it('should handle CREATE_KEYWORD_SUCCESS', () => {
      const state = reducer({}, { type: CREATE_KEYWORD_SUCCESS, keywords })

      expect(state).to.eql(expected)
    })

    it('should handle CREATE_KEYWORD_FAILURE', () => {
      expect(reducer({}, {
        type: CREATE_KEYWORD_FAILURE,
        error: errorRes
      })).to.eql({
        error: errorRes,
        isFetching: false
      })
    })

    it('should handle CURRENT_KEYWORD_UPDATE', () => {
      const expected = { currentKeyword: { id: 1, value: 1, label: "keyword 1"} }
      const state = reducer({}, { type: CURRENT_KEYWORD_UPDATE, keyword: keyword })
      expect(state).to.eql(expected)
    })

    it('should handle USER_LOGIN_SUCCESS', () => {
      const state = reducer({}, { type: USER_LOGIN_SUCCESS, data: userLoginInfo })
      expect(state).to.eql(expected)
    })

    it('should handle RECEIVE_KEYWORDS_SUCCESS', () => {
      const currentKeyword = { id: 1, value: 1, label: "keyword 1"}
      const expectedKeywords = [
        {
          id: 1,
          value: 1,
          label: "keyword 1",
        },
        {
          id: 2,
          value: 2,
          label: "keyword 2",
        },
        {
          id: 3,
          value: 3,
          label: "keyword 3",
        }
      ]
      let state = reducer({}, { type: RECEIVE_KEYWORDS_SUCCESS, data: { keywords } })
      const expectedState = { all: expectedKeywords, currentKeyword }

      expect(state).to.eql(expectedState)
    })

    it('should handle KEYWORD_UPDATE_SUCCESS', () => {
      const updatedKeyword = { id: 1, value: 'keyword 1 updated' }
      const state = reducer(expected, { type: KEYWORD_UPDATE_SUCCESS, data: updatedKeyword })
      const expectedKeywords = [
        {
          id: 1,
          value: 1,
          label: "keyword 1 updated",
        },
        {
          id: 2,
          value: 2,
          label: "keyword 2",
        },
        {
          id: 3,
          value: 3,
          label: "keyword 3",
        }
      ]

      expect(state.all).to.eql(expectedKeywords)
    })
  })
})

