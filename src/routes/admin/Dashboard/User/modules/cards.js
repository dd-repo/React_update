import clickadillyApi from 'services/clickadillyApi';
import { USER_SUCCESS } from './user';

export const CARDS_SUCCESS = 'CARDS_SUCCESS';
export const CARDS_FAILURE = 'CARDS_FAILURE';
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
export const ADD_CARD_FAILURE = 'ADD_CARD_FAILURE';
export const CARDS_REQUEST = '/admin/api/cards/search';
export const CREATE_CARD_REQUEST = '/admin/api/cards';

export const fetchCards = id => {
  const params = { q: { user_id_eq: id }}
  return dispatch => {
    return clickadillyApi.get(CARDS_REQUEST, params)
    .then( response => dispatch(receiveCardsSuccess(response.data)))
    .catch( error => dispatch(receiveCardsFailure(error)))
  }
}

export const addCard = (card, user_id) => {
  const payload = Object.assign({}, card, { user_id })
  return dispatch => {
    return clickadillyApi.post(CREATE_CARD_REQUEST, payload)
    .then( response => dispatch(receiveNewCardSuccess(response.data)))
    .catch( error => dispatch(receiveNewCardFailure(error)))
  }
}

export const receiveCardsSuccess = data => (
  {
    type: CARDS_SUCCESS,
    data
  }
)

export const receiveCardsFailure = error => (
  {
    type: CARDS_FAILURE,
    error
  }
)

export const receiveNewCardSuccess = data => (
  {
    type: ADD_CARD_SUCCESS,
    data
  }
)

export const receiveNewCardFailure = error => (
  {
    type: ADD_CARD_FAILURE,
    error
  }
)

const reducer = (state=[], action) => {
  switch(action.type) {
    case CARDS_SUCCESS:
      return action.data.cards
    case ADD_CARD_SUCCESS:
      return [
        action.data,
        ...state
      ]
    default:
      return state;
  }
  return state;
}

export default reducer
