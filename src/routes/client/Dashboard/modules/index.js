import { combineReducers } from 'redux';
import privacyRemovalStats from './PrivacyRemovalStats';
import privacyRemovalStatus from './privacyRemovalStatus';
import notifications from './notifications';
import hasData from './hasData';

export default combineReducers({
  privacyRemovalStats,
  privacyRemovalStatus,
  notifications,
  hasData
})
