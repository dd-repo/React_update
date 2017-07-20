import {
  CLEAR_NOTIFICATION,
  clearNotification,
  default as reducer
} from 'routes/admin/Dashboard/User/modules/notifications';

import {
  USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} from 'routes/admin/Dashboard/User/modules/user';

import {
  ACCOUNT_FAILURE,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILURE
} from 'routes/admin/Dashboard/User/modules/account';

import {
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_FAILURE
} from 'routes/admin/Dashboard/User/modules/addresses';

import {
  CARDS_FAILURE,
  ADD_CARD_FAILURE,
  ADD_CARD_SUCCESS
} from 'routes/admin/Dashboard/User/modules/cards';

import {
  UPDATE_KEYWORD_SUCCESS,
  UPDATE_KEYWORD_FAILURE,
  ADD_KEYWORD_SUCCESS,
  ADD_KEYWORD_FAILURE
} from 'routes/admin/Dashboard/User/modules/keywords';

import {
  UPDATE_PHONE_SUCCESS,
  UPDATE_PHONE_FAILURE
} from 'routes/admin/Dashboard/User/modules/phones';

import {
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE
} from 'routes/admin/Dashboard/User/modules/profile';

import {
  UPDATE_SUBSCRIPTION_SUCCESS,
  UPDATE_SUBSCRIPTION_FAILURE
} from 'routes/admin/Dashboard/User/modules/subscriptions';

import {
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAILURE
} from 'routes/admin/Dashboard/User/modules/transactions';

const initialValue = {
  message: null,
  status: null
}

const error = {
  response: {
    data: {
      errorMessage: 'error message'
    }
  }
}

const cardError = {
  response: {
    data: {
      message: 'error message'
    }
  }
}

describe('(Notification module)', () => {
  it('should export constants', () => {
    expect(CLEAR_NOTIFICATION).to.equal('CLEAR_NOTIFICATION')
  })

  describe('Action Creator "clearNotification"', () => {
    it('should return a type with "CLEAR_NOTIFICATION"', () => {
      expect(clearNotification()).to.have.property('type', CLEAR_NOTIFICATION)
    })
  })

  describe('(Reducer)', () => {
    it('Should be a function', () => {
      expect(reducer).to.be.a('function')
    })

    it('should initialize with an object', () => {
      expect(reducer(undefined, initialValue)).to.be.an('object')
    })

    it('should handle UPDATE_TRANSACTION_SUCCESS', () => {
      const notificationState = reducer(initialValue, { type: UPDATE_TRANSACTION_SUCCESS })
      const expected = { message: 'Transaction Successfully Updated', status: 'success' }
      expect(notificationState).to.eql(expected)
    })

    it('should handle UPDATE_SUBSCRIPTION_SUCCESS', () => {
      const notificationState = reducer(initialValue, { type: UPDATE_SUBSCRIPTION_SUCCESS })
      const expected = { message: 'Subscription Successfully Updated', status: 'success' }
      expect(notificationState).to.eql(expected)
    })

    it('should handle UPDATE_PROFILE_SUCCESS', () => {
      const notificationState = reducer(initialValue, { type: UPDATE_PROFILE_SUCCESS })
      const expected = { message: 'Profile Successfully Updated', status: 'success' }
      expect(notificationState).to.eql(expected)
    })

    it('should handle UPDATE_PHONE_SUCCESS', () => {
      const notificationState = reducer(initialValue, { type: UPDATE_PHONE_SUCCESS })
      const expected = { message: 'Phone Successfully Updated', status: 'success' }
      expect(notificationState).to.eql(expected)
    })

    it('should handle UPDATE_KEYWORD_SUCCESS', () => {
      const notificationState = reducer(initialValue, { type: UPDATE_KEYWORD_SUCCESS })
      const expected = { message: 'Keyword Successfully Updated', status: 'success' }
      expect(notificationState).to.eql(expected)
    })

    it('should handle UPDATE_ACCOUNT_SUCCESS', () => {
      const notificationState = reducer(initialValue, { type: UPDATE_ACCOUNT_SUCCESS })
      const expected = { message: 'Account Details Successfully Updated', status: 'success' }
      expect(notificationState).to.eql(expected)
    })

    it('should handle UPDATE_ADDRESS_SUCCESS', () => {
      const notificationState = reducer(initialValue, { type: UPDATE_ADDRESS_SUCCESS })
      const expected = { message: 'Address Successfully Updated', status: 'success' }
      expect(notificationState).to.eql(expected)
    })

    it('should handle UPDATE_USER_SUCCESS', () => {
      const notificationState = reducer(initialValue, { type: UPDATE_USER_SUCCESS })
      const expected = { message: 'Subscriber Successfully Updated', status: 'success' }
      expect(notificationState).to.eql(expected)
    })

    it('should handle ADD_KEYWORD_SUCCESS', () => {
      const notificationState = reducer(initialValue, { type: ADD_KEYWORD_SUCCESS })
      const expected = { message: 'Keyword Successfully Added', status: 'success' }
      expect(notificationState).to.eql(expected)
    })

    it('should handle ADD_CARD_SUCCESS', () => {
      const notificationState = reducer(initialValue, { type: ADD_CARD_SUCCESS })
      const expected = { message: 'Card Successfully Added', status: 'success' }
      expect(notificationState).to.eql(expected)
    })

    it('should handle ADD_CARD_FAILURE', () => {
      const notificationState = reducer(initialValue, { type: ADD_CARD_FAILURE, error: cardError })
      const expected = { message: cardError.response.data.message, status: 'danger' }
      expect(notificationState).to.eql(expected)
    })

    it('should handle UPDATE_TRANSACTION_FAILURE', () => {
      const notificationState = reducer(initialValue, { type: UPDATE_TRANSACTION_FAILURE, error })
      const expected = { message: error.response.data.errorMessage, status: 'danger' }
      expect(notificationState).to.eql(expected)
    })

    it('should handle UPDATE_SUBSCRIPTION_FAILURE', () => {
      const notificationState = reducer(initialValue, { type: UPDATE_SUBSCRIPTION_FAILURE, error })
      const expected = { message: error.response.data.errorMessage, status: 'danger' }
      expect(notificationState).to.eql(expected)
    })

    it('should handle UPDATE_PROFILE_FAILURE', () => {
      const notificationState = reducer(initialValue, { type: UPDATE_PROFILE_FAILURE, error })
      const expected = { message: error.response.data.errorMessage, status: 'danger' }
      expect(notificationState).to.eql(expected)
    })

    it('should handle UPDATE_KEYWORD_FAILURE', () => {
      const notificationState = reducer(initialValue, { type: UPDATE_KEYWORD_FAILURE, error })
      const expected = { message: error.response.data.errorMessage, status: 'danger' }
      expect(notificationState).to.eql(expected)
    })

    it('should handle ADD_KEYWORD_FAILURE', () => {
      const notificationState = reducer(initialValue, { type: ADD_KEYWORD_FAILURE, error })
      const expected = { message: error.response.data.errorMessage, status: 'danger' }
      expect(notificationState).to.eql(expected)
    })

    it('should handle UPDATE_ADDRESS_FAILURE', () => {
      const notificationState = reducer(initialValue, { type: UPDATE_ADDRESS_FAILURE, error })
      const expected = { message: error.response.data.errorMessage, status: 'danger' }
      expect(notificationState).to.eql(expected)
    })

    it('should handle UPDATE_ACCOUNT_FAILURE', () => {
      const notificationState = reducer(initialValue, { type: UPDATE_ACCOUNT_FAILURE, error })
      const expected = { message: error.response.data.errorMessage, status: 'danger' }
      expect(notificationState).to.eql(expected)
    })

    it('should handle UPDATE_USER_FAILURE', () => {
      const notificationState = reducer(initialValue, { type: UPDATE_USER_FAILURE, error })
      const expected = { message: error.response.data.errorMessage, status: 'danger' }
      expect(notificationState).to.eql(expected)
    })

    it('should handle CLEAR_NOTIFICATION', () => {
      const notification = { message: 'message', status: 'success' }
      const notificationState = reducer(notification, { type: CLEAR_NOTIFICATION })
      expect(notificationState).to.eql(initialValue)
    })
  })
})
