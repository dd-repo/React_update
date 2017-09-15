import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import clickadillyApi from 'services/clickadillyApi';

import {
  ACCOUNT_SUCCESS
} from 'routes/admin/Dashboard/Users/Client/modules/account';
import {
  configKeywords
} from 'routes/signup/Keywords/modules/keywords';

import {
  UPDATE_KEYWORD_SUCCESS,
  UPDATE_KEYWORD_FAILURE,
  KEYWORD_REQUEST,
  ADD_KEYWORD_SUCCESS,
  ADD_KEYWORD_FAILURE,
  updateKeywordSuccess,
  updateKeywordFailure,
  updateKeyword,
  addKeyword,
  addKeywordSuccess,
  addKeywordFailure,
  submitKeyword,
  default as reducer
} from 'routes/admin/Dashboard/Users/Client/modules/keywords';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const keyword = {
  id: 10,
  value: "new keyword",
  account_id: 3,
  created_at: "2017-07-05T10:36:30.878-07:00",
  updated_at: "2017-07-05T10:36:30.878-07:00"
}

const errorRes = {
  status: 400,
  response: {data: {errorMessage: 'error message'}}
}

describe('(Admin Keyword module)', () => {

  it('should export constants', () => {
    expect(UPDATE_KEYWORD_SUCCESS).to.equal('UPDATE_KEYWORD_SUCCESS')
    expect(UPDATE_KEYWORD_FAILURE).to.equal('UPDATE_KEYWORD_FAILURE')
    expect(KEYWORD_REQUEST).to.equal('/admin/api/keywords')
    expect(ADD_KEYWORD_SUCCESS).to.equal('ADD_KEYWORD_SUCCESS')
    expect(ADD_KEYWORD_FAILURE).to.equal('ADD_KEYWORD_FAILURE')
  })

  describe('Action Creator "updateKeywordSuccess"', () => {
    it('should return a type with "UPDATE_ACCOUNT_SUCCESS"', () => {
      expect(updateKeywordSuccess()).to.have.property('type', UPDATE_KEYWORD_SUCCESS)
    })

    it('should return a type with data', () => {
      expect(updateKeywordSuccess(keyword)).to.have.property('data', keyword)
    })
  })

  describe('Action Creator "updateKeywordFailure"', () => {
    it('should return a type with "UPDATE_ACCOUNT_FAILURE"', () => {
      expect(updateKeywordFailure()).to.have.property('type', UPDATE_KEYWORD_FAILURE)
    })

    it('should return a type with data', () => {
      expect(updateKeywordFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('Action Creator "addKeywordSuccess"', () => {
    it('should return a type with "ADD_KEYWORD_SUCCESS"', () => {
      expect(addKeywordSuccess()).to.have.property('type', ADD_KEYWORD_SUCCESS)
    })

    it('should return a type with data', () => {
      expect(addKeywordSuccess(keyword)).to.have.property('data', keyword)
    })
  })

  describe('Action Creator "addKeywordFailure"', () => {
    it('should return a type with "UPDATE_ACCOUNT_FAILURE"', () => {
      expect(addKeywordFailure()).to.have.property('type', ADD_KEYWORD_FAILURE)
    })

    it('should return a type with data', () => {
      expect(addKeywordFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) "updateKeyword"', () => {
    let keywordApi;

    beforeEach(() => {
      keywordApi = sinon.stub(clickadillyApi, 'patch')
    })

    afterEach(() => {
      keywordApi.restore()
    })

    it('should be exported as a function', () => {
      expect(updateKeyword).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(updateKeyword(1)).to.be.a('function')
    })

    it('creates ACCOUNT_SUCCESS', (done) => {
      const resolved = new Promise((r) => r({data: keyword}));
      keywordApi.returns(resolved)

      const expectedActions = [
        { type: UPDATE_KEYWORD_SUCCESS, data: keyword }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(updateKeyword({id: 1}))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('created ACCOUNT_FAILURE', done => {
      const rejected = new Promise((_, r) => r(errorRes));
      keywordApi.returns(rejected)

      const expectedActions = [
        { type: UPDATE_KEYWORD_FAILURE, error: errorRes }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(updateKeyword({id: 1}))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('(Async Action Creator) "addKeyword"', () => {
    let keywordApi;

    beforeEach(() => {
      keywordApi = sinon.stub(clickadillyApi, 'post')
    })

    afterEach(() => {
      keywordApi.restore()
    })

    it('should be exported as a function', () => {
      expect(addKeyword).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(addKeyword(keyword)).to.be.a('function')
    })

    it('creates ADD_KEYWORD_SUCCESS', (done) => {
      const resolved = new Promise((r) => r({data: keyword}));
      keywordApi.returns(resolved)

      const expectedActions = [
        { type: ADD_KEYWORD_SUCCESS, data: keyword }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(addKeyword({id: 1}, 1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('created ADD_KEYWORD_FAILURE', done => {
      const rejected = new Promise((_, r) => r(errorRes));
      keywordApi.returns(rejected)

      const expectedActions = [
        { type: ADD_KEYWORD_FAILURE, error: errorRes }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(addKeyword({id: 1}, 1))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('(Reducer)', () => {
    const accountResponse = {
      keywords: [
        {
          id: 10,
          value: "new keyword",
          account_id: 3,
          created_at: "2017-07-05T10:36:30.878-07:00",
          updated_at: "2017-07-05T10:36:30.878-07:00"
        }
      ]
    }

    it('Should be a function', () => {
      expect(reducer).to.be.a('function')
    })

    it('should initialize with an object', () => {
      expect(reducer(undefined, [])).to.be.an('array')
    })

    it('should handle ACCOUNT_SUCCESS', () => {
      const keywordState = reducer([], { type: ACCOUNT_SUCCESS, data: accountResponse})
      const configuredKeywords = configKeywords([keyword])

      expect(keywordState).to.eql(configuredKeywords)
    })

    it('should handle UPDATE_KEYWORD_SUCCESS', () => {
      const keywordState = reducer([], { type: UPDATE_KEYWORD_SUCCESS, data: keyword})
      const configuredKeywords = configKeywords([keyword])

      expect(keywordState).to.eql(configuredKeywords)
    })

    it('should handle ADD_KEYWORD_SUCCESS', () => {
      const keywordState = reducer([], { type: ADD_KEYWORD_SUCCESS, data: keyword})
      const expected = configKeywords([keyword])

      expect(keywordState).to.eql(expected)
    })
  })
})
