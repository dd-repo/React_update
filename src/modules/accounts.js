import { USER_SUCCESS } from './auth';
// reducer

const reducer = (state = [], action) => {
  switch(action.type) {
    case USER_SUCCESS:
      return Object.assign({}, state, {
        accounts: action.userData.accounts
      });
    default:
      return state
  }
  return state
}

export default reducer;
