import clickadillyApi from 'services/clickadillyApi';

// action types
export const REQUESTED_REMOVAL_STATUS_SUCCESS = 'REQUESTED_REMOVAL_STATUS_SUCCESS';
export const REQUESTED_REMOVAL_STATUS_FAILURE = 'REQUESTED_REMOVAL_STATUS_FAILURE';
export const REQUESTED_REMOVAL_STATUS_REQUEST = '/dashboard/api/v1/requested-removal-status';

export const fetchPrivacyRemovalStatus = account_id => {
  const path = `${REQUESTED_REMOVAL_STATUS_REQUEST}/${account_id}`
  return dispatch => {
    return clickadillyApi.get(path)
    .then( response => dispatch(receivePrivacyRemovalStatus(response.data)))
    .catch( error => dispatch(rejectPrivacyRemovalStatus(error)))
  }
}

export const receivePrivacyRemovalStatus = data => (
  {
    type: REQUESTED_REMOVAL_STATUS_SUCCESS,
    data
  }
)

export const rejectPrivacyRemovalStatus = error => (
  {
    type: REQUESTED_REMOVAL_STATUS_FAILURE,
    error
  }
)

export const configData = data => {
  const inProgressValue = data['inprogress'] || 0
  const requestedValue = data['requested'] || 0
  return [
    { name: 'In Progress', value: (inProgressValue + requestedValue) },
    { name: 'In Queue', value: data['queued'] || 0 },
    { name: 'Potential Risks', value: data['pending'] || 0 }
  ]
}

const reducer = (state=[], action) => {
  switch(action.type) {
    case REQUESTED_REMOVAL_STATUS_SUCCESS:
      return configData(action.data)
    default:
      return state
  }
  return state
}

export default reducer;
