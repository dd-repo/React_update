import {
  RECEIVE_ADMIN_FAILURE,
  RECEIVE_ADMIN_UPDATE_SUCCESS,
  RECEIVE_ADMIN_UPDATE_FAILURE
} from 'routes/admin/Dashboard/Users/Admin/modules/admin'

import {
  CLEAR_NOTIFICATION,
  SUCCESS_RESPONSE,
  clearNotification,
  default as reducer
} from 'routes/admin/Dashboard/Users/Admin/modules/notification'

const error = {
  response: {
    data: {
      errorMessage: 'error message'
    }
  }
}

const successMessage = {
  message: SUCCESS_RESPONSE,
  status: 'success'
}

const errorMessage = {
  message: 'error message',
  status: 'danger'
}

describe('(notification module)', () => {
  it('should export constants', () => {
    expect(CLEAR_NOTIFICATION).to.equal('CLEAR_NOTIFICATION')
    expect(SUCCESS_RESPONSE).to.equal('Admin was successfully updated')
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
      expect(reducer(undefined, {})).to.be.an('object')
    })

    it('should handle RECEIVE_ADMIN_UPDATE_SUCCESS', () => {
      const state = reducer({}, { type: RECEIVE_ADMIN_UPDATE_SUCCESS })
      expect(state).to.eql(successMessage)
    })

    it('should handle RECEIVE_ADMIN_UPDATE_FAILURE', () => {
      const state = reducer({}, { type: RECEIVE_ADMIN_UPDATE_FAILURE, error })
      expect(state).to.eql(errorMessage)
    })

    it('should handle RECEIVE_ADMIN_FAILURE', () => {
      const state = reducer({}, { type: RECEIVE_ADMIN_FAILURE, error })
      expect(state).to.eql(errorMessage)
    })
  })
})

