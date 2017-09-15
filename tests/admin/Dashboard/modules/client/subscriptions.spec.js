import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import clickadillyApi from 'services/clickadillyApi';

import {
  USER_SUCCESS,
} from 'routes/admin/Dashboard/Users/Client/modules/details';

import {
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_FAILURE,
  UPDATE_SUBSCRIPTION_SUCCESS,
  UPDATE_SUBSCRIPTION_FAILURE,
  SUBSCRIPTION_REQUEST,
  updateSubscription,
  createSubscription,
  updateSubscriptionSuccess,
  updateSubscriptionFailure,
  createSubscriptionSuccess,
  createSubscriptionFailure,
  insertSubscripiton,
  addSubscription,
  default as reducer
} from 'routes/admin/Dashboard/Users/Client/modules/subscriptions';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const subscription = {
  id: 1,
  user_id: 2,
  plan_id: 2,
  start_date: "2017-07-24",
  end_date: "2027-07-24",
  cancel_date: null,
  is_active: true,
  sales_rep_name: "admin",
  plan_description: "individual plan",
  client_name: "first last",
  card_id: 1,
}

const errorRes = {
  status: 400,
  response: {data: {errorMessage: 'error message'}}
}

const user_id = 1

describe('(Subscripiton module)', () => {
  it('should export constants', () => {
    expect(CREATE_SUBSCRIPTION_SUCCESS).to.equal('CREATE_SUBSCRIPTION_SUCCESS')
    expect(UPDATE_SUBSCRIPTION_SUCCESS).to.equal('UPDATE_SUBSCRIPTION_SUCCESS')
    expect(UPDATE_SUBSCRIPTION_FAILURE).to.equal('UPDATE_SUBSCRIPTION_FAILURE')
    expect(SUBSCRIPTION_REQUEST).to.equal('/admin/api/subscriptions')
  })

  describe('Action Creator "updateSubscriptionSuccess"', () => {
    it('should return a type with "UPDATE_SUBSCRIPTION_SUCCESS"', () => {
      expect(updateSubscriptionSuccess()).to.have.property('type', UPDATE_SUBSCRIPTION_SUCCESS)
    })

    it('should return data', () => {
      expect(updateSubscriptionSuccess(subscription)).to.have.property('data', subscription)
    })
  })

  describe('Action Creator "updateSubscriptionFailure"', () => {
    it('should return a type with "UPDATE_SUBSCRIPTION_FAILURE"', () => {
      expect(updateSubscriptionFailure()).to.have.property('type', UPDATE_SUBSCRIPTION_FAILURE)
    })

    it('should return an error', () => {
      expect(updateSubscriptionFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('Action Creator "createSubscriptionSuccess"', () => {
    it('should return a type with "CREATE_SUBSCRIPTION_SUCCESS"', () => {
      expect(createSubscriptionSuccess()).to.have.property('type', CREATE_SUBSCRIPTION_SUCCESS)
    })

    it('should return data', () => {
      expect(createSubscriptionSuccess(subscription)).to.have.property('data', subscription)
    })
  })

  describe('Action Creator "createSubscriptionFailure"', () => {
    it('should return a type with "CREATE_SUBSCRIPTION_FAILURE"', () => {
      expect(createSubscriptionFailure()).to.have.property('type', CREATE_SUBSCRIPTION_FAILURE)
    })

    it('should return error', () => {
      expect(createSubscriptionFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) "updateSubscription"', () => {
    let subscriptionApi;

    beforeEach(() => {
      subscriptionApi = sinon.stub(clickadillyApi, 'patch')
    })

    afterEach(() => {
      subscriptionApi.restore()
    })

    it('should be exported as a function', () => {
      expect(updateSubscription).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(updateSubscription({id: 1})).to.be.a('function')
     })

    it('creates UPDATE_SUBSCRIPTION_SUCCESS', (done) => {
      const resolved = new Promise((r) => r({data: subscription}));
      subscriptionApi.returns(resolved)

      const expectedActions = [
        { type: UPDATE_SUBSCRIPTION_SUCCESS, data: subscription }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(updateSubscription(subscription))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('creates UPDATE_SUBSCRIPTION_FAILURE', (done) => {
      const rejected = new Promise((_, r) => r(errorRes))
      subscriptionApi.returns(rejected)

      const expectedActions = [
        { type: UPDATE_SUBSCRIPTION_FAILURE, error: errorRes }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(updateSubscription(subscription))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('(Async Action Creator) "createSubscription"', () => {
    let subscriptionApi;

    beforeEach(() => {
      subscriptionApi = sinon.stub(clickadillyApi, 'post')
    })

    afterEach(() => {
      subscriptionApi.restore()
    })

    it('should be exported as a function', () => {
      expect(createSubscription).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(createSubscription()).to.be.a('function')
    })

    it('creates a CREATE_SUBSCRIPTION_SUCCESS', done => {
      const resolved = new Promise((r) => r({data: {subscription}}))
      subscriptionApi.returns(resolved)

      const expectedActions = [
        { type: CREATE_SUBSCRIPTION_SUCCESS, data: {subscription} }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(createSubscription(subscription, user_id))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('creates a CREATE_SUBSCRIPTION_FAILURE', done => {
      const rejected = new Promise((_, r) => r(errorRes))
      subscriptionApi.returns(rejected)

      const expectedActions = [
        { type: CREATE_SUBSCRIPTION_FAILURE, error: errorRes }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(createSubscription(subscription, user_id))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('(Reducer)', () => {
    const userResponse = {
      subscriptions: [
        {
          id: 1,
          user_id: 2,
          plan_id: 2,
          start_date: "2017-07-24",
          end_date: "2027-07-24",
          cancel_date: null,
          is_active: true,
          sales_rep_name: "admin",
          plan_description: "individual plan",
          client_name: "first last",
          card_id: 1,
        }
      ]
    }

    const updatedSubscription = {
          id: 1,
          user_id: 2,
          plan_id: 1,
          start_date: "2017-07-24",
          end_date: "2027-07-24",
          cancel_date: null,
          is_active: false,
          sales_rep_name: "admin",
          plan_description: "family plan",
          client_name: "first last",
          card_id: 2,
    }

    const newSubscription = {
          id: 2,
          user_id: 2,
          plan_id: 1,
          start_date: "2017-07-24",
          end_date: "2027-07-24",
          cancel_date: null,
          is_active: true,
          sales_rep_name: "admin",
          plan_description: "individual plan",
          client_name: "newFirst newLast",
          card_id: 3,
    }

    const errorResWithSubscription = {
      status: 422,
      response: {data: {
        errorMessage: 'error message',
        subscription: newSubscription
      }}
    }
    it('Should be a function', () => {
      expect(reducer).to.be.a('function')
    })

    it('should initialize with an object', () => {
      expect(reducer(undefined, [])).to.be.an('array')
    })

    it('should handle USER_SUCCESS', () => {
      const subscriptionState = reducer([], { type: USER_SUCCESS, data: userResponse})

      expect(subscriptionState).to.eql(userResponse.subscriptions)
    })

    it('should handle UPDATE_SUBSCRIPTION_SUCCESS', () => {
      const subscriptionState = reducer(userResponse.subscriptions, { type: UPDATE_SUBSCRIPTION_SUCCESS, data: updatedSubscription })

      expect(subscriptionState).to.eql([updatedSubscription])
    })

    it('shoulde handle CREATE_SUBSCRIPTION_SUCCESS', () => {
      const subscriptionState = reducer(userResponse.subscriptions, { type: CREATE_SUBSCRIPTION_SUCCESS, data: {subscription: newSubscription} })
      const expectedState = [newSubscription, ...userResponse.subscriptions]
      expect(subscriptionState).to.eql(expectedState)
    })

    it('should handle CREATE_SUBSCRIPTION_FAILURE', () => {
      const subscriptionState = reducer(userResponse.subscriptions, { type: CREATE_SUBSCRIPTION_FAILURE, error: errorResWithSubscription })
      const expectedState = [newSubscription, ...userResponse.subscriptions]
      expect(subscriptionState).to.eql(expectedState)
    })
  })
})

