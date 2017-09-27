import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import infosweepApi from 'services/infosweepApi';

import { formatDate } from 'utils';

import {
  USER_SUCCESS,
} from 'routes/admin/Dashboard/Users/Client/modules/details';

import {
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAILURE,
  UPDATE_TRANSACTION_REQUEST,
  updateTransaction,
  updateTransactionSuccess,
  updateTransactionFailure,
  default as reducer
} from 'routes/admin/Dashboard/Users/Client/modules/transactions';

import {
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_FAILURE
} from 'routes/admin/Dashboard/Users/Client/modules/subscriptions';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const errorRes = {
  status: 400,
  response: {data: {errorMessage: 'error message'}}
}

const transaction = {
  id: 1,
  created_at: "2017-06-22T13:46:50.097-07:00",
  processed_at: "2017-06-22",
  type_of_deal: "new_deal",
  response: null,
  state: "completed",
  round: 1,
  subscription_id: 1,
  sales_rep_name: " ",
  client_name: "alizera Anderson",
  third_party_id: "60025467327",
  user_email: "ali_anderson@email.co",
  sales_rep_email: null,
  card_third_party_id: "1806917381",
  card_source: "authnet",
  card_card_month: "2",
  card_card_year: "2020",
  card_card_holder_name: "ali",
  card_last_4: "4242",
  user_first_name: "alizera",
  user_last_name: "Anderson",
  amount: 39,
  status: "completed"
}

describe('(Transaction module)', () => {

  it('should export constants', () => {
    expect(UPDATE_TRANSACTION_SUCCESS).to.equal('UPDATE_TRANSACTION_SUCCESS')
    expect(UPDATE_TRANSACTION_FAILURE).to.equal('UPDATE_TRANSACTION_FAILURE')
    expect(UPDATE_TRANSACTION_REQUEST).to.equal('/admin/api/transactions')
  })

  describe('Action Creator "updateTransactionSuccess"', () => {
    it('should return a type with "UPDATE_TRANSACTION_SUCCESS"', () => {
      expect(updateTransactionSuccess()).to.have.property('type', UPDATE_TRANSACTION_SUCCESS)
    })

    it('should return a type with data', () => {
      expect(updateTransactionSuccess(transaction)).to.have.property('data', transaction)
    })
  })

  describe('Action Creator "updateTransactionFailure"', () => {
    it('should return a type with "UPDATE_TRANSACTION_FAILURE"', () => {
      expect(updateTransactionFailure()).to.have.property('type', UPDATE_TRANSACTION_FAILURE)
    })

    it('should return a type with data', () => {
      expect(updateTransactionFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) "updateTransaction"', () => {
    let transactionApi;

    beforeEach(() => {
      transactionApi = sinon.stub(infosweepApi, 'patch')
    })

    afterEach(() => {
      transactionApi.restore()
    })

    it('should be exported as a function', () => {
      expect(updateTransaction).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(updateTransaction(transaction)).to.be.a('function')
    })

    it('creates UPDATE_TRANSACTION_SUCCESS', (done) => {
      const resolved = new Promise((r) => r({data: transaction}));
      transactionApi.returns(resolved)

      const expectedActions = [
        { type: UPDATE_TRANSACTION_SUCCESS, data: transaction }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(updateTransaction(transaction))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('created UPDATE_TRANSACTION_FAILURE', done => {
      const rejected = new Promise((_, r) => r(errorRes));
      transactionApi.returns(rejected)

      const expectedActions = [
        { type: UPDATE_TRANSACTION_FAILURE, error: errorRes }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(updateTransaction(transaction))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('(Reducer)', () => {
    const userResponse = {
      transactions: [
        {
          id: 1,
          status: "completed"
        },
        {
          id: 2,
          status: 'completed'
        },
        {
          id: 3,
          status: 'declined'
        }
      ]
    }

    const updatedTransaction = {
      id: 1,
      status: 'refunded'
    }

    const newTransaction = {
      id: 1,
      state: "declined",
      round: 1,
      subscription_id: 1,
      sales_rep_name: " ",
      client_name: "first last",
      third_party_id: "60025467327",
      user_email: "test@email.com",
      sales_rep_email: null,
      card_card_month: "2",
      card_card_year: "2020",
      card_card_holder_name: "first last",
      card_last_4: "4242",
      user_first_name: "first",
      user_last_name: "last",
      amount: 39,
      status: "declined"
    }

    const errorResWithTransaction = {
      status: 422,
      response: {
        data: {
        errorMessage: 'card was declined',
        transaction: newTransaction
      }}
    }

    it('Should be a function', () => {
      expect(reducer).to.be.a('function')
    })

    it('should initialize with an object', () => {
      expect(reducer(undefined, [])).to.be.an('array')
    })

    it('should handle USER_SUCCESS', () => {
      const transactionState = reducer([], { type: USER_SUCCESS, data: userResponse})
      const expectedState = userResponse.transactions.reverse()
      expect(transactionState).to.eql(expectedState)
    })

    it('should handle UPDATE_TRANSACTION_SUCCESS', () => {
      const transactionState = reducer(userResponse.transactions, { type: UPDATE_TRANSACTION_SUCCESS, data: updatedTransaction})
      const expectedState = [...userResponse.transactions.slice(0,2), updatedTransaction]
      expect(transactionState).to.eql(expectedState)
    })

    it('should handle CREATE_SUBSCRIPTION_SUCCESS', () => {
      const newSubscriptionResponse = {
        subscription: {id: 1},
        transaction
      }
      const transactionState = reducer(userResponse.transactions, { type: CREATE_SUBSCRIPTION_SUCCESS, data: newSubscriptionResponse})
      const expected = [transaction, ...userResponse.transactions]

      expect(transactionState).to.eql(expected)
    })

    it('should handle CREATE_SUBSCRIPTION_FAILURE', () => {
      const transactionState = reducer(userResponse.transactions, { type: CREATE_SUBSCRIPTION_FAILURE, error: errorResWithTransaction })
      const expectedState = [newTransaction, ...userResponse.transactions]
      expect(transactionState).to.eql(expectedState)
    })
  })
})

