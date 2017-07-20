import BlitzApi from 'services/BlitzApi';

import {
  UPDATE_SUBSCRIPTION_SUCCESS,
  UPDATE_SUBSCRIPTION_FAILURE,
  insertSubscription
} from 'routes/admin/Dashboard/User/modules/subscriptions';

// action types
export const SUBSCRIPTIONS_PENDING = 'SUBSCRIPTIONS_PENDING';
export const SUBSCRIPTIONS_SUCCESS = 'SUBSCRIPTIONS_SUCCESS';
export const SUBSCRIPTIONS_FAILURE = 'SUBSCRIPTIONS_FAILURE';

export const SUBSCRIPTIONS_REQUEST = '/admin/api/subscriptions';

// actions
export const getSubscriptions = (params, pageNum) => {
  const path = `${SUBSCRIPTIONS_REQUEST}/search/${pageNum}`
  return dispatch => {
    dispatch(gettingSubscriptions())
    return BlitzApi.get(path, params)
    .then(
      response => dispatch(receiveSubscriptions(response.data)))
      .catch(
        error => dispatch(receiveSubscriptionsFailure(error)))
  }
}

export const gettingSubscriptions = () => (
  {
    type: SUBSCRIPTIONS_PENDING
  }
)

export const receiveSubscriptions = data => (
  {
    type: SUBSCRIPTIONS_SUCCESS,
    data
  }
)

export const receiveSubscriptionsFailure = error => (
  {
    type: SUBSCRIPTIONS_FAILURE,
    error
  }
)

// reducer

const reducer = (state={}, action) => {
  switch(action.type) {
    case SUBSCRIPTIONS_PENDING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case SUBSCRIPTIONS_SUCCESS:
      return Object.assign({}, state, {
        all: action.data.subscriptions,
        pagination: action.data.meta.pagination,
        isFetching: false,
      });
    case SUBSCRIPTIONS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case UPDATE_SUBSCRIPTION_SUCCESS:
      return Object.assign({}, state, {
        all: insertSubscription(state.all, action.data)
      });
    default:
      return state
  }
  return state
}

export default reducer;
