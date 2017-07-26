import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import clickadillyApi from 'services/clickadillyApi';

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
    {
      id: 1,
      site: "radius.com",
      status: "pending",
      status_label: "Pending",
    },
    {
      id: 2,
      site: "peoplefinder.com",
      status: "pending",
      status_label: "Pending",
    },
    {
      id: 3,
      site: "instantcheckmate.com",
      status: "pending",
      status_label: "Pending",
    },
  ]
}
const removal = { id: 1 }

const errRes = {
  status: 400,
  response: { data: { errorMessage: 'error message' } },
}

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
      expect(monitoringFailure(errRes)).to.have.property('error', errRes)
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
      expect(removalRequestFailure(errRes)).to.have.property('error', errRes)
    })
  })

  describe('(Async Action Creator) "getMonitoring"', () => {
    let monitoringApi;

    beforeEach(() => {
      monitoringApi = sinon.stub(clickadillyApi, 'get')
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

    it('creates MONITORING_SUCCESS when fetching monitoring sites', (done) => {
      const resolved = new Promise((r) => r({ data: successfulResponse }))
      monitoringApi.returns(resolved)

      const expectedActions = [
        { type: MONITORING_PENDING },
        { type: MONITORING_SUCCESS, response: successfulResponse }
      ]

      const store = mockStore({ monitoring: {} })

      return store.dispatch(getMonitoring())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })

    it('creates MONITORING_FAILURE when fetching monitoring sites', (done) => {
      const rejected = new Promise((_, r) => r(errRes))
      monitoringApi.returns(rejected)

      const expectedActions = [
        { type: MONITORING_PENDING },
        { type: MONITORING_FAILURE, error: errRes}
      ]

      const store = mockStore({ monitoring: {} })

      return store.dispatch(getMonitoring())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })
  })

  describe('(Async Action Creator) "monitoringRequestRemoval"', () => {
    let monitoringApi;

    beforeEach(() => {
      monitoringApi = sinon.stub(clickadillyApi, 'patch')
    })

    afterEach(() => {
      monitoringApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(monitoringRequestRemoval).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(monitoringRequestRemoval()).to.be.a('function')
    })

    it('creates MONITORING_UPDATE_SUCCESS when fetching monitoring sites', (done) => {
      const resolved = new Promise((r) => r({ data: removal }))
      monitoringApi.returns(resolved)

      const expectedActions = [
        { type: MONITORING_UPDATE_SUCCESS, removal }
      ]

      const store = mockStore({ monitoring: {} })

      return store.dispatch(monitoringRequestRemoval())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })

    it('creates MONITORING_UPDATE_FAILURE when fetching monitoring sites', (done) => {
      const rejected = new Promise((_, r) => r(errRes))
      monitoringApi.returns(rejected)

      const expectedActions = [
        { type: MONITORING_UPDATE_FAILURE, error: errRes }
      ]

      const store = mockStore({ monitoring: {} })

      return store.dispatch(monitoringRequestRemoval())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })
  })
  describe('(Reducer)', () => {
    const monitoringState = {
      all: successfulResponse.monitoring_requests,
      isFetching: false
    }

    const monitoringFailureState = {
      isFetching: false,
      errorMessage: errRes
    }

    const removalUpdated = {
      id: 1,
      site: "radius.com",
      status: "inprogress",
      status_label: "Pending",
    }

    const updatedState = {
      all: [
        {
          id: 2,
          site: "peoplefinder.com",
          status: "pending",
          status_label: "Pending",
        },
        {
          id: 3,
          site: "instantcheckmate.com",
          status: "pending",
          status_label: "Pending",
        },
        {
          id: 1,
          site: "radius.com",
          status: "inprogress",
          status_label: "Pending",
        }
      ],
      isFetching: false
    }

    it('Should be a function.', () => {
      expect(reducer).to.be.a('function')
    })

    it('Should initilaize with an object.', () => {
      expect(reducer(undefined, {})).to.be.an('object')
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = reducer({}, { type: MONITORING_PENDING})
      expect(state).to.be.an('object')
      expect(state).to.have.property('isFetching', true)
      state = reducer(state, { type: 'NOT_ACTION' })
      expect(state).to.have.property('isFetching', true)
    })

    it('should handle MONITORING_PENDING', () => {
      expect(reducer({}, {
        type: MONITORING_PENDING }))
        .to.eql( { isFetching: true })
    })

    it('should handle MONITORING_SUCCESS', () => {
      expect(reducer({ isFetching: true }, {
        type: MONITORING_SUCCESS,
        response: successfulResponse
      })).to.eql(monitoringState)
    })

    it('should handle MONITORING_FAILURE', () => {
      expect(reducer({ isFetching: true }, {
        type: MONITORING_FAILURE,
        error: errRes
      })).to.eql(monitoringFailureState)
    });

    it('should handle MONITORING_UPDATE_SUCCESS', () => {
      expect(reducer(monitoringState, {
        type: MONITORING_UPDATE_SUCCESS,
        removal: removalUpdated
      })).to.eql(updatedState)
    })
  })
})

