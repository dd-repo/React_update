import { combineReducers } from 'redux';
import privacyRemovalStats from './PrivacyRemovalStats';
import privacyRemovalStatus from './privacyRemovalStatus';
import notifications from './notifications';
import keywords from './keywords';

export default combineReducers({
  privacyRemovalStats,
  privacyRemovalStatus,
  keywords,
  notifications
})
