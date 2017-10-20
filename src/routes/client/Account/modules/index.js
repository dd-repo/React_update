import { combineReducers } from 'redux';
import transactions from './transactions';
import subscription from './subscription';
import addresses from  './addresses';
import phones from './phones';
import keywords from './keywords';
import profile from './profile';
import flashMessage from './flashMessage';
import notifications from './notifications';

export default combineReducers({
  transactions,
  subscription,
  addresses,
  phones,
  profile,
  keywords,
  flashMessage,
  notifications
})
