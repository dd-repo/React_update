import configureMockStore from 'redux-mock-store';
import infosweepApi from 'services/infosweepApi';
import thunk from 'redux-thunk';

import {
  CARDS_SUCCESS,
  CARDS_FAILURE,
  CARDS_REQUEST,
  CREATE_CARD_REQUEST,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILURE,
  fetchCards,
  addCard,
  receiveCardsSuccess,
  receiveCardsFailure,
  receiveNewCardSuccess,
  receiveNewCardFailure,
  default as reducer
} from 'routes/admin/Users/Client/modules/cards';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const cardsResponse = {
  cards: [ {id: 1} ]
}

const card = {
  id: 9,
  third_party_id: "1807055035",
  source: "authnet",
  last_4: "1231",
  card_month: "12",
  card_year: "3123",
  card_holder_name: "first last",
}

const errorRes = {
  status: 400,
  response: {data: {errorMessage: 'error message'}}
}

describe('(Cards module)', () => {

  it('should export constants', () => {
    expect(CARDS_SUCCESS).to.equal('CARDS_SUCCESS')
    expect(CARDS_FAILURE).to.equal('CARDS_FAILURE')
    expect(ADD_CARD_FAILURE).to.equal('ADD_CARD_FAILURE')
    expect(ADD_CARD_SUCCESS).to.equal('ADD_CARD_SUCCESS')
    expect(CARDS_REQUEST).to.equal('/admin/api/cards/search')
    expect(CREATE_CARD_REQUEST).to.equal('/admin/api/cards')
  })

  describe('(Action Creator) "receiveCardsSuccess"', () => {
    it('should return a type with "CARDS_SUCCESS"', () => {
      expect(receiveCardsSuccess()).to.have.property('type', CARDS_SUCCESS)
    })

    it('should return property with data', () => {
      expect(receiveCardsSuccess(cardsResponse)).to.have.property('data', cardsResponse)
    })
  })

  describe('(Action Creator) "receiveCardsFailure"', () => {
    it('should return a type with "CARD_FAILURE"', () => {
      expect(receiveCardsFailure()).to.have.property('type', CARDS_FAILURE)
    })

    it('should return propery error', () => {
      expect(receiveCardsFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Action Creator) "receiveNewCardSuccess"', () => {
    it('should return a type with "ADD_CARD_SUCCESS"', () => {
      expect(receiveNewCardSuccess()).to.have.property('type', ADD_CARD_SUCCESS)
    })

    it('should return property with data', () => {
      expect(receiveNewCardSuccess(card)).to.have.property('data', card)
    })
  })

  describe('(Action Creator) "receiveNewCardsFailure"', () => {
    it('should return a type with "CARD_FAILURE"', () => {
      expect(receiveNewCardFailure()).to.have.property('type', ADD_CARD_FAILURE)
    })

    it('should return propery error', () => {
      expect(receiveNewCardFailure(errorRes)).to.have.property('error', errorRes)
    })
  })


  describe('(Async Action Creator) "fetchCards"', () => {
    let cardsApi;

    beforeEach(() => {
      cardsApi = sinon.stub(infosweepApi, 'get')
    })

    afterEach(() => {
      cardsApi.restore()
    })

    it('should be exported as a function', () => {
      expect(fetchCards).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(fetchCards()).to.be.a('function')
    })

    it('creates CARDS_SUCCESS', (done) => {
      const resolved = new Promise((r) => r({data: cardsResponse}));
      cardsApi.returns(resolved)

      const expectedActions = [
        { type: CARDS_SUCCESS, data: cardsResponse }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(fetchCards())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('created CARDS_FAILURE', done => {
      const rejected = new Promise((_, r) => r(errorRes));
      cardsApi.returns(rejected)

      const expectedActions = [
        { type: CARDS_FAILURE, error: errorRes }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(fetchCards())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('(Async Action Creator) "addCard"', () => {
    let cardsApi;

    beforeEach(() => {
      cardsApi = sinon.stub(infosweepApi, 'post')
    })

    afterEach(() => {
      cardsApi.restore()
    })

    it('should be exported as a function', () => {
      expect(addCard).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(addCard()).to.be.a('function')
    })

    it('creates ADD_CARD_SUCCESS', (done) => {
      const resolved = new Promise((r) => r({data: card}));
      cardsApi.returns(resolved)

      const expectedActions = [
        { type: ADD_CARD_SUCCESS, data: card }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(addCard())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })

    it('created ADD_CARD_FAILURE', done => {
      const rejected = new Promise((_, r) => r(errorRes));
      cardsApi.returns(rejected)

      const expectedActions = [
        { type: ADD_CARD_FAILURE, error: errorRes }
      ]

      const store = mockStore({ user: {} })

      return store.dispatch(addCard())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
        done();
      })
    })
  })

  describe('(Reducer)', () => {

    it('Should be a function', () => {
      expect(reducer).to.be.a('function')
    })

    it('should initialize with an object', () => {
      expect(reducer(undefined, [])).to.be.an('array')
    })

    it('should handle CARDS_SUCCESS', () => {
      const userState = reducer({}, { type: CARDS_SUCCESS, data: cardsResponse})
      const cards = cardsResponse.cards

      expect(userState).to.eql(cards)
    })

    it('should handle ADD_CARD_SUCCESS', () => {
      const newCard = {
        id: 11,
        last_4: "4444",
        card_month: "10",
        card_year: "2020",
        card_holder_name: "card name new",
      }

      const cardsState = [
        {
          id: 10,
          last_4: "5555",
          card_month: "12",
          card_year: "2020",
          card_holder_name: "first last",
        }
      ]

      const expectedNewState = [
        {
          id: 11,
          last_4: "4444",
          card_month: "10",
          card_year: "2020",
          card_holder_name: "card name new",
        },
        {
          id: 10,
          last_4: "5555",
          card_month: "12",
          card_year: "2020",
          card_holder_name: "first last",
        },
      ]

      const userState = reducer(cardsState, { type: ADD_CARD_SUCCESS, data: newCard})

      expect(userState).to.eql(expectedNewState)
    })
  })
})

