import infosweepApi from 'services/infosweepApi';
import _ from 'underscore';

const PREVIOUS_STATUS = {
  'inProgress': 'inQueue',
  'inQueue': 'potentialRisks',
  'potentialRisks': 'inProgress'
}

const CURRENT_STATUS = {
  'requested': 'inProgress',
  'queued': 'inQueue',
  'pending': 'potentialRisks'
}

//action types
export const MONITORING_PENDING = 'MONITORING_PENDING';
export const MONITORING_SUCCESS = 'MONITORING_SUCCESS';
export const MONITORING_FAILURE = 'MONITORING_FAILURE';
export const MONITORING_COMPLETED_SUCCESS = 'MONITORING_COMPLETED_SUCCESS';
export const MONITORING_UPDATE_SUCCESS = 'MONITORING_UPDATE_SUCCESS';
export const MONITORING_UPDATE_FAILURE = 'MONITORING_UPDATE_FAILURE';

//actions
export const fetchMonitoringRequests = account_id => {
  const path = `dashboard/api/v1/accounts/${account_id}/monitoring`

  return dispatch => {
    dispatch(gettingMonitoring())
    return infosweepApi.get(path)
    .then(
      response => dispatch(monitoringSuccess(response.data))
    ).catch(
    error => dispatch(monitoringFailure(error))
    )
  }
}

export const fetchMonitoringRequestsCompleted = params => {
  const path = '/dashboard/api/v1/monitoring-request-receipts/search'

  return dispatch => {
    return infosweepApi.get(path, params)
    .then( response => dispatch(receiveMonitoringCompleted(response.data)))
    .catch( error => dispatch(monitoringFailure(error)))
  }
}

export const requestRemoval = request_id => {
  const path = `/dashboard/api/v1/monitoring/${request_id}`
  const payload = { request_status: 'requested' }

  return dispatch => {
    return infosweepApi.patch(path, payload)
    .then(
      response => dispatch(removalRequestSuccess(response.data))
    ).catch(
    error => dispatch(removalRequestFailure(error))
    )
  }
}

export const removalRequestSuccess = removal => (
  {
    type: MONITORING_UPDATE_SUCCESS,
    removal
  }
)

export const removalRequestFailure = error => (
  {
    type: MONITORING_UPDATE_FAILURE,
    error
  }
)

export const gettingMonitoring = () => (
  {
    type: MONITORING_PENDING
  }
);

export const monitoringSuccess = data => (
  {
    type: MONITORING_SUCCESS,
    data
  }
)

export const receiveMonitoringCompleted = data => (
  {
    type: MONITORING_COMPLETED_SUCCESS,
    data
  }
)

export const monitoringFailure = error => (
  {
    type: MONITORING_FAILURE,
    error
  }
)

// reducers
export const removeFromStatusList = (state, monitoringSite) => {
  return state.filter(site => site.id !== monitoringSite.id)
}

export const addToStatusList = (state, removal) => {
  return [ removal, ...state ]
}

export const filterByStatus = (sites, selector) => {
  if(Array.isArray(selector)) {
    let filtered = []

    for(let i=0; i<selector.length; i++) {
      filtered.push(sites.filter(site => site.status === selector[i]))
    }
    return _.flatten(filtered)
  }
  return sites.filter(site => site.status === selector)
}

const filterWhitePages = monitoringSites => ( monitoringSites.filter(
  monitoringSite => monitoringSite.site !== 'whitepages.com'
))

const initialState = {
  inProgress: [],
  inQueue: [],
  potentialRisks: [],
  isFetching: true
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case MONITORING_SUCCESS:
      return Object.assign({}, state, {
        inProgress: filterByStatus(action.data.monitoring_requests, ['requested','inprogress']),
        inQueue: filterByStatus(action.data.monitoring_requests, 'queued'),
        potentialRisks: filterWhitePages(filterByStatus(action.data.monitoring_requests, 'pending')),
        totalCount: action.data.meta.total_count,
        isFetching: false
      });
    case MONITORING_COMPLETED_SUCCESS:
      return Object.assign({}, state, {
        completed: action.data.monitoring_request_receipts
      })
    case MONITORING_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error
      });
    case MONITORING_UPDATE_SUCCESS:
      const currentStatus = CURRENT_STATUS[action.removal.status]
      const previousStatus = state.inProgress.length === 3 ? PREVIOUS_STATUS[currentStatus] : 'potentialRisks'

      return Object.assign({}, state, {
        [currentStatus]: addToStatusList(state[currentStatus], action.removal),
        [previousStatus]: removeFromStatusList(state[previousStatus], action.removal)
      });
    default:
      return state
  }
  return state
}
export default reducer;
