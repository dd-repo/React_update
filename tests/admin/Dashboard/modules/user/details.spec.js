import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import clickadillyApi from 'services/clickadillyApi';

import { formatDate } from 'utils/dateHelper';

import {
  USER_SUCCESS,
  USER_FAILURE,
  USER_PENDING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  USER_REQUEST,
  USER_UPDATE_REQUEST,
  fetchUser,
  gettingUser,
  receiveUserSuccess,
  receiveUserFailure,
  updateUserFailure,
  updateUserSuccess,
  updateUser,
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
  active_until: "2017-07-17T08:47:42.858-07:00",
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

describe('(User module)', () => {

  it('should export constants', () => {
    expect(USER_SUCCESS).to.equal('USER_SUCCESS')
    expect(USER_FAILURE).to.equal('USER_FAILURE')
    expect(USER_PENDING).to.equal('USER_PENDING')
    expect(UPDATE_USER_SUCCESS).to.equal('UPDATE_USER_SUCCESS')
    expect(UPDATE_USER_FAILURE).to.equal('UPDATE_USER_FAILURE')
    expect(USER_REQUEST).to.equal('/admin/api/user')
    expect(USER_UPDATE_REQUEST).to.equal('/admin/api/users')
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

  describe('(Action Creator) "updateUserSuccess"', () => {
    it('should return a type with "UPDATE_USER_SUCCESS"', () => {
      expect(updateUserSuccess()).to.have.property('type', UPDATE_USER_SUCCESS)
    })

    it('should return property with data', () => {
      expect(updateUserSuccess(userResponse)).to.have.property('data', userResponse)
    })
  })

  describe('(Action Creator) "updateUserFailure"', () => {
    it('should return a type with "UPDATE_USER_FAILURE"', () => {
      expect(updateUserFailure()).to.have.property('type', UPDATE_USER_FAILURE)
    })

    it('should return propery error', () => {
      expect(updateUserFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) "fetchUser"', () => {
    let userApi;

    beforeEach(() => {
      userApi = sinon.stub(clickadillyApi, 'get')
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

  describe('(Async Action Creator) "updateUser"', () => {
    let updateUserApi;

    beforeEach(() => {
      updateUserApi = sinon.stub(clickadillyApi, 'patch')
    })

    afterEach(() => {
      updateUserApi.restore()
    })

    it('should be exported as a function', () => {
      expect(updateUser).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(updateUser).to.be.a('function')
    })

    it('creates UPDATE_USER_SUCCESS', (done) => {
      const resolved = new Promise((r) => r({data: userResponse}));
      updateUserApi.returns(resolved)

      const expectedActions = [
        { type: UPDATE_USER_SUCCESS, data: userResponse }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(updateUser({id: 1}))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('created UPDATE_USER_FAILURE', done => {
      const rejected = new Promise((_, r) => r(errorRes));
      updateUserApi.returns(rejected)

      const expectedActions = [
        { type: UPDATE_USER_FAILURE, error: errorRes }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(updateUser({id: 1}))
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
        fullName: 'Fred Flintstone',
        email: 'fred@email.com',
        is_active: true,
        created_at: formatDate("2017-07-17T08:47:42.858-07:00"),
        active_until: formatDate("2017-07-17T08:47:42.858-07:00")
      }
      expect(userState).to.eql(userDetails)
    })

    it('should handle UPDATE_USER_SUCCESS', () => {
      const newDetails = {
        id: 1,
        first_name: 'Fred',
        last_name: 'Flintstone',
        fullName: 'Fred Flintstone',
        email: 'fred@email.com',
        is_active: false,
        created_at: formatDate("2017-07-17T08:47:42.858-07:00"),
        active_until: formatDate("2017-07-17T08:47:42.858-07:00")
      }
      const oldDetails = {
        id: 1,
        first_name: 'Fred',
        last_name: 'Flintstone',
        fullName: 'Fred Flintstone',
        email: 'fred@email.com',
        is_active: true,
        created_at: "2017-07-17T08:47:42.858-07:00",
        active_until: "2017-07-17T08:47:42.858-07:00",
      }
      const userState = reducer(oldDetails, { type: UPDATE_USER_SUCCESS, data: newDetails })
      expect(userState).to.eql(newDetails)
    })
  })
})
