import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import BlitzApi from 'services/BlitzApi';

import {
MONITORING_PENDING,
MONITORING_SUCCESS,
MONITORING_FAILURE,
MONITORING_UPDATE_SUCCESS,
MONITORING_UPDATE_FAILURE,
getMonitoring,
monitoringRequestRemoval,
removalRequestSuccess,
removalRequestFailure,
gettingMonitoring,
monitoringSuccess,
monitoringFailure,
updateMonitoringSite,
default as reducer
} from 'routes/client/Dashboard/Monitoring/modules/monitoring.js';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const successfulResponse = {
  monitoring_requests: [
    {id: 1},
    {id: 2},
    {id: 3}
  ]
}
const removal = { id: 1 }
const errorMessage = { error: 'error message' }

describe('(monitoring module) monitoring requests', () => {

  it('Should export a constant.', () => {
    expect(MONITORING_PENDING).to.equal('MONITORING_PENDING')
    expect(MONITORING_SUCCESS).to.equal('MONITORING_SUCCESS')
    expect(MONITORING_FAILURE).to.equal('MONITORING_FAILURE')
    expect(MONITORING_UPDATE_SUCCESS).to.equal('MONITORING_UPDATE_SUCCESS')
    expect(MONITORING_UPDATE_FAILURE).to.equal('MONITORING_UPDATE_FAILURE')
  })

  describe('(Action Creator) "gettingMonitoring"', () => {
    it('Should return a action with type MONITORING_PENDING', () => {
      expect(gettingMonitoring()).to.have.property('type', MONITORING_PENDING)
    })
  })

  describe('(Action Creator) "monitoringSuccess"', () => {
    it('Should return an action with type MONITORING_SUCCESS', () => {
      expect(monitoringSuccess()).to.have.property('type', MONITORING_SUCCESS)
    })

    it('Should return an action with monitoring object', () => {
      expect(monitoringSuccess(successfulResponse)).to.have.property('response', successfulResponse)
    })
  })

  describe('(Action Creator) "monitoringFailure"', () => {
    it('Should return an action with type MONITORING_FAILURE', () => {
      expect(monitoringFailure()).to.have.property('type', MONITORING_FAILURE)
    })

    it('Should return an action with monitoring object', () => {
      expect(monitoringFailure(errorMessage)).to.have.property('error', errorMessage)
    })
  })

  describe('(Action Creator) "removalRequestSuccess"', () => {
    it('Should return an action with type MONITORING_UPDATE_SUCCESS', () => {
      expect(removalRequestSuccess()).to.have.property('type', MONITORING_UPDATE_SUCCESS )
    })

    it('Should return an action with monitoring object', () => {
      expect(removalRequestSuccess(removal)).to.have.property('removal', removal)
    })
  })

  describe('(Action Creator) "removalRequestFailure"', () => {
    it('Should return an action with type MONITORING_UPDATE_FAILURE', () => {
      expect(removalRequestFailure()).to.have.property('type', MONITORING_UPDATE_FAILURE )
    })

    it('Should return an action with monitoring object', () => {
      expect(removalRequestFailure(errorMessage)).to.have.property('error', errorMessage)
    })
  })

  describe('(Async Action Creator) "getMonitoring"', () => {
    let monitoringApi;

    beforeEach(() => {
      monitoringApi = sinon.stub(BlitzApi, 'get')
    })

    afterEach(() => {
      monitoringApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(getMonitoring).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(getMonitoring()).to.be.a('function')
    })

    it('creates MONITORING_SUCCESS when fetching monitoring sites', () => {
      const resolved = new Promise((r) => r({ data: successfulResponse }))
      monitoringApi.returns(resolved)

      const expectedActions = [
        { type: MONITORING_PENDING },
        { type: MONITORING_SUCCESS, response: successfulResponse }
      ]

      const store = mockStore({ monitoringSites: {} })
    })
  })
})

