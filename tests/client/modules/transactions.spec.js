import {
  TRANSACTIONS_FETCHING,
  TRANSACTIONS_SUCCESS,
  TRANSACTIONS_FAILURE,
  TRANSACTIONS_REQUEST,
  TRANSACTION_RECEIPT_SENDING,
  TRANSACTION_RECEIPT_SUCCESS,
  TRANSACTION_RECEIPT_FAILURE,
  fetchTransactions,
  receiveTransactionSuccess,
  receiveTransactionFailure,
  receiveTransactionReceiptSuccess,
  receiveTransactionReceiptFailure,
  sendTransactionReceipt,
  default as reducer
} from 'routes/client/Account/modules/transactions';

describe( '(client transaction module) transactions', () => {

  it('should export a constant', () => {
    expect(TRANSACTIONS_FETCHING).to.equal('TRANSACTIONS_FETCHING')
    expect(TRANSACTIONS_SUCCESS).to.equal('TRANSACTIONS_SUCCESS')
    expect(TRANSACTIONS_FAILURE).to.equal('TRANSACTIONS_FAILURE')
    expect(TRANSACTION_RECEIPT_SENDING).to.equal('TRANSACTION_RECEIPT_SENDING')
    expect(TRANSACTION_RECEIPT_SUCCESS).to.equal('TRANSACTION_RECEIPT_SUCCESS')
    expect(TRANSACTION_RECEIPT_FAILURE).to.equal('TRANSACTION_RECEIPT_FAILURE')
    expect(TRANSACTIONS_REQUEST).to.equal('/dashboard/api/v1/transactions/search')
  })

  describe('(Action Creator) receiveTransactionSuccess', () => {
    const transactions = {}
    it('should return an action with type TRANSACTIONS_SUCCESS', () => {
      expect(receiveTransactionSuccess()).to.have.property('type', TRANSACTIONS_SUCCESS)
    })

    it('should return an action with subscription object', () => {
      expect(receiveTransactionSuccess(transactions)).to.have.property('data', transactions)
    })
  })

  describe('(Action Creator) receiveTransactionFailure', () => {
    const error = {}
    it('should return an action with type TRANSACTIONS_FAILURE', () => {
      expect(receiveTransactionFailure()).to.have.property('type', TRANSACTIONS_FAILURE)
    })

    it('should return an action with error object', () => {
      expect(receiveTransactionFailure(error)).to.have.property('error', error)
    })
  })

  describe('(Action Creator) receiveTransactionReceiptSuccess', () => {
    const data = {}
    it('should return an action with type TRANSACTION_RECEIPT_SUCCESS', () => {
      expect(receiveTransactionReceiptSuccess()).to.have.property('type', TRANSACTION_RECEIPT_SUCCESS)
    })

    it('should return an action with type data', () => {
      expect(receiveTransactionReceiptSuccess(data)).to.have.property('data', data)
    })
  })

  describe('(Action Creator) receiveTransactionReceiptFailure', () => {
    const error = {}
    it('should return an action with type TRANSACTION_RECEIPT_FAILURE', () => {
      expect(receiveTransactionReceiptFailure()).to.have.property('type', TRANSACTION_RECEIPT_FAILURE)
    })

    it('should return an action with type error', () => {
      expect(receiveTransactionReceiptFailure(error)).to.have.property('error', error)
    })
  })

  describe('(Async Action Creator) fetchTransactions', () => {
    let transactionApi;

    beforeEach(() => {
      transactionApi = sinon.stub(infosweepApi, 'get')
    })

    afterEach(() => {
      transactionApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(fetchTransactions).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(fetchTransactions()).to.be.a('function')
    })

    it('created TRANSACTIONS_SUCCESS when fetching transactions', (done) => {
      const resolved = new Promise((r) => r({ data: {} }));
      transactionApi.returns(resolved);

      const expectedActions = [
        { type: TRANSACTIONS_SUCCESS, data: {} }
      ]

      const store = mockStore({ transactions: {} })

      return store.dispatch(fetchTransactions())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    })

    it('creates a TRANSACTIONS_FAILURE', (done) => {
      const resolved = new Promise((_, r) => r({}));
      transactionApi.returns(resolved);

      const expectedActions = [
        { type: TRANSACTIONS_FAILURE, error: {} }
      ]

      const store = mockStore({ transactions: {} })

      return store.dispatch(fetchTransactions())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    })
  })

  describe('(Async Action) sendTransactionReceipt', () => {
    let transactionApi;

    beforeEach(() => {
      transactionApi = sinon.stub(infosweepApi, 'patch')
    })

    afterEach(() => {
      transactionApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(sendTransactionReceipt).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(sendTransactionReceipt()).to.be.a('function')
    })


    it('creates a TRANSACTION_RECEIPT_SUCCESS', (done) => {
      const resolved = new Promise((r) => r({ data: {} }))
      transactionApi.returns(resolved)

      const expectedActions = [
        { type: TRANSACTION_RECEIPT_SUCCESS, data: {} }
      ]

      const store = mockStore({ transactions: {} })

      return store.dispatch(sendTransactionReceipt())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
          done()
        })
    })

    it('creates a TRANSACTION_RECEIPT_FAILURE', (done) => {
      const rejected = new Promise((_, r) => r({}))
      transactionApi.returns(rejected)

      const expectedActions = [
        { type: TRANSACTION_RECEIPT_FAILURE, error: {} }
      ]

      const store = mockStore({ transactions: {} })

      return store.dispatch(sendTransactionReceipt())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions)
          done()
        })
    })
  })

  describe('Reducer', () => {

    it('Should be a function.', () => {
      expect(reducer).to.be.a('function')
    })

    it('Should initilaize with an object.', () => {
      expect(reducer(undefined, [])).to.be.an('array')
    })

    it('should handle TRANSACTIONS_SUCCESS', () => {
      const state = reducer({}, { type: TRANSACTIONS_SUCCESS, data: { transactions: [] }})
      const expectedState = []
      expect(state).to.eql(expectedState)
    })
  })
})

