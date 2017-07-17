import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BlitzApi from 'services/BlitzApi';

import {
  USERS_SUCCESS,
  USERS_FAILURE,
  USERS_PENDING,
  USERS_REQUEST,
  BECOME_USER_REQUEST,
  getAllUsers,
  becomeUser,
  gettingAllUsers,
  receiveAllUsers,
  receiveAllUsersFailure,
  default as reducer
} from 'routes/admin/Dashboard/Users/modules/users';
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_POSTING,
  receiveClientLogin,
  receiveUserLoginFailure
} from 'routes/auth/modules/auth';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const usersResponse = {
  users: [
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ],
  meta: {
    pagination: {
      limit: 5,
      total: 20
    }
  }
}

const user = {
  user: {
    id: 1,
    first_name: 'Fred',
    last_name: 'Flintstone',
    email: 'fred@email.com',
    role: 'client',
    access_token: '1:aaaaaaaaaaa',
    account_id: 1,
    isFetching: false
  },
  account: {
    id: 1,
    is_active: true,
    email: 'email.com',
    first_name: 'first',
    last_name: 'last',
    keywords: [{id: 1, keyword: 'keyword 1'}, {id: 2, keyword: 'keyword 2'}],
    profile: {id: 1, maiden_name: 'maiden', middle_name: 'middle', avatar: '', drivers_license: ''}
  }
}
const errorRes = {
  status: 400,
  response: {data: {errorMessage: 'error message'}}
}

describe('(Users module)', () => {

  it('should export constants', () => {
    expect(USERS_SUCCESS).to.equal('USERS_SUCCESS')
    expect(USERS_FAILURE).to.equal('USERS_FAILURE')
    expect(USERS_PENDING).to.equal('USERS_PENDING')
    expect(USERS_REQUEST).to.equal('/admin/api/users_search')
    expect(BECOME_USER_REQUEST).to.equal('/admin/api/users/become')
  })

  describe('(Action Creator) "gettingAllUsers"', () => {
    it('Should return a type with "USERS_PENDING"', () => {
      expect(gettingAllUsers()).to.have.property('type', USERS_PENDING)
    })
  })

  describe('(Action Creator) receiveAllUsers', () => {
    it('Should return a type with "USERS_SUCCESS"', () => {
      expect(receiveAllUsers()).to.have.property('type', USERS_SUCCESS)
    })

    it('Should return a type with data', () => {
      expect(receiveAllUsers(usersResponse)).to.have.property('data', usersResponse)
    })
  })

  describe('(Action Creator) receiveAllUsersFailure', () => {
    it('Should return a type with "USERS_FAILURE"', () => {
      expect(receiveAllUsersFailure()).to.have.property('type', USERS_FAILURE)
    })

    it('Should return a type with error', () => {
      expect(receiveAllUsersFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) "getAllUsers"', () => {
    let usersApi;

    beforeEach(() => {
     usersApi = sinon.stub(BlitzApi, 'get')
    })

    afterEach(() => {
      usersApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(getAllUsers).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(getAllUsers()).to.be.a('function')
    })

    it('creates USERS_SUCCESS', (done) => {
      const resolved = new Promise((r) => r({data: usersResponse}));
      usersApi.returns(resolved)

      const expectedActions = [
        { type: USERS_PENDING },
        { type: USERS_SUCCESS, data: usersResponse }
      ]

      const store = mockStore({ users: {} })

      return store.dispatch(getAllUsers())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('creates USERS_FAILURE', (done) => {
      const rejected = new Promise((_, r) => r(errorRes));
      usersApi.returns(rejected)

      const expectedActions = [
        { type: USERS_PENDING },
        { type: USERS_FAILURE, error: errorRes }
      ]

      const store = mockStore({ users: {} })

      return store.dispatch(getAllUsers())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('(Async Action Creator) "becomeUser"', () => {
    let userApi;

    beforeEach(() => {
     userApi = sinon.stub(BlitzApi, 'patch')
    })

    afterEach(() => {
      userApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(becomeUser).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(becomeUser()).to.be.a('function')
    })

    it('creates USER_LOGIN_SUCCESS', (done) => {
      const resolved = new Promise((r) => r({data: user}));
      userApi.returns(resolved)

      const expectedActions = [
        { type: USER_LOGIN_SUCCESS, data: user }
      ]

      const store = mockStore({ currentUser: {} })

      return store.dispatch(becomeUser())
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
      let state = reducer({}, { type: USERS_PENDING })
      expect(state).to.be.an('object')
      expect(state).to.have.property('isFetching', true)
      state = reducer(state, { type: 'NOT_ACTION' })
      expect(state).to.have.property('isFetching', true)
    })

    it('should handle USERS_PENDING', () => {
      expect(reducer({}, {
        type: USERS_PENDING }))
        .to.eql( { isFetching: true })
    })

    it('should handle USERS_SUCCESS', () => {
      expect(reducer({}, {
        type: USERS_SUCCESS,
        data: usersResponse
      }))
        .to.eql( {
          all: usersResponse.users,
          pagination: usersResponse.meta.pagination,
          isFetching: false
        })
    })

    it('should handle USERS_FAILURE', () => {
      expect(reducer({}, {
        type: USERS_FAILURE,
        error: errorRes
      })).to.eql({
        isFetching: false,
        error: errorRes
      })
    })
  })
})
