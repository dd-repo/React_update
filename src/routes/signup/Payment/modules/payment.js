import infosweepApi from 'services/infosweepApi';

import {
  USER_LOGOUT
} from 'routes/auth/modules/auth';

export const PAYMENT_POSTING = 'PAYMENT_POSTING';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
export const PAYMENT_FAILURE = 'PAYMENT_FAILURE';
export const PAYMENT_ERROR_DELETE = 'PAYMENT_ERROR_DELETE';

export const PAYMENT_REQUEST = `/dashboard/api/v1/users/sign-up/payment`;

// actions
export const postPayment = payload => {
  return dispatch => {
    dispatch(postingPayment(payload))
    return infosweepApi.post(PAYMENT_REQUEST, { signup: payload })
    .then(
      response => dispatch(paymentSuccess(response.data))
    ).catch(
    error => dispatch(paymentFailure(error))
    )
  }
}

export const postingPayment = o => (
  {
    type: PAYMENT_POSTING,
  }
);

export const paymentSuccess = user => (
  {
    type: PAYMENT_SUCCESS,
    user
  }
)

export const paymentFailure = error => (
  {
    type: PAYMENT_FAILURE,
    error
  }
);

export const deletePaymentErrorMessage = () => (
  {
    type: PAYMENT_ERROR_DELETE
  }
)

// reducers
const reducer = (state={}, action) => {
  switch(action.type) {
    case PAYMENT_POSTING:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case PAYMENT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        success: true,
      })
    case PAYMENT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error.response.data.message,
        success: false
      })
    case PAYMENT_ERROR_DELETE:
      return Object.assign({}, state, {
        errorMessage: null
      })
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
  return state
}

export default reducer;
