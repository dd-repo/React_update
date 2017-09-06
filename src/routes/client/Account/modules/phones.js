import clickadillyApi from 'services/clickadillyApi';

// action types
export const PHONES_FETCHING = 'PHONES_FETCHING';
export const PHONES_SUCCESS = 'PHONES_SUCCESS';
export const PHONES_FAILURE = 'PHONES_FAILURE';

export const PHONES_REQUEST = '/dashboard/api/v1/accounts';

// actions
export const fetchPhones = accountId => {
  const path = `${PHONES_REQUEST}/${accountId}/phones`
  return dispatch => {
    return clickadillyApi.get(path)
    .then( response => dispatch(receivePhonesSuccess(response.data)))
    .catch( error => dispatch(receivePhonesFailure(error)))
  }
}

export const receivePhonesSuccess = data => (
  {
    type: PHONES_SUCCESS,
    data
  }
)

export const receivePhonesFailure = error => (
  {
    type: PHONES_FAILURE,
    error
  }
)

const initialState = {
  all: []
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case PHONES_SUCCESS:
      return Object.assign({}, state, {
        all: action.data
      })
    case PHONES_FAILURE:
      return Object.assign({}, state, {
        errorMessage: error.response.data.errorMessage
      })
    default:
      return state
  }
  return state
}

export default reducer;



