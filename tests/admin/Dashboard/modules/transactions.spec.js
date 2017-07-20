import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BlitzApi from 'services/BlitzApi';

import {
  TRANSACTIONS_PENDING,
  TRANSACTIONS_SUCCESS,
  TRANSACTIONS_FAILURE,
  TRANSACTIONS_REQUEST,
  TRANSACTION_REFUND_REQUEST,
  getTransactions,
  gettingTransactions,
  receiveTransactions,
  receiveTransactionsFailure,
  default as reducer
} from 'routes/admin/Dashboard/Transactions/modules/transactions';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const errRes = {
  status: 400,
  response: {data: {errorMessage: 'error message'}}
}

const transactions = {
  transactions: [
    {id: 1, status: 'completed'},
    {id: 2, status: 'completed'},
    {id: 3, status: 'completed'}
  ],
  meta: {
    pagination: {
      total: 10,
      limit: 20
    }
  }
}

const transaction = {
  id: 1,
  status: 'refunded'
}

describe('(Tranactions module)', () => {

  it('should export constants', () => {
    expect(TRANSACTIONS_PENDING).to.equal('TRANSACTIONS_PENDING')
    expect(TRANSACTIONS_SUCCESS).to.equal('TRANSACTIONS_SUCCESS')
    expect(TRANSACTIONS_FAILURE).to.equal('TRANSACTIONS_FAILURE')
    expect(TRANSACTIONS_REQUEST).to.equal('/admin/api/transactions/search')
  })

  describe('(Action Creator) gettingTransactions', () => {
    it('Should return a type with "TRANSACTIONS_PENDING"', () => {
      expect(gettingTransactions()).to.have.property('type', TRANSACTIONS_PENDING)
    })
  })

  describe('(Action Creator) receiveTransactions', () => {
    it('Should return a type with "TRANSACTIONS_SUCCESS"', () => {
      expect(receiveTransactions()).to.have.property('type', TRANSACTIONS_SUCCESS)
    })

    it('Should return an action with removals',  () => {
      let data = {all: [{id: 1}, {id: 2}, {id: 3}]}
      expect(receiveTransactions(data)).to.have.property('data', data)
    })
  })

  describe('(Action Creator) receiveTransacionFailure', () => {
    it('Should return a type with "TRANSACTIONS_FAILURE"', () => {
      expect(receiveTransactionsFailure()).to.have.property('type', TRANSACTIONS_FAILURE)
    })

    it('Should return an acition with error', () => {
      let error = {response: { data: { errorMessage: 'error' }}}
      expect(receiveTransactionsFailure(error)).to.have.property('error', error)
    })
  })

  describe('(Async Action Creator) getTransactions', () => {
    let transactionsRequestApi;

    beforeEach(() => {
     transactionsRequestApi = sinon.stub(BlitzApi, 'get')
    })

    afterEach(() => {
      transactionsRequestApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(getTransactions).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(getTransactions()).to.be.a('function')
    })

    it('creates TRANSACTIONS_SUCCESS', (done) => {

      const resolved = new Promise((r) => r({data: transactions}));
      transactionsRequestApi.returns(resolved)

      const expectedActions = [
        { type: TRANSACTIONS_PENDING },
        { type: TRANSACTIONS_SUCCESS, data: transactions }
      ]

      const store = mockStore({ transactions: {} })

      return store.dispatch(getTransactions())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('created TRANSACTIONS_FAILURE', (done) => {
      const rejected = new Promise((_, r) => r(errRes));
      transactionsRequestApi.returns(rejected);

      const expectedActions = [
        { type: TRANSACTIONS_PENDING },
        { type: TRANSACTIONS_FAILURE, error: errRes }
      ]

      const store = mockStore({ transactions: {} })

      return store.dispatch(getTransactions())
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
      expect(reducer(undefined, {})).to.be.an('object')
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = reducer({isFetching: false}, { type: TRANSACTIONS_PENDING })
      expect(state).to.be.an('object')
      expect(state).to.have.property('isFetching', true)
      state = reducer({isFetching: true}, { type: 'NOT_ACTION' })
      expect(state).to.have.property('isFetching', true)
    })

    it('should handle TRANSACTIONS_PENDING', () => {
      expect(reducer({}, {
        type: TRANSACTIONS_PENDING
      })).to.eql({
        isFetching: true
      })
    })

    it('should handle TRANSACTIONS_SUCCESS', () => {
      expect(reducer({}, {
        type: TRANSACTIONS_SUCCESS,
        data: transactions
      })).to.eql({
        all: transactions.transactions,
        pagination: transactions.meta.pagination,
        isFetching: false
      })
    })

    it('should handle TRANSACTIONS_FAILURE', () => {
      expect(reducer({}, {
        type: TRANSACTIONS_FAILURE,
        error: errRes
      })).to.eql({
        isFetching: false,
        error: errRes
      })
    })
  })
})
