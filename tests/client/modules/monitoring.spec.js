// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
//
// import infosweepApi from 'services/infosweepApi';

import {
  MONITORING_PENDING,
  MONITORING_SUCCESS,
  MONITORING_FAILURE,
  MONITORING_UPDATE_SUCCESS,
  MONITORING_UPDATE_FAILURE,
  MONITORING_COMPLETED_SUCCESS,
  fetchMonitoringRequests,
  fetchMonitoringRequestsCompleted,
  requestRemoval,
  removalRequestSuccess,
  receiveMonitoringCompleted,
  removalRequestFailure,
  gettingMonitoring,
  monitoringSuccess,
  monitoringFailure,
  updateMonitoringSite,
  default as reducer
} from 'routes/client/Monitoring/modules/monitoring.js';

// const middlewares = [ thunk ]
// const mockStore = configureMockStore(middlewares)

const successfulResponse = {
  monitoring_requests: [
    {
      id: 3,
      site: "instantcheckmate.com",
      status: "requested",
    },
    {
      id: 2,
      site: "peoplefinder.com",
      status: "queued",
    },
    {
      id: 1,
      site: "radius.com",
      status: "pending",
    }
  ],
  meta: {
    total_count: 100
  }
}

const completedRequestResponse = {
  monitoring_request_receipts: [
    {
      id: 3,
      site: "instantcheckmate.com",
      status: "completed",
    },
    {
      id: 2,
      site: "peoplefinder.com",
      status: "completed",
    },
    {
      id: 1,
      site: "radius.com",
      status: "completed",
    }
  ]
}
const removal = { id: 1 }

const errRes = {
  status: 400,
  response: { data: { errorMessage: 'error message' } },
}

describe('(client monitoring module) monitoring requests', () => {

  it('Should export a constant.', () => {
    expect(MONITORING_PENDING).to.equal('MONITORING_PENDING')
    expect(MONITORING_SUCCESS).to.equal('MONITORING_SUCCESS')
    expect(MONITORING_FAILURE).to.equal('MONITORING_FAILURE')
    expect(MONITORING_UPDATE_SUCCESS).to.equal('MONITORING_UPDATE_SUCCESS')
    expect(MONITORING_UPDATE_FAILURE).to.equal('MONITORING_UPDATE_FAILURE')
    expect(MONITORING_COMPLETED_SUCCESS).to.equal('MONITORING_COMPLETED_SUCCESS')
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
      expect(monitoringSuccess(successfulResponse)).to.have.property('data', successfulResponse)
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

  describe('(Action Creator) "receiveMonitoringCompleted"', () => {
    it('Should return an action with type MONITORING_COMPLETED_SUCCESS', () => {
      expect(receiveMonitoringCompleted()).to.have.property('type', MONITORING_COMPLETED_SUCCESS )
    })

    it('Should return an action with monitoring object', () => {
      const data = [{id: 1}]
      expect(receiveMonitoringCompleted(data)).to.have.property('data', data)
    })
  })

  describe('(Async Action Creator) "fetchMonitoringRequests"', () => {
    let monitoringApi;

    beforeEach(() => {
      monitoringApi = sinon.stub(infosweepApi, 'get')
    })

    afterEach(() => {
      monitoringApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(fetchMonitoringRequests).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(fetchMonitoringRequests()).to.be.a('function')
    })

    it('creates MONITORING_SUCCESS when fetching monitoring sites', (done) => {
      const resolved = new Promise((r) => r({ data: successfulResponse }))
      monitoringApi.returns(resolved)

      const expectedActions = [
        { type: MONITORING_PENDING },
        { type: MONITORING_SUCCESS, data: successfulResponse }
      ]

      const store = mockStore({ monitoring: {} })

      return store.dispatch(fetchMonitoringRequests())
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

      return store.dispatch(fetchMonitoringRequests())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })
  })

  describe('(Async Action Creator) "fetchMonitoringRequestsCompleted"', () => {
    let monitoringApi;

    beforeEach(() => {
      monitoringApi = sinon.stub(infosweepApi, 'get')
    })

    afterEach(() => {
      monitoringApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(fetchMonitoringRequestsCompleted).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(fetchMonitoringRequestsCompleted()).to.be.a('function')
    })

    it('creates MONITORING_SUCCESS when fetching monitoring sites', (done) => {
      const resolved = new Promise((r) => r({ data: successfulResponse }))
      monitoringApi.returns(resolved)

      const expectedActions = [
        { type: MONITORING_COMPLETED_SUCCESS, data: successfulResponse }
      ]

      const store = mockStore({ monitoring: {} })

      return store.dispatch(fetchMonitoringRequestsCompleted())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })
  })

  describe('(Async Action Creator) "requestRemoval"', () => {
    let monitoringApi;

    beforeEach(() => {
      monitoringApi = sinon.stub(infosweepApi, 'patch')
    })

    afterEach(() => {
      monitoringApi.restore()
    })

    it('Should be exported as a function', () => {
      expect(requestRemoval).to.be.a('function')
    })

    it('Should return a function (is a thunk)', () => {
      expect(requestRemoval()).to.be.a('function')
    })

    it('creates MONITORING_UPDATE_SUCCESS when fetching monitoring sites', (done) => {
      const resolved = new Promise((r) => r({ data: removal }))
      monitoringApi.returns(resolved)

      const expectedActions = [
        { type: MONITORING_UPDATE_SUCCESS, removal }
      ]

      const store = mockStore({ monitoring: {} })

      return store.dispatch(requestRemoval())
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

      return store.dispatch(requestRemoval())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })
  })
  describe('(Reducer)', () => {
    const monitoringState = {
      isFetching: false,
      inProgress: [successfulResponse.monitoring_requests[0]],
      inQueue: [successfulResponse.monitoring_requests[1]],
      potentialRisks: [successfulResponse.monitoring_requests[2]],
      totalCount: successfulResponse.meta.total_count,
    }

    const monitoringFailureState = {
      isFetching: false,
      errorMessage: errRes
    }

    const removalUpdated = {
      id: 1,
      site: "radius.com",
      status: "requested",
    }

    const updatedState = {
      isFetching: false,
      inProgress: [{
        id: 1,
        site: "radius.com",
        status: "requested",
      },
      {
        id: 3,
        site: "instantcheckmate.com",
        status: "requested",
      }
      ],
      inQueue: [{
        id: 2,
        site: "peoplefinder.com",
        status: "queued",
      }],
      potentialRisks: [],
      totalCount: 100
    }

    const requestsCompleteState = {
      completed: completedRequestResponse.monitoring_request_receipts,
      isFetching: true
    }

    it('Should be a function.', () => {
      expect(reducer).to.be.a('function')
    })

    it('Should initilaize with an object.', () => {
      expect(reducer(undefined, {})).to.be.an('object')
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = reducer({isFetching: true}, { type: MONITORING_PENDING})
      expect(state).to.be.an('object')
      expect(state).to.have.property('isFetching', true)
      state = reducer(state, { type: 'NOT_ACTION' })
      expect(state).to.have.property('isFetching', true)
    })

    it('should handle MONITORING_SUCCESS', () => {
      const state = reducer({ isFetching: true }, { type: MONITORING_SUCCESS, data: successfulResponse })
      const expected = monitoringState

      expect(state).to.eql(monitoringState)
    })

    it('should handle MONITORING_FAILURE', () => {
      const state = reducer({ isFetching: true }, { type: MONITORING_FAILURE, error: errRes })
      const expected = monitoringFailureState

      expect(state).to.eql(expected)
    });

    it('should handle MONITORING_UPDATE_SUCCESS', () => {
      const state = reducer(monitoringState, { type: MONITORING_UPDATE_SUCCESS, removal: removalUpdated })
      const expected = updatedState
      expect(state).to.eql(expected)
    })

    it('should handle MONITORING_COMPLETED_SUCCESS', () => {
      const state = reducer({isFetching: true}, { type: MONITORING_COMPLETED_SUCCESS, data: completedRequestResponse })
      const expected = requestsCompleteState
      expect(state).to.eql(expected)
    })
  })
})

