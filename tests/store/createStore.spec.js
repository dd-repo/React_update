import { store as createStore } from 'store/createStore'

describe('(Store) createStore', () => {
  let store

  before(() => {
    store = createStore()
  })

  it('should have an empty asyncReducers object', () => {
    expect(store.asyncReducers).to.be.an('object')
    expect(store.asyncReducers).to.be.empty
  })

  describe('(accounts)', () => {
    it('store should be initialized with an empty accounts array', () => {
      expect(store.getState().accounts).to.be.an('array')
      expect(store.accounts).to.be.empty
    })
  })

  describe('(currentUser)', () => {
    it('store should be initialized with an empty currentUser object', () => {
      expect(store.getState().currentUser).to.be.an('object')
      expect(store.currentUser).to.be.empty
    })
  })

  describe('(googleResults)', () => {
    it('store should be initialized with an empty googleResults object', () => {
      expect(store.getState().googleResults).to.be.an('object')
      expect(store.googleResults).to.be.empty
    })
  })

  describe('(keywords)', () => {
    it('store should be initialized with an empty keyword object', () => {
      expect(store.getState().keywords).to.be.an('object')
      expect(store.keywords).to.be.empty
    })
  })

  describe('(monitoring)', () => {
    it('store should be initialized with an empty monitoring object', () => {
      expect(store.getState().monitoring).to.be.an('object')
      expect(store.monitoring).to.be.empty
    })
  })

  describe('(profile)', () => {
    it('store should be initialized with an empty profile object', () => {
      expect(store.getState().account.profile).to.be.an('object')
      expect(store.profile).to.be.empty
    })
  })
})
