import { createNotification } from 'utils';
import {
  RECEIVE_ADMIN_SUCCESS,
  RECEIVE_ADMIN_FAILURE,
  RECEIVE_ADMIN_UPDATE_SUCCESS,
  RECEIVE_ADMIN_UPDATE_FAILURE
} from './admin'

const SUCCESS_RESPONSE = 'Admin was successfully updated'

export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';

export const clearNotification = () => (
  {
    type: CLEAR_NOTIFICATION
  }
)

const reducer = (state={}, action) => {
  switch(action.type) {
    case RECEIVE_ADMIN_UPDATE_SUCCESS:
      return createNotification(SUCCESS_RESPONSE, 'success')
    case RECEIVE_ADMIN_FAILURE:
      return createNotification(action.error, 'danger')
    case RECEIVE_ADMIN_UPDATE_FAILURE:
      return createNotification(action.error, 'danger')
    case CLEAR_NOTIFICATION:
      return {}
    default:
      return state
  }
  return state;
}

export default reducer;
