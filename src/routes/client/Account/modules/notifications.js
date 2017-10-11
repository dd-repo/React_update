import infosweepApi from 'services/infosweepApi';

export const NOTIFICATIONS_SUCCESS = 'NOTIFICATIONS_SUCCESS';
export const NOTIFICATIONS_FAILURE = 'NOTIFICATIONS_FAILURE';

export const fetchAccountNotifications = account_id => {
  const path = '/dashboard/api/v1/account-system-notifications/search'
  const params = {
    q: {
      account_id_eq: account_id,
      s: 'updated_at desc'
    }
  }
  return dispatch => {
    return infosweepApi.get(path, params)
    .then( response => dispatch(receiveAccountNotificationsSuccess(response.data)))
    .catch( error => dispatch(receiveAccountNotificationsFailure(error)))
  }
}

export const receiveAccountNotificationsSuccess = data => (
  {
    type: NOTIFICATIONS_SUCCESS,
    data
  }
)

export const receiveAccountNotificationsFailure = error => (
  {
    type: NOTIFICATIONS_FAILURE,
    error
  }
)

const reducer = (state=[], action) => {
  switch(action.type) {
    case NOTIFICATIONS_SUCCESS:
      return action.data.account_system_notifications
    default:
      return state
  }
  return state
}

export default reducer;
