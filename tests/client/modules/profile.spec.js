import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import infosweepApi from 'services/infosweepApi';

import {
  PROFILE_UPDATE_POSTING,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  updateUserProfile,
  getProfile,
  postingProfile,
  profileUpdateSuccess,
  profileUpdateFailure,
  profileSuccess,
  profileFailure,
  default as reducer
} from 'routes/client/Account/modules/profile';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const successfulProfileResponse = {
  avatar_url: "avatar.png",
  driver_license_url: "driverLicense.png",
  id: 1,
  maiden_name: 'maiden',
  middle_name: 'middle'
}

const errorRes = {errorMessage: 'error'}

describe('(profile module) "profile"', () => {

  it('Should export a constant.', () => {
    expect(PROFILE_UPDATE_POSTING).to.equal('PROFILE_UPDATE_POSTING')
    expect(PROFILE_UPDATE_SUCCESS).to.equal('PROFILE_UPDATE_SUCCESS')
    expect(PROFILE_UPDATE_FAILURE).to.equal('PROFILE_UPDATE_FAILURE')
    expect(PROFILE_SUCCESS).to.equal('PROFILE_SUCCESS')
    expect(PROFILE_FAILURE).to.equal('PROFILE_FAILURE')
  })

  describe('(Action Creator) "postingProfile"', () => {
    it('Should return a action with type PROFILE_UPDATE_POSTING', () => {
      expect(postingProfile()).to.have.property('type', PROFILE_UPDATE_POSTING)
    })
  })

  describe('(Action Creator) "profileUpdateSuccess"', () => {
    it('Should return a action with type PROFILE_UPDATE_POSTING', () => {
      expect(profileUpdateSuccess()).to.have.property('type', PROFILE_UPDATE_SUCCESS)
    })
  })

  describe('(Action Creator) "profileUpdateFailure"', () => {
    it('Should return an action with type PROFILE_UPDATE_FAILURE', () => {
      expect(profileUpdateFailure()).to.have.property('type', PROFILE_UPDATE_FAILURE)
    })

    it('Should return an action with profile error object', () => {
      expect(profileUpdateFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Action Creator) "profileSuccess"', () => {
    const profile = { id: 1 }
    it('Should return an action with type PROFILE_SUCCESS', () => {
      expect(profileSuccess()).to.have.property('type', PROFILE_SUCCESS)
    })

    it('Should return an action with profile error object', () => {
      expect(profileSuccess(profile)).to.have.property('profile', profile)
    })
  })

  describe('(Action Creator) "profileFailure"', () => {
    it('Should return an action with type PROFILE_FAILURE', () => {
      expect(profileFailure()).to.have.property('type', PROFILE_FAILURE)
    })

    it('Should return an action with profile error object', () => {
      expect(profileFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) "getProfile"', () => {
    let profileApi;

    beforeEach(() => {
      profileApi = sinon.stub(infosweepApi, 'get')
    })

    afterEach(() => {
      profileApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(getProfile).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(getProfile()).to.be.a('function')
    })

    it('creates PROFILE_SUCCESS when fetching profile', (done) => {
      const resolved = new Promise((r) => r({ data: successfulProfileResponse }))
      profileApi.returns(resolved)

      const expectedActions = [
        { type: PROFILE_SUCCESS, profile: successfulProfileResponse }
      ]

      const store = mockStore({ profile: {} })

      return store.dispatch(getProfile())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })

    it('creates PROFILE_FAILURE when fetching profile', (done) => {
      const rejected = new Promise((_, r) => r(errorRes))
      profileApi.returns(rejected)

      const expectedActions = [
        { type: PROFILE_FAILURE, error: errorRes }
      ]

      const store = mockStore({ profile: {} })

      return store.dispatch(getProfile())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })
  })

  describe('(Async Action Creator) "updateUserProfile"', () => {
    let profileApi;

    beforeEach(() => {
      profileApi = sinon.stub(infosweepApi, 'patch')
    })

    afterEach(() => {
      profileApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(updateUserProfile).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(updateUserProfile()).to.be.a('function')
    })

    it('creates PROFILE_UPDATE_SUCCESS when updating profile', (done) => {
      const resolved = new Promise((r) => r({ data: successfulProfileResponse }))
      profileApi.returns(resolved)

      const expectedActions = [
        { type: PROFILE_UPDATE_POSTING },
        { type: PROFILE_UPDATE_SUCCESS }
      ]

      const store = mockStore({ profile: {} })

      return store.dispatch(updateUserProfile())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })

    it('creates PROFILE_UPDATE_FAILURE when updating profile', (done) => {
      const rejected = new Promise((_, r) => r(errorRes))
      profileApi.returns(rejected)

      const expectedActions = [
        { type: PROFILE_UPDATE_POSTING },
        { type: PROFILE_UPDATE_FAILURE, error: errorRes }
      ]

      const store = mockStore({ profile: {} })

      return store.dispatch(updateUserProfile())
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
      let state = reducer({}, { type: PROFILE_UPDATE_POSTING })
      expect(state).to.be.an('object')
      expect(state).to.have.property('isFetching', true)
      state = reducer(state, { type: 'NOT_ACTION' })
      expect(state).to.have.property('isFetching', true)
    })

    it('should handle PROFILE_SUCCESS', () => {
      expect(reducer({}, {
        type: PROFILE_SUCCESS,
        profile: successfulProfileResponse
      })).to.eql({
        avatar: "avatar.png",
        driver_license: "driverLicense.png",
        id: 1,
        maiden_name: 'maiden',
        middle_name: 'middle'
      })
    })

    it('should handle PROFILE_FAILURE', () => {
      expect(reducer({}, {
        type: PROFILE_FAILURE,
        error: errorRes
      })).to.eql({ error: errorRes })
     })

    it('should handle PROFILE_UPDATE_POSTING', () => {
      expect(reducer({}, {
        type: PROFILE_UPDATE_POSTING
      })).to.eql({
        isFetching: true
      })
    })

    it('should handle PROFILE_UPDATE_SUCCESS', () => {
      expect(reducer({}, {
        type: PROFILE_UPDATE_SUCCESS
      })).to.eql({
        isFetching:false
      })
    })

    it('should handle PROFILE_UPDATE_FAILURE', () => {
      expect(reducer({}, {
        type: PROFILE_UPDATE_FAILURE,
        error: errorRes
      })).to.eql({
        isFetching: false,
        error: errorRes
      })
    })
  })
})

