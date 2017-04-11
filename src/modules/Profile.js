import axios from 'axios';

import { BASE_URL } from 'consts/apis';
import { USER_LOGIN_SUCCESS } from './auth';

export const PROFILE_UPDATE_POSTING = 'PROFILE_UPDATE_POSTING';
export const PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';
export const PROFILE_UPDATE_FAILURE = 'PROFILE_UPDATE_FAILURE';
export const PROFILE_GET_SUCCESS = 'PROFILE_GET_SUCCESS';
export const PROFILE_GET_FAILURE = 'PROFILE_GET_FAILURE';

// actions
const profilePutRequest = (profileInfo, profile_id, access_token) => {
  return (
    {
      method: 'put',
      url: `${BASE_URL}/profiles/${profile_id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': access_token
      },
      data: JSON.stringify({ profile: profileInfo })
    });
}

const profileGetRequest = (profile_id, authToken) => {
  let request = axios.create({
    baseURL: BASE_URL,
    headers: {'Authorization': authToken}
  });
  return request.get(
    `profiles/${profile_id}`
  );
}

export const postUserProfile = (profileInfo, profile_id, access_token) => {
  return dispatch => {
    dispatch(postingProfile())
    return axios(profilePutRequest(profileInfo, profile_id, access_token))
    .then(
      response => dispatch(profileUpdateSuccess(response.data))
    ).catch(
    error => dispatch(profileUpdateFailure(error.response.data.errorMessage))
    )
  }
}

export const getProfile = (profile_id, authToken) => {
  return dispatch => {
    return axios(profileGetRequest(profile_id, authToken))
    .then(
      response => dispatch(profileGetSuccess(response.data))
      //response => console.log('profile response', response)
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
      type: PROFILE_GET_SUCCESS,
      profile
    }
  )
}

const profileGetFailure = error => {
  return (
    {
      type: PROFILE_GET_FAILURE,
      error
    }
  )
}

// reducer
const reducer = (state = {}, action) => {
  switch(action.type) {
    case PROFILE_UPDATE_POSTING:
      return Object.assign({}, state, {
        isFetching: true
      })
    case PROFILE_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        // add attributes
      })
    case PROFILE_UPDATE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    case PROFILE_GET_SUCCESS:
      return Object.assign({}, state, {

      })
    case USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        avatar: action.data.account.profile.avatar,
        driver_license: action.data.account.profile.driver_license,
        id: action.data.account.profile.id,
        maiden_name: action.data.account.profile.maiden_name,
        middle_name: action.data.account.profile.middle_name
      })
    default:
      return state
  }
  return state
}

export default reducer;
