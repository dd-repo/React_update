import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import clickadillyApi from 'services/clickadillyApi';

import { ACCOUNT_SUCCESS } from 'routes/admin/Dashboard/User/modules/account';

import {
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  updateProfileSuccess,
  updateProfileFailure,
  updateProfile,
  default as reducer
} from 'routes/admin/Dashboard/User/modules/profile';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const profile = {
  id: 1,
  avatar: 'avatar url',
  driverLicense: 'driver license url',
  maidenName: 'maiden name',
  middleName: 'middle name'
}

const errorRes = {
  status: 400,
  response: {data: {errorMessage: 'error message'}}
}

describe('(Profile module)', () => {
  it('should export as consts', () => {
    expect(UPDATE_PROFILE_SUCCESS).to.eql('UPDATE_PROFILE_SUCCESS')
    expect(UPDATE_PROFILE_FAILURE).to.eql('UPDATE_PROFILE_FAILURE')
    expect(UPDATE_PROFILE_REQUEST).to.eql('/admin/api/profiles')
  })

  describe('action creator "updateProfileSuccess"', () => {
    it('should return a type with UPDATE_PROFILE_SUCCESS', () => {
      expect(updateProfileSuccess()).to.have.property('type', UPDATE_PROFILE_SUCCESS)
    })

    it('should return a type with data', () => {
      expect(updateProfileSuccess(profile)).to.have.property('data', profile)
    })
  })

  describe('action creator "updateProfileFailure"', () => {
    it('should return a type with UPDATE_PROFILE_FAILURE', () => {
      expect(updateProfileFailure()).to.have.property('type', UPDATE_PROFILE_FAILURE)
    })

    it('should return a type with error', () => {
      expect(updateProfileFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) "updateProfile"', () => {
    let profileApi;

    beforeEach(() => {
      profileApi = sinon.stub(clickadillyApi, 'patch')
    })

    afterEach(() => { profileApi.restore()
    })

    it('should be exported as a function', () => {
      expect(updateProfile).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(updateProfile()).to.be.a('function')
    })

    it('creates UPDATE_PROFILE_SUCCESS', (done) => {
      const resolved = new Promise((r) => r({data: profile}));
      profileApi.returns(resolved)

      const expectedActions = [
        { type: UPDATE_PROFILE_SUCCESS, data: profile }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(updateProfile({id: 1}))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('creates UPDATE_PROFILE_FAILURE', (done) => {
      const rejected = new Promise((_, r) => r(errorRes))
      profileApi.returns(rejected)

      const expectedActions = [
        { type: UPDATE_PROFILE_FAILURE, error: errorRes }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(updateProfile({id: 1}))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('(Reducer)', () => {
    const accountResponse = {
      profile: {
        id: 1,
        avatar_url: 'avatar url',
        driver_license_url: 'driver license url',
        maiden_name: 'maiden name',
        middle_name: 'middle name'
        }
    }

    const oldProfile = {
        id: 1,
        avatar: 'avatar url',
        driverLicense: 'driver license url',
        maidenName: 'oldMaiden name',
        middleName: 'oldMiddle name'
    }

    const newProfile = {
        id: 1,
        avatar_url: 'avatar url',
        driver_license_url: 'driver license url',
        maiden_name: 'newMaiden name',
        middle_name: 'newMiddle name'
    }

    const updatedProfile = {
        id: 1,
        avatar: 'avatar url',
        driverLicense: 'driver license url',
        maidenName: 'newMaiden name',
        middleName: 'newMiddle name'
    }

    it('Should be a function', () => {
      expect(reducer).to.be.a('function')
    })

    it('should initialize with an object', () => {
      expect(reducer(undefined, {})).to.be.an('object')
    })

    it('should handle ACCOUNT_SUCCESS', () => {
      const profileState = reducer({}, { type: ACCOUNT_SUCCESS, data: accountResponse})
      expect(profileState).to.eql(profile)
    })

    it('should handle UPDATE_PROFILE_SUCCESS', () => {
      const profileState = reducer(oldProfile, { type: UPDATE_PROFILE_SUCCESS, data: newProfile})
      expect(profileState).to.eql(updatedProfile)
    })
  })
})
