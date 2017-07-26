import clickadillyApi from 'services/clickadillyApi';
import { ACCOUNT_SUCCESS } from './account';

export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';
export const UPDATE_PROFILE_REQUEST = '/admin/api/profiles';

export const updateProfile = profile => {
  const payload = { profile }
  return dispatch => {
    return clickadillyApi.patch(`${UPDATE_PROFILE_REQUEST}/${profile.id}`, payload)
    .then( response => dispatch(updateProfileSuccess(response.data)))
    .catch( error => dispatch(updateProfileFailure(error)))
  }
}

export const updateProfileSuccess = data => (
  {
    type: UPDATE_PROFILE_SUCCESS,
    data
  }
)

export const updateProfileFailure = error => (
  {
    type: UPDATE_PROFILE_FAILURE,
    error
  }
)
const setProfile = (state, profile) => (
  Object.assign({}, state, {
    avatar_url: profile.avatar_url,
    driver_license: profile.driver_license,
    id: profile.id,
    maiden_name: profile.maiden_name,
    middle_name: profile.middle_name
  })
)

const reducer = (state={}, action) => {
  switch(action.type) {
    case ACCOUNT_SUCCESS:
      return setProfile(state, action.data.profile)
    case UPDATE_PROFILE_SUCCESS:
      return setProfile(state, action.data)
    default:
      return state
  }
  return state
}

export default reducer
