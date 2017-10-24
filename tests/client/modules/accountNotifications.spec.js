import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import infosweepApi from 'services/infosweepApi';

import {
  NOTIFICATIONS_SUCCESS,
  NOTIFICATIONS_FAILURE,
  NOTIFICATIONS_UPDATE_SUCCESS,
  fetchAccountNotifications,
  updateAccountNotificationStatus,
  receiveAccountNotificationsSuccess,
  receiveAccountNotificationsFailure,
  receiveNotificationUpdateSuccess,
  default as reducer
} from 'routes/client/Account/modules/notifications';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const notifications = {
  account_system_notifications: [
    {
      id: 1,
      is_type: 'notificationType',
      message_title: 'title',
      message_description: 'description',
      is_active: 'true'
    }
  ]
}

const updatedNotification = {
  id: 1,
  is_type: 'notificationType',
  message_title: 'title',
  message_description: 'description',
  is_active: 'false'
}

const error = { errorMessage: 'error message' }

describe( '(Account Notifications module)', () => {
  it('should export a constant', () => {
    expect(NOTIFICATIONS_SUCCESS).to.equal('NOTIFICATIONS_SUCCESS'),
    expect(NOTIFICATIONS_FAILURE).to.equal('NOTIFICATIONS_FAILURE'),
    expect(NOTIFICATIONS_UPDATE_SUCCESS).to.equal('NOTIFICATIONS_UPDATE_SUCCESS')
  })

  describe('(Action Creator) receiveAccountNotificationsSuccess', () => {
    it('should return an action with type NOTIFICATIONS_SUCCESS', () => {
      expect(receiveAccountNotificationsSuccess()).to.have.property('type', NOTIFICATIONS_SUCCESS)
    })

    it('should return an action with data', () => {
      expect(receiveAccountNotificationsSuccess(notifications)).to.have.property('data', notifications)
    })
  })

  describe('(Action Creator) receiveAccountNotificationsFailure', () => {

    it('should return an action with type NOTIFICATIONS_FAILURE', () => {
      expect(receiveAccountNotificationsFailure()).to.have.property('type', NOTIFICATIONS_FAILURE)
    })

    it('should return an action with error', () => {
      expect(receiveAccountNotificationsFailure(error)).to.have.property('error', error)
    })
  })

  describe('Action Creator) receiveNotificationUpdateSuccess', () => {
    it('should return an action with type NOTIFICATIONS_UPDATE_SUCCESS', () => {
      expect(receiveNotificationUpdateSuccess()).to.have.property('type', NOTIFICATIONS_UPDATE_SUCCESS)
    })

    it('should return an action with data', () => {
      expect(receiveNotificationUpdateSuccess(updatedNotification)).to.have.property('data', updatedNotification)
    })
  })

  describe('(Async action creator) fetchAccountNotifications', () => {
    let accountNotificationApi;

    beforeEach(() => {
      accountNotificationApi = sinon.stub(infosweepApi, 'get')
    })

    afterEach(() => {
      accountNotificationApi.restore()
    })

    it('should be exported as a function', () => {
      expect(fetchAccountNotifications).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(fetchAccountNotifications()).to.be.a('function')
    })

    it('created NOTIFICATIONS_SUCCESS when fetching account notification', (done) => {
      const resolved = new Promise(r => r({data: notifications}));
      accountNotificationApi.returns(resolved)

      const expectedActions = [
        { type: NOTIFICATIONS_SUCCESS, data: notifications }
      ]

      const store = mockStore({ notification: {} })

      return store.dispatch(fetchAccountNotifications())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })

    it('creates NOTIFICATIONS_FAILURE when fetching account notification', (done) => {
      const rejected = new Promise((_, r) => r(error));
      accountNotificationApi.returns(rejected);

      const expectedActions = [
        { type: NOTIFICATIONS_FAILURE, error }
      ]

      const store = mockStore({ notifications: {} })

      return store.dispatch(fetchAccountNotifications())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })
  })

  describe('(Async Action) updateAccountNotificationStatus', () => {
    let accountNotificationApi;

    beforeEach(() => {
      accountNotificationApi = sinon.stub(infosweepApi, 'patch')
    })

    afterEach(() => {
      accountNotificationApi.restore()
    })

    it('should be exported as a function', () => {
      expect(updateAccountNotificationStatus).to.be.a('function')
    })

    it('should return a function (is a thunk)', () => {
      expect(updateAccountNotificationStatus()).to.be.a('function')
    })

    it('creates NOTIFICATIONS_UPDATE_SUCCESS', (done) => {
      const resolved = new Promise(r => r({ data: updatedNotification }))
      accountNotificationApi.returns(resolved);

      const expectedActions = [
        { type: NOTIFICATIONS_UPDATE_SUCCESS, data: updatedNotification }
      ]

      const store = mockStore({notifications: {}})

      return store.dispatch(updateAccountNotificationStatus())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
    })
  })

  describe('(Reducer)', () => {
    const accountNotification = notifications.account_system_notifications[0]

    it('should be a function', () => {
      expect(reducer).to.be.a('function')
    })

    it('should initialize with an object', () => {
      expect(reducer(undefined, {})).to.be.an('object')
    })

    it('Should return the previous state if an action was not matched.', () => {
      let state = reducer({}, { type: 'NOT_ACTION'})
      expect(state).to.eql({})
    })

    it('should handle NOTIFICATIONS_SUCCESS', () => {
      const state = reducer({}, { type: NOTIFICATIONS_SUCCESS, data: notifications})
      const expected = { [accountNotification.is_type]: accountNotification }

      expect(state).to.eql(expected)
    })

    it('should handle NOTIFICATIONS_UPDATE_SUCCESS', () => {
      const notificationState = {notificationType: {id: 1, is_type: 'type', message_title: 'title', message_description: 'description', is_active: 'true'}}
      const state = reducer(notificationState, { type: NOTIFICATIONS_UPDATE_SUCCESS, data: updatedNotification })
      const expected = { notificationType: updatedNotification }

      expect(state).to.eql(expected)
    })
  })
})

