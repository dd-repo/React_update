import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BlitzApi from 'services/BlitzApi';

import {
  ACCOUNT_SUCCESS
} from 'routes/admin/Dashboard/User/modules/account';

import {
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAILURE,
  CREATE_ADDRESS_SUCCESS,
  CREATE_ADDRESS_FAILURE,
  ADDRESS_REQUEST,
  updateAddress,
  updateAddressSuccess,
  updateAddressFailure,
  submitAddress,
  createAddress,
  createAddressSuccess,
  createAddressFailure,
  default as reducer
} from 'routes/admin/Dashboard/User/modules/addresses';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const address = {
  id: 1,
  address1: "123 blvd",
  city: "Denver",
  zip: "90000",
  state: "Colorado",
  account_id: 3
}

const errorRes = {
  status: 400,
  response: {data: {errorMessage: 'error message'}}
}

const accountId = 1

describe('(Address module)', () => {

  it('should export constants', () => {
    expect(UPDATE_ADDRESS_SUCCESS).to.equal('UPDATE_ADDRESS_SUCCESS')
    expect(UPDATE_ADDRESS_FAILURE).to.equal('UPDATE_ADDRESS_FAILURE')
    expect(CREATE_ADDRESS_SUCCESS).to.equal('CREATE_ADDRESS_SUCCESS')
    expect(CREATE_ADDRESS_FAILURE).to.equal('CREATE_ADDRESS_FAILURE')
    expect(ADDRESS_REQUEST).to.equal('/admin/api/addresses')
  })

  describe('Action Creator "updateAddressSuccess"', () => {
    it('should return a type with "UPDATE_ADDRESS_SUCCESS"', () => {
      expect(updateAddressSuccess()).to.have.property('type', UPDATE_ADDRESS_SUCCESS)
    })

    it('should return a type with data', () => {
      expect(updateAddressSuccess(address)).to.have.property('data', address)
    })
  })

  describe('Action Creator "updateAddressFailure"', () => {
    it('should return a type with "UPDATE_ADDRESS_FAILURE"', () => {
      expect(updateAddressFailure()).to.have.property('type', UPDATE_ADDRESS_FAILURE)
    })

    it('should return a type with data', () => {
      expect(updateAddressFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('Action Creator "createAddressSuccess"', () => {
    it('should return a type with "CREATE_ADDRESS_SUCCESS"', () => {
      expect(createAddressSuccess()).to.have.property('type', CREATE_ADDRESS_SUCCESS)
    })

    it('should return a type with data', () => {
      expect(createAddressSuccess(address)).to.have.property('data', address)
    })
  })

  describe('Action Creator "updateAddressFailure"', () => {
    it('should return a type with "CREATE_ADDRESS_FAILURE"', () => {
      expect(createAddressFailure()).to.have.property('type', CREATE_ADDRESS_FAILURE)
    })

    it('should return a type with data', () => {
      expect(createAddressFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) "updateAddress"', () => {
    let addressApi;

    beforeEach(() => {
      addressApi = sinon.stub(BlitzApi, 'patch')
    })

    afterEach(() => {
     addressApi.restore()
    })

    it('should be exported as a function', () => {
      expect(updateAddress).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(updateAddress()).to.be.a('function')
    })

    it('creates UPDATE_ADDRESS_SUCCESS', (done) => {
      const resolved = new Promise((r) => r({data: address}));
      addressApi.returns(resolved)

      const expectedActions = [
        { type: UPDATE_ADDRESS_SUCCESS, data: address }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(updateAddress({id: 1}))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('created UPDATE_ADDRESS_FAILURE', done => {
      const rejected = new Promise((_, r) => r(errorRes));
      addressApi.returns(rejected)

      const expectedActions = [
        { type: UPDATE_ADDRESS_FAILURE, error: errorRes }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(updateAddress({id: 1}))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('Async Action Creator "createAddress"', () => {
    let addressApi;

    beforeEach(() => {
      addressApi = sinon.stub(BlitzApi, 'post')
    })

    afterEach(() => {
     addressApi.restore()
    })

    it('should be exported as a function', () => {
      expect(updateAddress).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(updateAddress()).to.be.a('function')
    })

    it('created CREATE_ADDRESS_SUCCESS', done => {
      const resolved = new Promise((r) => r({data: address}));
      addressApi.returns(resolved)

      const expectedActions = [
        { type: CREATE_ADDRESS_SUCCESS, data: address }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(createAddress({id: 1}, accountId))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('created CREATE_ADDRESS_FAILURE', done => {
      const rejected = new Promise((_, r) => r(errorRes));
      addressApi.returns(rejected)

      const expectedActions = [
        { type: CREATE_ADDRESS_FAILURE, error: errorRes }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(createAddress({id: 1}, accountId))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('(Reducer)', () => {
    const accountResponse = {
      addresses: [
        {
          id: 1,
          address1: "123 blvd",
          city: "Denver",
          zip: "90000",
          state: "Colorado",
          account_id: 3
        }
      ]
    }

    const oldAddress = {
      id: 1,
      address1: "123 st",
      city: "Denver",
      zip: "80000",
      state: "Colorado",
      account_id: 3
    }

    it('Should be a function', () => {
      expect(reducer).to.be.a('function')
    })

    it('should initialize with an object', () => {
      expect(reducer(undefined, [])).to.be.an('array')
    })

    it('should handle ACCOUNT_SUCCESS', () => {
      const addressState = reducer([], { type: ACCOUNT_SUCCESS, data: accountResponse})

      expect(addressState).to.eql([address])
    })

    it('should handle UPDATE_ADDRESS_SUCCESS', () => {
      const addressState = reducer([oldAddress], { type: UPDATE_ADDRESS_SUCCESS, data: address})
      expect(addressState).to.eql([address])
    })

    it('should handle CREATE_ADDRESS_SUCCESS', () => {
      const addressState = reducer([], { type: CREATE_ADDRESS_SUCCESS, data: address})
      const expectedState = [address]
      expect(addressState).to.eql(expectedState)
    })
  })
})
