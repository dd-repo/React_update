import axios from 'axios';

import { BASE_URL } from 'consts/apis';

export const PROFILE_POSTING = 'PROFILE_POSTING';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAILURE = 'PROFILE_FAILURE';

// actions
const profileRequest = (profileInfo, profile_id, access_token) => (
  {
    method: 'patch',
    url: `${BASE_URL}/profiles/${profile_id}`,
    header: {
      'Content-Type': 'application/json',
      'Authorization': access_token
    },
    data: JSON.stringify({ profile: profileInfo })
  }
);

export const postUserProfile = (profileInfo, profile_id, access_token) => {
  return dispatch => {
    dispatch(postingProfile())
    return axios(profileRequest(profileInfo, profile_id, access_token))
    .then(
      response => console.log('res', response)
      //response => dispatch(profileSuccess(response.data))
    ).catch(
    error => dispatch(profileFailure(error.response.data.errorMessage))
    )
  }
}

const postingProfile = () => {
return (
  {
    type: PROFILE_POSTING
  }
)
}

const profileSuccess = response => {
  return (
  {
    type: PROFILE_SUCCESS,
    response
  }
)
}

const profileFailure = error => {
  return (
  {
    type: PROFILE_FAILURE,
    error
  }
)
}
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
