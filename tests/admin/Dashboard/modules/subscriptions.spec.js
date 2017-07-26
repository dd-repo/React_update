import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import clickadillyApi from 'services/clickadillyApi';

import {
  SUBSCRIPTIONS_PENDING,
  SUBSCRIPTIONS_SUCCESS,
  SUBSCRIPTIONS_FAILURE,
  SUBSCRIPTIONS_REQUEST,
  getSubscriptions,
  receiveSubscriptionsFailure,
  gettingSubscriptions,
  receiveSubscriptions,
  rejectSubscriptions,
  default as reducer
} from 'routes/admin/Dashboard/Subscriptions/modules/subscriptions';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const subscriptions = {
  subscriptions: [
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ],
  meta: {
    pagination: {
      total: 10,
      limit: 20
    }
  }
}
const errorRes = {
  response: {
    data: {
      status: 400,
      response: {data: {errorMessage: 'error message'}}
    }
  }
}

describe('(Subscription module)', () => {

  it('should export constants', () => {
    expect(SUBSCRIPTIONS_PENDING).to.equal('SUBSCRIPTIONS_PENDING')
    expect(SUBSCRIPTIONS_SUCCESS).to.equal('SUBSCRIPTIONS_SUCCESS')
    expect(SUBSCRIPTIONS_FAILURE).to.equal('SUBSCRIPTIONS_FAILURE')
    expect(SUBSCRIPTIONS_REQUEST).to.equal('/admin/api/subscriptions')
  })

  describe('(Action Creator) gettingSubscriptions', () => {
    it('Should return a type with "SUBSCRIPTIONS_PENDING"', () => {
      expect(gettingSubscriptions()).to.have.property('type', SUBSCRIPTIONS_PENDING)
    })
  })

  describe('(Action Creator) receiveSubscriptions', () => {
    it('Should return a type with "SUBSCRIPTIONS_SUCCESS"', () => {
      expect(receiveSubscriptions()).to.have.property('type', SUBSCRIPTIONS_SUCCESS)
    })

    it('Should return a type with data', () => {
      expect(receiveSubscriptions(subscriptions)).to.have.property('data', subscriptions)
    })
  })

  describe('(Action Creator) receiveSubscriptionsFailure', () => {
    it('Should return a type with "SUBSCRIPTIONS_FAILURE"', () => {
      expect(receiveSubscriptionsFailure()).to.have.property('type', SUBSCRIPTIONS_FAILURE)
    })

    it('Should return a type with data', () => {
      expect(receiveSubscriptionsFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) "getSubscriptions"', () => {
    let subscriptionApi;

    beforeEach(() => {
     subscriptionApi = sinon.stub(clickadillyApi, 'get')
    })

    afterEach(() => {
      subscriptionApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(getSubscriptions).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(getSubscriptions()).to.be.a('function')
    })

    it('creates SUBSCRIPTIONS_SUCCESS', (done) => {
      const resolved = new Promise((r) => r({data: subscriptions}));
      subscriptionApi.returns(resolved)

      const expectedActions = [
        { type: SUBSCRIPTIONS_PENDING },
        { type: SUBSCRIPTIONS_SUCCESS, data: subscriptions }
      ]

      const store = mockStore({ subscriptions: {} })

      return store.dispatch(getSubscriptions())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('creates SUBSCRIPTIONS_FAILURE', (done) => {
      const rejected = new Promise((_, r) => r(errorRes));
      subscriptionApi.returns(rejected)

      const expectedActions = [
        { type: SUBSCRIPTIONS_PENDING },
        { type: SUBSCRIPTIONS_FAILURE, error: errorRes }
      ]

      const store = mockStore({ subscriptions: {} })

      return store.dispatch(getSubscriptions())
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
      let state = reducer({}, { type: SUBSCRIPTIONS_PENDING })
      expect(state).to.be.an('object')
      expect(state).to.have.property('isFetching', true)
      state = reducer(state, { type: 'NOT_ACTION' })
      expect(state).to.have.property('isFetching', true)
    })

    it('should handle SUBSCRIPTIONS_PENDING', () => {
      expect(reducer({}, {
        type: SUBSCRIPTIONS_PENDING
      })).to.eql({
        isFetching: true
      })
    })

    it('should handle SUBSCRIPTIONS_SUCCESS', () => {
      expect(reducer({}, {
        type: SUBSCRIPTIONS_SUCCESS,
        data: subscriptions
      })).to.eql({
        all: subscriptions.subscriptions,
        pagination: subscriptions.meta.pagination,
        isFetching: false
      })
    })

    it('should handle SUBSCRIPTIONS_FAILURE', () => {
      expect(reducer({}, {
        type: SUBSCRIPTIONS_FAILURE,
        error: errorRes
      })).to.eql({
        error: errorRes,
        isFetching: false
      })
    })
  })
})

