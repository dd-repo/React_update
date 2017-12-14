import infosweepApi from 'services/infosweepApi';

import { USER_SUCCESS } from './details';

const reducer = (state=[], action) => {
  switch(action.type) {
    case USER_SUCCESS:
      return action.data.accounts
    default:
      return state
  }
  return state
}

export default reducer;

