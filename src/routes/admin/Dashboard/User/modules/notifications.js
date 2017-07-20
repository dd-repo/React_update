import {
  USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from './user';

import {
  ACCOUNT_FAILURE,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILURE
} from './account';

import {
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAILURE
} from './addresses';

import {
  CARDS_FAILURE,
  ADD_CARD_FAILURE,
  ADD_CARD_SUCCESS
} from './cards';

import {
  UPDATE_KEYWORD_SUCCESS,
  UPDATE_KEYWORD_FAILURE,
  ADD_KEYWORD_SUCCESS,
  ADD_KEYWORD_FAILURE
} from './keywords';

import {
  UPDATE_PHONE_SUCCESS,
  UPDATE_PHONE_FAILURE
} from './phones';

import {
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE
} from './profile';

import {
  UPDATE_SUBSCRIPTION_SUCCESS,
  UPDATE_SUBSCRIPTION_FAILURE
} from './subscriptions';

import {
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAILURE
} from './transactions';

import {
  FORGOT_USER_PASSWORD_SUCCESS,
  FORGOT_USER_PASSWORD_FAILURE
} from 'routes/auth/modules/auth'

export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'

export const clearNotification = () => (
  {
    type: CLEAR_NOTIFICATION
  }
)

const initialValues = {
  message: null,
  status: null
}

const setErrorMessage = (state, error) => {
  console.log('error message', error)
  return  Object.assign({}, state, {
    message: error.response.data.errorMessage,
    status: 'danger'
  })
}

const setSuccessMessage = (state, item, verb) => (
  Object.assign({}, state, {
    message: `${item} Successfully ${verb}`,
    status: 'success'
  })
)

const reducer = (state=initialValues, action) => {
  switch(action.type) {
    case FORGOT_USER_PASSWORD_SUCCESS:
      return setSuccessMessage(state, 'Email', 'Sent')
    case UPDATE_TRANSACTION_SUCCESS:
      return setSuccessMessage(state, 'Transaction', 'Updated')

    case UPDATE_SUBSCRIPTION_SUCCESS:
      return setSuccessMessage(state, 'Subscription', 'Updated')

    case UPDATE_PROFILE_SUCCESS:
      return setSuccessMessage(state, 'Profile', 'Updated')

    case UPDATE_PHONE_SUCCESS:
      return setSuccessMessage(state, 'Phone', 'Updated')

    case UPDATE_KEYWORD_SUCCESS:
      return setSuccessMessage(state, 'Keyword', 'Updated')

    case UPDATE_ACCOUNT_SUCCESS:
      return setSuccessMessage(state, 'Account Details', 'Updated')

    case UPDATE_ADDRESS_SUCCESS:
      return setSuccessMessage(state, 'Address', 'Updated')

    case UPDATE_USER_SUCCESS:
      return setSuccessMessage(state, 'Subscriber', 'Updated')

    case ADD_KEYWORD_SUCCESS:
      return setSuccessMessage(state, 'Keyword', 'Added')

    case ADD_CARD_SUCCESS:
      return setSuccessMessage(state, 'Card', 'Added')

    case ADD_CARD_FAILURE:
      return Object.assign({}, state, {
        message: action.error.response.data.message,
        status: 'danger'
      })

     case FORGOT_USER_PASSWORD_FAILURE:
      return setErrorMessage(state, action.error)

    case UPDATE_TRANSACTION_FAILURE:
      return setErrorMessage(state, action.error)

    case UPDATE_SUBSCRIPTION_FAILURE:
      return setErrorMessage(state, action.error)

    case UPDATE_PROFILE_FAILURE:
      return setErrorMessage(state, action.error)

    case UPDATE_PHONE_FAILURE:
      return setErrorMessage(state, action.error)

    case ADD_KEYWORD_FAILURE:
      return setErrorMessage(state, action.error)

    case UPDATE_KEYWORD_FAILURE:
      return setErrorMessage(state, action.error)

    case UPDATE_ADDRESS_FAILURE:
      return setErrorMessage(state, action.error)

    case UPDATE_ACCOUNT_FAILURE:
      return setErrorMessage(state, action.error)

    case UPDATE_USER_FAILURE:
      return setErrorMessage(state, action.error)

    case CARDS_FAILURE:
      return setErrorMessage(state, action.error)

    case USER_FAILURE:
      return setErrorMessage(state, action.error)

    case ACCOUNT_FAILURE:
      return setErrorMessage(state, action.error)

    case CLEAR_NOTIFICATION:
      return initialValues

    default:
      return state
  }
  return state
}

export default reducer;
