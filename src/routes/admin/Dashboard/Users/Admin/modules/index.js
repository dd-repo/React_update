import { combineReducers } from 'redux';
import details from './admin';
import notification from './notification';

export default combineReducers({
  details,
  notification
})

