import infosweepApi from 'services/infosweepApi';

// action types
import {
  USER_LOGOUT
} from 'routes/auth/modules/auth';

export const SUBSCRIPTION_PENDING = 'SUBSCRIPTION_PENDING';
export const SUBSCRIPTION_SUCCESS = 'SUBSCRIPTION_SUCCESS';
export const SUBSCRIPTION_FAILURE = 'SUBSCRIPTION_FAILURE';
export const SUBSCRIPTION_CANCEL_PENDING = 'SUBSCRIPTION_CANCEL_PENDING';
export const SUBSCRIPTION_CANCEL_SUCCESS = 'SUBSCRIPTION_CANCEL_SUCCESS';
export const SUBSCRIPTION_CANCEL_FAILURE = 'SUBSCRIPTION_CANCEL_FAILURE';

export const SUBSCRIPTION_REQUEST = '/dashboard/api/v1/subscriptions';

// Async actions
export const getSubscription = () => {
  return dispatch => {
    return infosweepApi.get(`${SUBSCRIPTION_REQUEST}/get`)
    .then(
      response => dispatch(subscriptionSuccess(response.data)))
      .catch(
        error => dispatch(subscriptionFailure(error)))
  }
}

export const cancelSubscription = id => {
  return dispatch => {
    return infosweepApi.patch(`${SUBSCRIPTION_REQUEST}/${id}/cancel`)
    .then(
      response => dispatch(subscriptionCancelSuccess(response.data)))
      .catch(
        error => dispatch(subscriptionCancelFailure(error)))
  }
}

export const subscriptionSuccess = subscription => (
  {
    type: SUBSCRIPTION_SUCCESS,
    subscription
  }
)

export const subscriptionFailure = error => (
  {
    type: SUBSCRIPTION_FAILURE,
    error
  }
)

export const subscriptionCancelSuccess = subscription => (
  {
    type: SUBSCRIPTION_CANCEL_SUCCESS,
    subscription
  }
)

export const subscriptionCancelFailure = error => (
  {
    type: SUBSCRIPTION_CANCEL_FAILURE,
    error
  }
)

// reducer
const addSubscription = (state, subscription) => (
  Object.assign({}, state, {
    id: subscription.id,
    card: subscription.card,
    cancelDate: subscription.cancel_date,
    plan: subscription.plan,
    planDescription: subscription.plan_description,
    planPrice: subscription.plan_price,
    isActive: subscription.is_active,
    nextPayment: subscription.next_payment,
    startDate: subscription.start_date,
    isFetching: false
  })
)

const reducer = (state = {}, action) => {
  switch(action.type) {
    case SUBSCRIPTION_PENDING:
      return Object.assign({}, state, {
        isFetching: true
      })

    case SUBSCRIPTION_SUCCESS:
      return addSubscription(state, action.subscription)

    case SUBSCRIPTION_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      })

    case SUBSCRIPTION_CANCEL_SUCCESS:
      return addSubscription(state, action.subscription)

    case USER_LOGOUT:
      return {}
    default:
      return state
  }
  return state
}

export default reducer;
