import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import infosweepApi from 'services/infosweepApi';

import {
  PHONES_FETCHING,
  PHONES_SUCCESS,
  PHONES_FAILURE,
  PHONES_REQUEST,
  fetchPhones,
  receivePhonesSuccess,
  receivePhonesFailure,
  default as reducer
} from 'routes/client/Account/modules/phones';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const errorRes = {errorMessage: 'error message'}

const phones = [{
  id: 1,
  value: '5555555555',
}]

describe('(Phones module) "Phones"', () => {

  it('Should export a constants', () => {
    expect(PHONES_FETCHING).to.equal('PHONES_FETCHING')
    expect(PHONES_SUCCESS).to.equal('PHONES_SUCCESS')
    expect(PHONES_FAILURE).to.equal('PHONES_FAILURE')
    expect(PHONES_REQUEST).to.equal('/dashboard/api/v1/accounts')
  })

  describe('(Action Creator) "PHONES_SUCCESS"', () => {
    it('should return a action with type PHONES_SUCCESS', () => {
      expect(receivePhonesSuccess()).to.have.property('type', PHONES_SUCCESS)
    })

    it('should return a action with phone data', () => {
      expect(receivePhonesSuccess(phones)).to.have.property('data', phones)
    })
  })

  describe('(Action Creator) "PHONES_FAILURE', () => {
    it('Should return a action with type PHONES_FAILURE', () => {
      expect(receivePhonesFailure()).to.have.property('type', PHONES_FAILURE)
    })

    it('Should return a action with error', () => {
      expect(receivePhonesFailure(errorRes)).to.have.property('error', errorRes)
     })
  })

  describe('(Async Action Creator) "fetchPhones"', () => {
    let phonesApi;

    beforeEach(() => {
      phonesApi = sinon.stub(infosweepApi, 'get')
    })

    afterEach(() => {
      phonesApi.restore()
    })

    it('should be exported as a function ', () => {
      expect(fetchPhones).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(fetchPhones()).to.be.a('function')
    })

    it('creates PHONES_SUCCESS when fetching phones', done => {
      const resolved = new Promise((r) => r({ data: phones }))
      phonesApi.returns(resolved)

      const expectedActions = [
        { type: PHONES_SUCCESS, data: phones }
      ]

      const store = mockStore({ phones: {} })

      return store.dispatch(fetchPhones())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })

    it('creates PHONES_FAILURE when fetching phones', done => {
      const rejected = new Promise((_, r) => r(errorRes))
      phonesApi.returns(rejected)

      const expectedActions = [
        { type: PHONES_FAILURE, error: errorRes }
      ]

      const store = mockStore({ phones: {} })

      return store.dispatch(fetchPhones())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('Reducer', () => {

    it('Should be a function.', () => {
      expect(reducer).to.be.a('function')
    })

    it('Should initilaize with an object.', () => {
      expect(reducer(undefined, {})).to.be.an('array')
    })

    it('Should return the previous state if an action was not matched', () => {
      let state = reducer({}, { type: 'OTHER_ACTION' })

      expect(state).to.eql({})
    })

    it('should handle PHONES_FAILURE', () => {
      const state = reducer({}, {type: PHONES_SUCCESS, data: phones })
      const expectedState = { all: phones }

      expect(state).to.eql(expectedState)
    })
  })
})

