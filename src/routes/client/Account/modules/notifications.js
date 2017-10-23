import infosweepApi from 'services/infosweepApi';

export const NOTIFICATIONS_SUCCESS = 'NOTIFICATIONS_SUCCESS';
export const NOTIFICATIONS_FAILURE = 'NOTIFICATIONS_FAILURE';
export const NOTIFICATIONS_UPDATE_SUCCESS = 'NOTIFICATIONS_UPDATE_SUCCESS';

export const fetchAccountNotifications = accountId => {
  const path = '/dashboard/api/v1/account-system-notifications/search'
  const params = {
    q: {
      account_id_eq: accountId,
      s: 'updated_at desc'
    }
  }
  return dispatch => {
    return infosweepApi.get(path, params)
    .then( response => dispatch(receiveAccountNotificationsSuccess(response.data)))
    .catch( error => dispatch(receiveAccountNotificationsFailure(error)))
  }
}

export const updateAccountNotificationStatus = notificationId => {
  const path = `/dashboard/api/v1/account_system_notifications/${notificationId}`
  const params = {
    account_system_notification: {
      is_active: false,
    }
  }

  return dispatch => {
    return infosweepApi.patch(path, params)
    .then( response => dispatch(receiveNotificationUpdateSuccess(response.data)))
    .catch( error => dispatch(receiveNotificationUpdateFailure(error)))
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

export const receiveNotificationUpdateSuccess = data => (
  {
    type: NOTIFICATIONS_UPDATE_SUCCESS,
    data
  }
)

const updateNotification = (state, data) => (
  Object.assign({}, state, { [data.id]: data })
)

const toObject = notifications => {
  const newObject = {}
  for(let i=0; notifications.length > i; i++) {
    let obj = notifications[i]
    newObject[obj.is_type] = obj
  }
  return newObject
}

const reducer = (state={}, action) => {
  switch(action.type) {
    case NOTIFICATIONS_SUCCESS:
      return toObject(action.data.account_system_notifications)
    case NOTIFICATIONS_UPDATE_SUCCESS:
      return updateNotification(state, action.data)
    default:
      return state
  }
  return state
}

export default reducer;
