import clickadillyApi from 'services/clickadillyApi';

import {
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_SUCCESS,
  USER_LOGOUT,
} from 'routes/auth/modules/auth';

export const PROFILE_UPDATE_POSTING = 'PROFILE_UPDATE_POSTING';
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';
export const PROFILE_UPDATE_FAILURE = 'PROFILE_UPDATE_FAILURE';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAILURE = 'PROFILE_FAILURE';

// actions

export const updateUserProfile = (payload, profile_id) => {
  const path = `/dashboard/api/v1/profiles/${profile_id}`
  return dispatch => {
    dispatch(postingProfile())
    return clickadillyApi.patch(path, payload)
    .then(
      response => dispatch(profileUpdateSuccess(response.data))
    ).catch(
    error => dispatch(profileUpdateFailure(error))
    )
  }
}

export const getProfile = (profile_id) => {
  const path = `/dashboard/api/v1/profiles/${profile_id}`
  return dispatch => {
    return clickadillyApi.get(path)
    .then(
      response => dispatch(profileSuccess(response.data))
    ).catch(
    error => dispatch(profileFailure(error))
    )
  }
}

export const postingProfile = () => (
  {
    type: PROFILE_UPDATE_POSTING
  }
)

export const profileUpdateSuccess = () => (
  {
    type: PROFILE_UPDATE_SUCCESS,
  }
)

export const profileUpdateFailure = error => (
  {
    type: PROFILE_UPDATE_FAILURE,
    error
  }
)

export const profileSuccess = profile => (
    {
      type: PROFILE_SUCCESS,
      profile
    }
)

export const profileFailure = error => (
    {
      type: PROFILE_FAILURE,
      error
    }
)

// reducer
export const addProfile = (state, profile) => {
  return Object.assign({}, state, {
    avatar: profile.avatar_url,
    driver_license: profile.driver_license_url,
    id: profile.id,
    maiden_name: profile.maiden_name,
    middle_name: profile.middle_name
  })
}

const reducer = (state = {}, action) => {
  switch(action.type) {
    case PROFILE_UPDATE_POSTING:
      return Object.assign({}, state, {
        isFetching: true
      })
    case PROFILE_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false
      })
    case PROFILE_UPDATE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    case PROFILE_SUCCESS:
      return addProfile(state, action.profile)
    case PROFILE_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      })
    case USER_LOGIN_SUCCESS:
      return addProfile(state, action.data.account.profile)
    case USER_SIGNUP_SUCCESS:
      return addProfile(state, action.data.account.profile)
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
  return state
}

export default reducer;

