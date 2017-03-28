import axios from 'axios';

import { BASE_URL } from 'consts/apis';

export const PROFILE_POSTING = 'PROFILE_POSTING';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAILURE = 'PROFILE_FAILURE';
const PROFILE_REQUEST = `${BASE_URL}/profile/`;
const authToken = localStorage.getItem('access_token')

// actions
const profileRequest = (profileInfo, profile_id) => (
  {
    method: 'post',
    url: `${PROFILE_REQUEST}/${profile_id}`,
    header: {
      'Content-Type': 'application/json',
      'Authorization': authToken
    },
    data: JSON.stringify({ profile: profileInfo })
  }
);

export const postProfile = profileInfo => {
  return dispatch => {
    dispatch(postingProfile())
    return axios(profileRequest(profileInfo, profile_id))
    .then(
      response => dispatch(profileSuccess(response.data))
    ).catch(
    error => dispatch(profileFailure(error.response.data.errorMessage))
    )
  }
}

const postingProfile = () => (
  {
    type: PROFILE_POSTING
  }
)

const profileSuccess = response => (
  {
    type: PROFILE_SUCCESS,
    response
  }
)

const profileFailure = error => (
  {
    type: PROFILE_FAILURE,
    error
  }
)

// reducer
const reducer = (state = {}, action) => {
  switch(action.type) {
    case PROFILE_POSTING:
      return Object.assign({}, state, {
        isFetching: true
      })
    case PROFILE_SUCCESS:
      return Object.assign({}, state, {
        // add attributes
      })
    case PROFILE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    default:
      return state
  }
  return state
}

export default reducer;
