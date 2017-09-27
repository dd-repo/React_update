import infosweepApi from 'services/infosweepApi';

// action types
export const PRIVACY_REMOVAL_STATISTICS_SUCCESS = 'PRIVACY_REMOVAL_STATISTICS_SUCCESS'
export const PRIVACY_REMOVAL_STATISTICS_FAILURE = 'PRIVACY_REMOVAL_STATISTICS_FAILURE'
export const PRIVACY_REMOVAL_STATISTICS_REQUEST = '/dashboard/api/v1/privacy-removal-statistics'

export const fetchPrivacyRemovalStatistics = account_id => {
  const path = `${PRIVACY_REMOVAL_STATISTICS_REQUEST}/${account_id}`
  return dispatch => {
    return infosweepApi.get(path)
    .then( response => dispatch(receivePrivacyRemovalStatistics(response.data)))
    .catch( error => dispatch(rejectPrivacyRemovalStatistics(error)))
  }
}

export const receivePrivacyRemovalStatistics = data => (
  {
    type: PRIVACY_REMOVAL_STATISTICS_SUCCESS,
    data
  }
)

export const rejectPrivacyRemovalStatistics = error => (
  {
    type: PRIVACY_REMOVAL_STATISTICS_FAILURE,
    error
  }
)

const reducer = (state = [], action) => {
  switch(action.type) {
    case PRIVACY_REMOVAL_STATISTICS_SUCCESS:
      return action.data
    default:
      return state
  }
  return state
}

export default reducer;

