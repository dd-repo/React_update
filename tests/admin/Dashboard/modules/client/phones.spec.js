import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import clickadillyApi from 'services/clickadillyApi';

import {
  ACCOUNT_SUCCESS
} from 'routes/admin/Dashboard/Users/Client/modules/account';

import {
  UPDATE_PHONE_SUCCESS,
  UPDATE_PHONE_FAILURE,
  UPDATE_PHONE_REQUEST,
  updatePhoneSuccess,
  updatePhoneFailure,
  updatePhone,
  default as reducer
} from 'routes/admin/Dashboard/Users/Client/modules/phones';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const phone = {
  id: 1,
  phone_number: "5555555555",
  account_id: 3,
  phone_type_id: 2
}

const errorRes = {
  status: 400,
  response: {data: {errorMessage: 'error message'}}
}

describe('(Phone module)', () => {
  it('should export constants', () => {
    expect(UPDATE_PHONE_SUCCESS).to.equal('UPDATE_PHONE_SUCCESS')
    expect(UPDATE_PHONE_FAILURE).to.equal('UPDATE_PHONE_FAILURE')
    expect(UPDATE_PHONE_REQUEST).to.equal('/admin/api/phones')
  })

  describe('action creator "updatephoneSuccess"', () => {
    it('should return a type with "UPDATE_PHONE_SUCCESS"', () => {
      expect(updatePhoneSuccess()).to.have.property('type', UPDATE_PHONE_SUCCESS)
    })

    it('should return a type with data', () => {
      expect(updatePhoneSuccess(phone)).to.have.property('data', phone)
    })
  })

  describe('action creator "updatePhoneFailure"', () => {
    it('should return a type with "UPDATE_PHONE_FAILURE"', () => {
      expect(updatePhoneFailure()).to.have.property('type', UPDATE_PHONE_FAILURE)
    })

    it('should return a type with data', () => {
      expect(updatePhoneFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) "updatePhone"', () => {
    let phoneApi;

    beforeEach(() => {
      phoneApi = sinon.stub(clickadillyApi, 'patch')
    })

    afterEach(() => {
      phoneApi.restore()
    })

    it('should be exported as a function', () => {
      expect(updatePhone).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(updatePhone()).to.be.a('function')
    })

    it('creates UPDATE_PHONE_FAILURE', (done) => {
      const resolved = new Promise((r) => r({data: phone}));
      phoneApi.returns(resolved)

      const expectedActions = [
        { type: UPDATE_PHONE_SUCCESS, data: phone }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(updatePhone({id: 1}))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('created UPDATE_PHONE_FAILURE', done => {
      const rejected = new Promise((_, r) => r(errorRes));
      phoneApi.returns(rejected)

      const expectedActions = [
        { type: UPDATE_PHONE_FAILURE, error: errorRes }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(updatePhone({id: 1}))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('(Reducer)', () => {
    const accountResponse = {
      phones: [
        {
          id: 1,
          phone_number: "5555555555",
          account_id: 3,
          phone_type_id: 2
        }
      ]
    }

    const oldPhone = {
      id: 1,
      phone_number: "5555555555",
      account_id: 3,
      phone_type_id: 2
    }

    const updatedPhone = {
        id: 1,
        phone_number: "7777777777",
        account_id: 3,
        phone_type_id: 2
    }

    it('Should be a function', () => {
      expect(reducer).to.be.a('function')
    })

    it('should initialize with an object', () => {
      expect(reducer(undefined, [])).to.be.an('array')
    })

    it('should handle ACCOUNT_SUCCESS', () => {
      const phoneState = reducer([], { type: ACCOUNT_SUCCESS, data: accountResponse})

      expect(phoneState).to.eql([phone])
    })

    it('should handle UPDATE_PHONE_SUCCESS', () => {
      const phoneState = reducer([oldPhone], { type: UPDATE_PHONE_SUCCESS, data: updatedPhone})

      expect(phoneState).to.eql([updatedPhone])
    })
  })
})
