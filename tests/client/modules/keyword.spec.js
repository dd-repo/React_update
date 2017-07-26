import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import clickadillyApi from 'services/clickadillyApi';
import {
  USER_LOGIN_SUCCESS
} from 'routes/auth/modules/auth';
import {
  KEYWORD_POSTING,
  KEYWORD_SUCCESS,
  KEYWORD_FAILURE,
  CURRENT_KEYWORD_ADD,
  KEYWORD_REQUEST,
  addCurrentKeyword,
  postKeywords,
  postingKeywords,
  keywordSuccess,
  keywordFailure,
  default as reducer
} from 'routes/client/Keywords/modules/keywords';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

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

describe('(profile module) "profile"', () => {

  it('Should export a constant.', () => {
    expect(KEYWORD_POSTING).to.equal('KEYWORD_POSTING')
    expect(KEYWORD_SUCCESS).to.equal('KEYWORD_SUCCESS')
    expect(KEYWORD_FAILURE).to.equal('KEYWORD_FAILURE')
    expect(CURRENT_KEYWORD_ADD).to.equal('CURRENT_KEYWORD_ADD')
    expect(KEYWORD_REQUEST).to.equal('/dashboard/api/v1/users/sign-up/keyword')
  })

  describe('(Action Creator) "postingKeywords"', () => {
    it('Should return a action with type KEYWORD_POSTING', () => {
      expect(postingKeywords()).to.have.property('type', KEYWORD_POSTING)
    })
  })

  describe('(Action Creator) "keywordSuccess"', () => {
    it('Should return a action with type KEYWORD_SUCCESS', () => {
      expect(keywordSuccess()).to.have.property('type', KEYWORD_SUCCESS)
    })

    it('Should return a action with type KEYWORD_SUCCESS', () => {
      expect(keywordSuccess(keywords)).to.have.property('keywords', keywords)
    })
  })

  describe('(Action Creator) "keywordFailure"', () => {
    it('Should return a action with type KEYWORD_FAILURE', () => {
      expect(keywordFailure()).to.have.property('type', KEYWORD_FAILURE)
    })

    it('Should return a action with type KEYWORD_SUCCESS', () => {
      expect(keywordFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Action Creator) "addCurrentKeyword"', () => {
    it('Should return a action with type CURRENT_KEYWORD_ADD', () => {
      expect(addCurrentKeyword()).to.have.property('type', CURRENT_KEYWORD_ADD)
    })

    it('Should return a action with type CURRENT_KEYWORD_ADD', () => {
      expect(addCurrentKeyword(keyword)).to.have.property('keyword', keyword)
    })
  })

  describe('(Async Action Creator) "postingKeywords"', () => {
    let keywordApi;

    beforeEach(() => {
      keywordApi = sinon.stub(clickadillyApi, 'post')
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

    it('creates KEYWORD_SUCCESS when posting keywords', (done) => {
      const resolved = new Promise((r) => r({ data: keywords }))
      keywordApi.returns(resolved)

      const expectedActions = [
        { type: KEYWORD_POSTING },
        { type: KEYWORD_SUCCESS, keywords }
      ]

      const store = mockStore({ keywords: {} })

      return store.dispatch(postKeywords())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })

    it('creates KEYWORD_FAILURE when posting keywords', (done) => {
      const rejected = new Promise((_, r) => r(errorRes))
      keywordApi.returns(rejected)

      const expectedActions = [
        { type: KEYWORD_POSTING },
        { type: KEYWORD_FAILURE, error: errorRes }
      ]

      const store = mockStore({ keywords: {} })

      return store.dispatch(postKeywords())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
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
      let state = reducer({}, { type: KEYWORD_POSTING })
      expect(state).to.be.an('object')
      expect(state).to.have.property('isFetching', true)
      state = reducer(state, { type: 'NOT_ACTION' })
      expect(state).to.have.property('isFetching', true)
    })

    it('should handle KEYWORD_SUCCESS', () => {
      expect(reducer({}, {
        type: KEYWORD_SUCCESS,
        keywords
      })).to.eql({
        all: keywords,
        currentKeyword: keyword,
        isFetching: false
      })
    })

    it('should handle KEYWORD_FAILURE', () => {
      expect(reducer({}, {
        type: KEYWORD_FAILURE,
        error: errorRes
      })).to.eql({
        error: errorRes,
        isFetching: false
      })
    })

    it('should handle CURRENT_KEYWORD_ADD', () => {
      expect(reducer({}, {
        type: CURRENT_KEYWORD_ADD,
        keyword: keyword
      })).to.eql({
        currentKeyword: keyword,
      })
    })

    it('should handle USER_LOGIN_SUCCESS', () => {
      expect(reducer({}, {
        type: USER_LOGIN_SUCCESS,
        data: userLoginInfo
      })).to.eql({
        all: userLoginInfo.account.keywords,
        currentKeyword: userLoginInfo.account.keywords[0],
        isFetching: false
      })
    })
  })
})

