import {
  REQUESTED_REMOVAL_STATUS_SUCCESS
} from './privacyRemovalStatus';

const hasData = data => {
  const inProgress = data['inprogress'] || 0
  const requested = data['requested'] || 0
  return (inProgress + requested > 0) && data['completed'] > 0
}
const reducer = (state={}, action) => {
  switch(action.type) {
    case REQUESTED_REMOVAL_STATUS_SUCCESS:
      return hasData(action.data)
    default:
      return state
  }
  return state
}

export default reducer;
