import { combineReducers } from 'redux';
import privacyRemovalStats from './privacyRemovalStats';
import privacyRemovalStatus from './privacyRemovalStatus';
import notifications from './notifications';
import hasData from './hasData';

export default combineReducers({
  privacyRemovalStats,
  privacyRemovalStatus,
  notifications,
  hasData
})
