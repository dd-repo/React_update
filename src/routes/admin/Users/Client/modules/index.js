import { combineReducers } from 'redux';
import details from './details';
import transactions from './transactions';
import subscriptions from './subscriptions';
import accounts from './accounts';
import account from './account';
import cards from './cards';
import notifications from './notifications';
import profile from './profile';
import keywords from './keywords';
import phones from './phones';
import addresses from './addresses';
import clientMerchantProfiles from './clientMerchantProfiles';

export default combineReducers({
  details,
  transactions,
  subscriptions,
  accounts,
  account,
  cards,
  notifications,
  profile,
  keywords,
  phones,
  addresses,
  clientMerchantProfiles
})
