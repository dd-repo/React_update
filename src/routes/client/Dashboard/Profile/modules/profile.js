import BlitzApi from 'services/BlitzApi';

import {
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_SUCCESS
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
    return BlitzApi.patch(path, payload)
    .then(
      response => dispatch(profileUpdateSuccess(response.data))
    ).catch(
    error => dispatch(profileUpdateFailure(error.response.data.errorMessage))
    )
  }
}

export const getProfile = (profile_id) => {
  const path = `/dashboard/api/v1/profiles/${profile_id}`
  return dispatch => {
    return BlitzApi.get(path)
    .then(
      response => dispatch(profileGetSuccess(response.data))
    ).catch(
    error => dispatch(profileGetFailure(error.response))
    )
  }
}

const postingProfile = () => {
return (
  {
    type: PROFILE_UPDATE_POSTING
  }
)
}

const profileUpdateSuccess = response => {
  return (
  {
    type: PROFILE_UPDATE_SUCCESS,
    response
  }
)
}

const profileUpdateFailure = error => {
  return (
  {
    type: PROFILE_UPDATE_FAILURE,
    error
  }
)
}

const profileGetSuccess = profile => {
  return (
    {
      type: PROFILE_SUCCESS,
      profile
    }
  )
}

const profileGetFailure = error => {
  return (
    {
      type: PROFILE_FAILURE,
      error
    }
  )
}

// reducer

const addProfile = (state, profile) => {
  return Object.assign({}, state, {
    avatar: profile.avatar,
    driver_license: profile.driver_license,
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
    case USER_LOGIN_SUCCESS:
      return addProfile(state, action.data.account.profile)
    case USER_SIGNUP_SUCCESS:
      return addProfile(state, action.data.account.profile)
    default:
      return state
  }
  return state
}

export default reducer;
