import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import BlitzApi from 'services/BlitzApi';

import {
  PAYMENT_POSTING,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
  PAYMENT_REQUEST,
  postPayment,
  postingPayment,
  paymentSuccess,
  paymentFailure,
  default as reducer
} from 'routes/client/Payment/modules/payment';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const errorRes = {
  response: {
    data: {
      errorMessage: 'error message'
    }
  }
}

describe('(profile module) "profile"', () => {

  it('Should export a constant.', () => {
    expect(PAYMENT_SUCCESS).to.equal('PAYMENT_SUCCESS')
    expect(PAYMENT_POSTING).to.equal('PAYMENT_POSTING')
    expect(PAYMENT_FAILURE).to.equal('PAYMENT_FAILURE')
    expect(PAYMENT_REQUEST).to.equal('/dashboard/api/v1/users/sign-up/payment')
  })

  describe('(Action Creator) "postingPayment"', () => {
    it('Should return a action with type PAYMENT_POSTING', () => {
      expect(postingPayment()).to.have.property('type', PAYMENT_POSTING)
    })
  })

  describe('(Action Creator) "paymentSuccess"', () => {
    const user = {id: 1}
    it('Should return a action with type PAYMENT_SUCCESS', () => {
      expect(paymentSuccess()).to.have.property('type', PAYMENT_SUCCESS)
    })

    it('Should return a action with user object', () => {
      expect(paymentSuccess(user)).to.have.property('user', user)
    })
  })

  describe('(Action Creator) "paymentFailure"', () => {
    it('Should return a action with type PAYMENT_FAILURE', () => {
      expect(paymentFailure()).to.have.property('type', PAYMENT_FAILURE)
    })

    it('Should return a action with user object', () => {
      expect(paymentFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) "postPayment"', () => {
    let paymentApi;

    beforeEach(() => {
      paymentApi = sinon.stub(BlitzApi, 'post')
    })

    afterEach(() => {
      paymentApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(postPayment).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(postPayment()).to.be.a('function')
    })

    it('creates PAYMENT_SUCCESS when posting payment', (done) => {
      const user = {}
      const resolved = new Promise((r) => r({ data: user }))
      paymentApi.returns(resolved)

      const expectedActions = [
        { type: PAYMENT_POSTING },
        { type: PAYMENT_SUCCESS, user }
      ]

      const store = mockStore({ payment: {} })

      return store.dispatch(postPayment())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })

    it('creates PAYMENT_FAILURE when posting payment', (done) => {
      const rejected = new Promise((_, r) => r(errorRes))
      paymentApi.returns(rejected)

      const expectedActions = [
        { type: PAYMENT_POSTING },
        { type: PAYMENT_FAILURE, error: errorRes }
      ]

      const store = mockStore({ payment: {} })

      return store.dispatch(postPayment())
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
      let state = reducer({}, { type: PAYMENT_POSTING })
      expect(state).to.be.an('object')
      expect(state).to.have.property('isFetching', true)
      state = reducer(state, { type: 'NOT_ACTION' })
      expect(state).to.have.property('isFetching', true)
    })

    it('should handle PAYMENT_SUCCESS', () => {
      const user = {id: 1}
      expect(reducer({}, {
        type: PAYMENT_SUCCESS,
        user
      })).to.eql({
        isFetching: false,
        success: true
      })
    })

    it('should handle PAYMENT_FAILURE', () => {
      const paymentState = reducer({}, { type: PAYMENT_FAILURE, error: errorRes})

      expect(paymentState).to.eql({
        isFetching: false,
        errorMessage: errorRes.response.data.message,
        success: false
      })
    })
  })
})
