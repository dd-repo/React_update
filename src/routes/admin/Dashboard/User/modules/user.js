import BlitzApi from 'services/BlitzApi';

// action types
export const USER_PENDING = 'USER_PENDING';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

export const USER_REQUEST = '/admin/api/user';
export const ACCOUNT_REQUEST = '/admin/api/accounts';
export const CARDS_REQUEST = '/admin/api/cards/search'

// action
export const fetchUser = params => {
  return dispatch => {
    dispatch(gettingUser())
    return BlitzApi.get(USER_REQUEST, params)
    .then( response => dispatch(receiveUserSuccess(response.data)))
    .catch( error => dispatch(receiveUserFailure(error)))
  }
}

export const gettingUser = () => (
  {
    type: USER_PENDING
  }
)

export const receiveUserSuccess = data => (
  {
    type: USER_SUCCESS,
    data
  }
)

export const receiveUserFailure = error => (
  {
    type: USER_FAILURE,
    error
  }
)

const setUser = (state, user) => {
  return (
    Object.assign({}, state, {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      is_active: user.is_active,
      created_at: user.created_at
    })
  )
}

//reducer
const reducer = (state={}, action) => {
  switch(action.type) {
    case USER_PENDING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        details: setUser(state, action.data),
        transactions: action.data.transactions,
        subscriptions: action.data.subscriptions
      });
    case USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error.response.data.errorMessage
      });
    default:
      return state;
  }
  return state;
}

export default reducer
