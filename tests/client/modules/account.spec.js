import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import BlitzApi from 'services/BlitzApi';

import {
  SUBSCRIPTION_PENDING,
  SUBSCRIPTION_SUCCESS,
  SUBSCRIPTION_FAILURE,
  SUBSCRIPTION_CANCEL_PENDING,
  SUBSCRIPTION_CANCEL_SUCCESS,
  SUBSCRIPTION_CANCEL_FAILURE,
  SUBSCRIPTION_REQUEST,
  PASSWORD_UPDATE_REQUEST,
  getSubscription,
  cancelSubscription,
  subscriptionSuccess,
  subscriptionFailure,
  subscriptionCancelSuccess,
  subscriptionCancelFailure,
  default as reducer,
} from 'routes/client/Dashboard/AccountEdit/modules/subscription';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe( '(subscription module) subscriptions', () => {

  it('Should export a constant.', () => {
    expect(SUBSCRIPTION_PENDING).to.equal('SUBSCRIPTION_PENDING')
    expect(SUBSCRIPTION_SUCCESS).to.equal('SUBSCRIPTION_SUCCESS')
    expect(SUBSCRIPTION_FAILURE).to.equal('SUBSCRIPTION_FAILURE')
    expect(SUBSCRIPTION_CANCEL_PENDING).to.equal('SUBSCRIPTION_CANCEL_PENDING')
    expect(SUBSCRIPTION_CANCEL_SUCCESS).to.equal('SUBSCRIPTION_CANCEL_SUCCESS')
    expect(SUBSCRIPTION_CANCEL_FAILURE).to.equal('SUBSCRIPTION_CANCEL_FAILURE')
    expect(SUBSCRIPTION_REQUEST).to.equal('/dashboard/api/v1/subscriptions')
  })

  describe('(Action Creator) subscriptionSuccess', () => {
    const subscription = {id: 1}

    it('Should return an action with type SUBSCRIPTION_SUCCESS', () => {
      expect(subscriptionSuccess()).to.have.property('type', SUBSCRIPTION_SUCCESS)
    })

    it('Should return an action with subscripiton object', () => {
      expect(subscriptionSuccess(subscription)).to.have.property('subscription', subscription)
    })
  })

  describe('(Action Creator) subscriptionFailure', () => {
    const error = { errorMessage: 'error message' }

    it('Should return an action with type SUBSCRIPTION_FAILURE', () => {
      expect(subscriptionFailure()).to.have.property('type', SUBSCRIPTION_FAILURE)
    })

    it('Should return an action with error object', () => {
      expect(subscriptionFailure(error)).to.have.property('error', error)
    })
  })

  describe('(Action Creator) subscriptionCancelSuccess', () => {
    const subscription = {id: 1}

    it('Should return an action with type SUBSCRIPTION_CANCEL_SUCCESS', () => {
      expect(subscriptionCancelSuccess()).to.have.property('type', SUBSCRIPTION_CANCEL_SUCCESS)
    })

    it('Should return an action with subscripiton object', () => {
      expect(subscriptionCancelSuccess(subscription)).to.have.property('subscription', subscription)
    })
  })

  describe('(Async Action Creator) getSubscripiton', () => {
    let subscriptionApi;

    beforeEach(() => {
      subscriptionApi = sinon.stub(BlitzApi, 'get')
    })

    afterEach(() => {
      subscriptionApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(getSubscription).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(getSubscription()).to.be.a('function')
    })

    it('created SUBSCRIPTION_SUCCESS when fetching subscription', (done) => {
      const subscription = {id: 1}
      const resolved = new Promise((r) => r({ data: subscription }));
      subscriptionApi.returns(resolved);

      const expectedActions = [
        { type: SUBSCRIPTION_SUCCESS, subscription: subscription }
      ]

      const store = mockStore({ subscription: {} })

      return store.dispatch(getSubscription())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    })

    it('created SUBSCRIPTION_FAILURE when fetching subscription', (done) => {
      const error = {errorMessage: 'error'}
      const resolved = new Promise((_, r) => r(error));
      subscriptionApi.returns(resolved);

      const expectedActions = [
        { type: SUBSCRIPTION_FAILURE, error }
      ]

      const store = mockStore({ subscription: {} })

      return store.dispatch(getSubscription())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    })
  })

  describe('(Async Action) cancelSubscripition', () => {
    let subscriptionApi;

    beforeEach(() => {
      subscriptionApi = sinon.stub(BlitzApi, 'patch')
    })

    afterEach(() => {
      subscriptionApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(cancelSubscription).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(cancelSubscription()).to.be.a('function')
    })

    it('created SUBSCRIPTION_CANCEL_SUCCESS when canceling subscription', (done) => {
      const subscription = {id: 1, cancel_date: null, is_active: true, next_payment: 'tomorrow', start_date: 'yesteday' }
      const resolved = new Promise((r) => r({ data: subscription }));
      subscriptionApi.returns(resolved);

      const expectedActions = [
        { type: SUBSCRIPTION_CANCEL_SUCCESS, subscription: subscription }
      ]

      const store = mockStore({ subscription: {} })

      return store.dispatch(cancelSubscription())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    })
  })

  describe('(Reducer)', () => {

    const errorRes = {errorMessage: 'error'}
    const subscriptionRes = { id: 1, cancel_date: 'now', is_active: true, next_payment: 'tomorrow', start_date: 'yesterday' }
    const subscriptionState = {id: 1, cancelDate: 'now', isActive: true, nextPayment: 'tomorrow', startDate: 'yesterday'}

    it('Should be a function.', () => {
      expect(reducer).to.be.a('function')
    })

    it('Should initilaize with an object.', () => {
      expect(reducer(undefined, {})).to.be.an('object')
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = reducer({}, { type: SUBSCRIPTION_SUCCESS, subscription: subscriptionRes })
      expect(state).to.be.an('object')
      expect(state).to.have.property('id', 1)
      expect(state).to.have.property('cancelDate', 'now')
      expect(state).to.have.property('isActive', true)
      expect(state).to.have.property('nextPayment', 'tomorrow')
      expect(state).to.have.property('startDate', 'yesterday')

      state = reducer(state, { type: 'NOT_ACTION' })
      expect(state).to.have.property('id', 1)
      expect(state).to.have.property('cancelDate', 'now')
      expect(state).to.have.property('isActive', true)
      expect(state).to.have.property('nextPayment', 'tomorrow')
      expect(state).to.have.property('startDate', 'yesterday')
    })

    it('should handle SUBSCRIPTION_FAILURE', () => {
      expect(reducer({}, {
        type: SUBSCRIPTION_FAILURE,
        error: errorRes
      })).to.eql({error: errorRes})
    });

    it('should handle SUBSCRIPTION_CANCEL_SUCCESS', () => {
      expect(reducer({}, {
        type: SUBSCRIPTION_CANCEL_SUCCESS,
        subscription: subscriptionRes
      })).to.eql(subscriptionState)
    })
  })
})

