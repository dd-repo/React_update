import BlitzApi from 'services/BlitzApi';
import { USER_SUCCESS } from './user';

export const UPDATE_SUBSCRIPTION_SUCCESS = 'UPDATE_SUBSCRIPTION_SUCCESS'
export const UPDATE_SUBSCRIPTION_FAILURE = 'UPDATE_SUBSCRIPTION_FAILURE'
export const UPDATE_SUBSCRIPTION_REQUEST = '/admin/api/subscriptions'

export const updateSubscription = subscription => {
  const path = `${UPDATE_SUBSCRIPTION_REQUEST}/${subscription.id}`
  const payload = { subscription }
  return dispatch => {
    return BlitzApi.patch(path, payload)
    .then( response => dispatch(updateSubscriptionSuccess(response.data)))
    .catch( error => dispatch(updateSubscriptionFailure(error)))
  }
}

export const updateSubscriptionSuccess = data => {
 return (
  {
    type: UPDATE_SUBSCRIPTION_SUCCESS,
    data
  }
)
}

export const updateSubscriptionFailure = error => (
  {
    type: UPDATE_SUBSCRIPTION_FAILURE,
    error
  }
)

export const insertSubscription = (state=[], subscription) => {
  const index = state.findIndex(s => s.id === subscription.id)
  if(index !== -1) {
    return [
      ...state.slice(0, index),
      subscription,
      ...state.slice(index + 1)
    ]
  }
  return state
}
const reducer = (state=[], action) => {
  switch(action.type) {
    case USER_SUCCESS:
      return action.data.subscriptions
    case UPDATE_SUBSCRIPTION_SUCCESS:
      return insertSubscription(state, action.data)
    default:
      return state
  }
  return state
}

export default reducer;
