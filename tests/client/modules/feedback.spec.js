import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import clickadillyApi from 'services/clickadillyApi';

import {
  FEEDBACK_POSTING,
  FEEDBACK_SUCCESS,
  FEEDBACK_FAILURE,
  FEEDBACK_PATH,
  sendingFeedback,
  sentFeedbackSuccess,
  sentFeedbackFailure,
  sendFeedback,
  default as reducer
} from 'routes/client/Dashboard/Feedback/modules/feedback';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const errorRes = {
  response: {
    data: {
      errorMessage: 'error message'
    }
  }
}

describe('(Feedback module) Feedback', () => {
  it('Should export a constant', () => {
    expect(FEEDBACK_POSTING).to.equal('FEEDBACK_POSTING')
    expect(FEEDBACK_SUCCESS).to.equal('FEEDBACK_SUCCESS')
    expect(FEEDBACK_FAILURE).to.equal('FEEDBACK_FAILURE')
    expect(FEEDBACK_PATH).to.equal('/dashboard/api/v1/feedbacks')
  })

  describe('(Action Creator) sendingFeedback', () => {
    it('should return an action with type FEEDBACK_POSTING', () => {
      expect(sendingFeedback()).to.have.property('type', FEEDBACK_POSTING)
    })
  })

  describe('(Action Creator) sentFeedbackSuccess', () => {
    it('should return an action with type FEEDBACK_SUCCESS', () => {
      expect(sentFeedbackSuccess()).to.have.property('type', FEEDBACK_SUCCESS)
    })
  })

  describe('(Action Creator) sentFeedbackFailure', () => {
    it('should return an action with type FEEDBACK_FAILURE', () => {
      expect(sentFeedbackFailure()).to.have.property('type', FEEDBACK_FAILURE)
    })
    it('should returen an action with error', () => {
      expect(sentFeedbackFailure(errorRes)).to.have.property('error', errorRes)
    })
  })

  describe('(Async Action Creator) sendFeedback', () => {
    let feedbackApi;

    beforeEach(() => {
      feedbackApi = sinon.stub(clickadillyApi, 'post')
    })

    afterEach(() => {
      feedbackApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(sendFeedback).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(sendFeedback()).to.be.a('function')
    })

    it('created FEEDBACK_SUCCESS', done => {
      const resolved = new Promise((r) => r({status: '201'}))
      feedbackApi.returns(resolved)

      const expectedActions = [
        { type: FEEDBACK_POSTING },
        { type: FEEDBACK_SUCCESS }
      ]

      const store = mockStore({})

      return store.dispatch(sendFeedback())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })

    it('creates FEEDBACK_FAILURE', done => {
      const rejected = new Promise((_,r) => r(errorRes))
      feedbackApi.returns(rejected)

      const expectedActions = [
        { type: FEEDBACK_POSTING },
        { type: FEEDBACK_FAILURE, error: errorRes }
      ]

      const store = mockStore({})

      return store.dispatch(sendFeedback())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })
  })
})
