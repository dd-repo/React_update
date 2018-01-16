import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import infosweepApi from 'services/infosweepApi';

import {
  ADDRESSES_FETCHING,
  ADDRESSES_SUCCESS,
  ADDRESSES_FAILURE,
  ADDRESSES_REQUEST,
  fetchAddresses,
  receiveAddressesSuccess,
  receiveAddressFailure,
  default as reducer
} from 'routes/client/Account/modules/addresses';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const errorRes = {errorMessage: 'error message'}

const addresses = [{
  id: 1,
  address1: '123',
  city: 'denver',
  state: 'CO'
}]

describe('(Address module) "Addresses"', () => {

  it('Should export a constant.', () => {
    expect(ADDRESSES_FETCHING).to.equal('ADDRESSES_FETCHING')
    expect(ADDRESSES_SUCCESS).to.equal('ADDRESSES_SUCCESS')
    expect(ADDRESSES_FAILURE).to.equal('ADDRESSES_FAILURE')
    expect(ADDRESSES_REQUEST).to.equal('/dashboard/api/v1/accounts')
  })

  describe('(Action Creator) "ADDRESSES_SUCCESS"', () => {
    it('Should return a action with type ADDRESSES_SUCCESS', () => {
      expect(receiveAddressesSuccess()).to.have.property('type', ADDRESSES_SUCCESS)
    })

    it('Should return a action with address data', () => {
      expect(receiveAddressesSuccess(addresses)).to.have.property('data', addresses)
    })
  })

  describe('(Action Creator) "ADDRESSES_FAILURE"', () => {
    it('Should return a action with type ADDRESSES_FAILURE', () => {
      expect(receiveAddressFailure()).to.have.property('type', ADDRESSES_FAILURE)
    })

    it('Should return a action with error', () => {
      expect(receiveAddressFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) "fetchAddresses"', () => {
    let addressesApi;

    beforeEach(() => {
      addressesApi = sinon.stub(infosweepApi, 'get')
    })

    afterEach(() => {
      addressesApi.restore()
    })

    it('should be exported as a function ', () => {
      expect(fetchAddresses).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(fetchAddresses()).to.be.a('function')
    })

    it('crestes ADDRESSES_SUCCESS when fetching addresses', done => {
      const resolved = new Promise((r) => r({data: addresses}))
      addressesApi.returns(resolved)

      const expectedActions = [
        { type: ADDRESSES_SUCCESS, data: addresses }
      ]

      const store = mockStore({ addresses: {} })

      return store.dispatch(fetchAddresses())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })

    it('creates ADDRESSES_FAILURE when fetching addresses', done => {
      const rejected = new Promise((_, r) => r(errorRes))
      addressesApi.returns(rejected)

      const expectedActions = [
        { type: ADDRESSES_FAILURE, error: errorRes}
      ]

      const store = mockStore({ addresses: {} })

      return store.dispatch(fetchAddresses())
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

    it('Should initilaize with an object.', () => {
      expect(reducer(undefined, {})).to.be.an('array')
    })

    it('Should return the previous state if an action was not matched', () => {
      let state = reducer({}, { type: 'OTHER_ACTION' })

      expect(state).to.eql({})
    })

    it('Should handle ADDRESSES_SUCCESS', () => {
      const state = reducer({}, {type: ADDRESSES_SUCCESS, data: addresses})
      const expectedState = addresses 

      expect(state).to.eql(expectedState)
    })
  })
})
