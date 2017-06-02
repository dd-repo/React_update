import BlitzApi from 'services/BlitzApi';

// action types
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
    return BlitzApi.get(`${SUBSCRIPTION_REQUEST}/get`})
    .then(
      response => dispatch(subscriptionSuccess(response.data)))
      .catch(
        error => dispatch(subscriptionFailure(error)))
}

export const subscriptionSuccess = subscription => (
  {
    type: SUBSCRIPTION_SUCCESS,
    subscripiton
  }
)


// reducer

const reducer = (state = {}, action) => {
  switch(action.type) {
    case SUBSCRIPTION_SUCCESS:
      return Object.assign({}, state, {
        subscriptionId: action.subscription.id
      })
    default:
      return state
  }
  return state
}

export default reducer;
