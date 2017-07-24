import { USER_SUCCESS } from './user';

const reducer = (state=[], action) => {
  switch(action.type) {
    case USER_SUCCESS:
      return action.data.client_merchant_profiles
    default:
      return state
  }
  return state
}

export default reducer;
