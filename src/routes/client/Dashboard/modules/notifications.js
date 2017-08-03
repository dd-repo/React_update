import {
  PRIVACY_REMOVAL_STATISTICS_FAILURE
} from './privacyRemovalStats'

const reducer = (state={}, action) => {
  switch(action.type) {
    case PRIVACY_REMOVAL_STATISTICS_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.error.response.data.errorMessage
      })
    default:
      return state
  }
  return state
}

export default reducer;
