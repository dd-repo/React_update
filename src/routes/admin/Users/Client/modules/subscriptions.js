import infosweepApi from 'services/infosweepApi';
import _ from 'underscore';
import { USER_SUCCESS } from './details';

export const UPDATE_SUBSCRIPTION_SUCCESS = 'UPDATE_SUBSCRIPTION_SUCCESS'
export const UPDATE_SUBSCRIPTION_FAILURE = 'UPDATE_SUBSCRIPTION_FAILURE'
export const CREATE_SUBSCRIPTION_SUCCESS = 'CREATE_SUBSCRIPTION_SUCCESS'
export const CREATE_SUBSCRIPTION_FAILURE = 'CREATE_SUBSCRIPTION_FAILURE'
export const SUBSCRIPTION_REQUEST = '/admin/api/subscriptions'

export const updateSubscription = subscription => {
  const path = `${SUBSCRIPTION_REQUEST}/${subscription.id}`
  const { is_active, card_id, sales_rep_id } = subscription
  const payload = {
    subscription: {
      card_id: card_id.value,
      is_active: is_active.value,
      sales_rep_id: sales_rep_id.value
    }
  }
  return dispatch => {
    return infosweepApi.patch(path, payload)
    .then( response => dispatch(updateSubscriptionSuccess(response.data)))
    .catch( error => dispatch(updateSubscriptionFailure(error)))
  }
}

export const createSubscription = (data, user_id) => {
  const payload = Object.assign({}, data, { user_id })
  return dispatch => {
    return infosweepApi.post(SUBSCRIPTION_REQUEST, payload)
    .then( response => dispatch(createSubscriptionSuccess(response.data)))
    .catch( error => dispatch(createSubscriptionFailure(error)))
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

export const createSubscriptionSuccess = data => (
  {
    type: CREATE_SUBSCRIPTION_SUCCESS,
    data
  }
)

export const createSubscriptionFailure = error => (
  {
    type: CREATE_SUBSCRIPTION_FAILURE,
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

export const addSubscription = (state, subscription) => {
  if(subscription) {
  return [ subscription, ...state ]
  }
  return state
}

export const sortSubscriptionById = subscriptions => (
  _.sortBy(subscriptions, s => { return s.id }).reverse()
)

const reducer = (state=[], action) => {
  switch(action.type) {
    case USER_SUCCESS:
      return sortSubscriptionById(action.data.subscriptions)
    case UPDATE_SUBSCRIPTION_SUCCESS:
      return insertSubscription(state, action.data)
    case CREATE_SUBSCRIPTION_SUCCESS:
      return addSubscription(state, action.data.subscription)
    case CREATE_SUBSCRIPTION_FAILURE:
      return addSubscription(state, action.error.response.data.subscription)
    default:
      return state
  }
  return state
}

export default reducer;
