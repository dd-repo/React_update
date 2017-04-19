import BlitzApi from 'services/BlitzApi';

export const PAYMENT_POSTING = 'PAYMENT_POSTING';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
export const PAYMENT_FAILURE = 'PAYMENT_FAILURE';

export const PAYMENT_REQUEST = `/dashboard/api/v1/users/sign-up/payment`;

// actions
export const postPayment = payload => {
  return dispatch => {
    dispatch(postingPayment(payload))
    return BlitzApi.post(PAYMENT_REQUEST, { signup: payload })
    .then(
      response => dispatch(paymentSuccess(response.data))
    ).catch(
    error => paymentFailure(error)
    )
  }
}


const postingPayment = paymentInfo => (
  {
    type: PAYMENT_POSTING,
    paymentInfo
  }
);

const paymentSuccess = user => (
  {
    type: PAYMENT_SUCCESS,
    user
  }
)

const paymentFailure = error => (
  {
    type: PAYMENT_FAILURE,
    error
  }
);

// reducers
const reducer = (state={}, action) => {
  switch(action.type) {
    case PAYMENT_POSTING:
      return Object.assign({}, state, {
        isFetching: true,
        first_name: 'joe',
        last_name: 'bob',
        creditCardNumber: '4242424242424242',
        expirationDate: '02/2020',
        cvCode: '123'
      })
    case PAYMENT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        success: true,
      })
    case PAYMENT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        success: false
      })
    default:
      return state
  }
  return state
}

export default reducer;
