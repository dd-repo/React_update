import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BlitzApi from 'services/BlitzApi';

import {
  USER_SUCCESS,
  USER_FAILURE,
  USER_PENDING,
  USER_REQUEST,
  ACCOUNT_REQUEST,
  CARDS_REQUEST,
  fetchUser,
  gettingUser,
  receiveUserSuccess,
  receiveUserFailure,
  default as reducer
} from 'routes/admin/Dashboard/User/modules/user';


const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)


const userResponse = {
  id: 1,
  first_name: 'Fred',
  last_name: 'Flintstone',
  email: 'fred@email.com',
  is_active: true,
  created_at: "2017-07-17T08:47:42.858-07:00",
  accounts: [
    {
      id: 1,
      is_active: true,
      email: 'email.com',
      first_name: 'first',
      last_name: 'last',
      keywords: [{id: 1, keyword: 'keyword 1'}, {id: 2, keyword: 'keyword 2'}],
      profile: {id: 1, maiden_name: 'maiden', middle_name: 'middle', avatar: '', drivers_license: ''}
    }
  ],
  transactions: [
    {
      amount: 39,
      card_id: 20,
      created_at: "2017-07-17T08:35:44.742-07:00",
      id: 12,
      processed_at: "2017-07-17",
      response: null,
      round: 1,
      state: "completed",
      status: "refunded",
      subscription_id: 12,
      third_party_id: "ch_1AgbG72gWEuZsPCYyGn1GVig",
      type_of_deal: "new_deal",
      updated_at: "2017-07-17T08:38:38.323-07:00",
    },
  ],
  subscriptions: [
    {
      cancel_date: null,
      card_id: 20,
      client_name: "hap good",
      created_at: "2017-07-17T08:35:44.733-07:00",
      end_date: "2027-07-17",
      id: 12,
      is_active: true,
      plan_description: "individual plan",
      plan_id: 2,
      sales_rep_name: "nate venn",
      start_date: "2017-07-17",
      user_id: 15
    }
  ]
}

const errorRes = {
  status: 400,
  response: {data: {errorMessage: 'error message'}}
}

describe.only('(User module)', () => {

  it('should export constants', () => {
    expect(USER_SUCCESS).to.equal('USER_SUCCESS')
    expect(USER_FAILURE).to.equal('USER_FAILURE')
    expect(USER_PENDING).to.equal('USER_PENDING')
    expect(USER_REQUEST).to.equal('/admin/api/user')
  })

  describe('(Action Creator) "gettingUser"', () => {
    it('should return a type with "USER_PENDING"', () => {
      expect(gettingUser()).to.have.property('type', USER_PENDING)
    })
  })

  describe('(Action Creator) "receiveUserSuccess"', () => {
    it('should return a type with "USER_SUCCESS"', () => {
      expect(receiveUserSuccess()).to.have.property('type', USER_SUCCESS)
    })

    it('should return property with data', () => {
      expect(receiveUserSuccess(userResponse)).to.have.property('data', userResponse)
    })
  })

  describe('(Action Creator) "receiveUserFailure"', () => {
    it('should return a type with "USER_FAILURE"', () => {
      expect(receiveUserFailure()).to.have.property('type', USER_FAILURE)
    })

    it('should return propery error', () => {
      expect(receiveUserFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) "fetchUser"', () => {
    let userApi;

    beforeEach(() => {
      userApi = sinon.stub(BlitzApi, 'get')
    })

    afterEach(() => {
      userApi.restore()
    })

    it('should be exported as a function', () => {
      expect(fetchUser).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(fetchUser()).to.be.a('function')
    })

    it('creates USER_SUCCESS', (done) => {
      const resolved = new Promise((r) => r({data: userResponse}));
      userApi.returns(resolved)

      const expectedActions = [
        { type: USER_PENDING },
        { type: USER_SUCCESS, data: userResponse }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(fetchUser())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('created USER_FAILURE', done => {
      const rejected = new Promise((_, r) => r(errorRes));
      userApi.returns(rejected)

      const expectedActions = [
        { type: USER_PENDING },
        { type: USER_FAILURE, error: errorRes }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(fetchUser())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('(Reducer)', () => {

    it('Should be a function', () => {
      expect(reducer).to.be.a('function')
    })

    it('should initialize with an object', () => {
      expect(reducer(undefined, {})).to.be.an('object')
    })

    it('should handle USER_PENDING', () => {
      expect(reducer({}, {
        type: USER_PENDING }))
        .to.eql( { isFetching: true })
    })

    it('should handle USER_SUCCESS', () => {
      const userState = reducer({}, { type: USER_SUCCESS, data: userResponse })
      const userDetails = {
        id: 1,
        first_name: 'Fred',
        last_name: 'Flintstone',
        email: 'fred@email.com',
        is_active: true,
        created_at: "2017-07-17T08:47:42.858-07:00",
      }
      expect(userState).to.eql({
          isFetching: false,
          details: userDetails,
          transactions: userResponse.transactions,
          subscriptions: userResponse.subscriptions
        })
    })

    it('should handle USER_FAILURE', () => {
      const userState = reducer({}, { type: USER_FAILURE, error: errorRes})
      expect(userState).to.eql({
        isFetching: false,
        errorMessage: errorRes.response.data.errorMessage
      })
    })
  })
})
