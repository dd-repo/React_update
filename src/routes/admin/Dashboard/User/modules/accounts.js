import BlitzApi from 'services/BlitzApi';

import { USER_SUCCESS } from './user';

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
