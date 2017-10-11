import {
  KEYWORD_UPDATE_SUCCESS,
  KEYWORD_UPDATE_FAILURE
} from './keywords';

import {
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAILURE
} from 'routes/auth/modules/auth';

import {
  SUBSCRIPTION_CANCEL_SUCCESS,
  SUBSCRIPTION_CANCEL_FAILURE
} from 'routes/client/Account/modules/subscription';

export const CLEAR_FLASH_MESSAGE = 'CLEAR_FLASH_MESSAGE'

export const clearFlashMessage = () => (
  {
    type: CLEAR_FLASH_MESSAGE
  }
)

const initialValues = {
  message: null,
  status: null
}

const setErrorMessage = (state, error) => {
  console.log('error message', error)
  const message = error.response ? error.response.data.errorMessage : error
  return  Object.assign({}, state, {
    message,
    status: 'danger'
  })
}

const setSuccessMessage = (state, item, verb) => {
  return Object.assign({}, state, {
    message: `${item} Successfully ${verb}`,
    status: 'success'
  })
}

const reducer = (state=initialValues, action) => {
  switch(action.type) {
    case KEYWORD_UPDATE_SUCCESS:
      return setSuccessMessage(state, 'Keyword', 'Updated')

    case KEYWORD_UPDATE_FAILURE:
      return setErrorMessage(state, action.error)

    case PASSWORD_UPDATE_SUCCESS:
      return setSuccessMessage(state, 'Password', 'Updated')

    case PASSWORD_UPDATE_FAILURE:
      return setErrorMessage(state, action.error)

    //case SUBSCRIPTION_CANCEL_SUCCESS:
      //return setSuccessMessage(state, 'Subscription', 'Canceled')

    case SUBSCRIPTION_CANCEL_FAILURE:
      return setErrorMessage(state, action.error)

    case CLEAR_FLASH_MESSAGE:
      return initialValues
    default:
      return state
  }
  return state
}

export default reducer;
