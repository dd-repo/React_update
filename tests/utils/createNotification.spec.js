import { createNotification } from 'utils';

const error = {
  response: {data: {errorMessage: 'error message'}}
}

describe('createNotification()', () => {
  it('should be a function', () => {
    expect(createNotification).to.be.a('function')
  })

  describe('creates notification if message is object', () => {
    it('should return an object with message', () => {
      expect(createNotification(error, 'danger'))
      .to.have.property(
        'message',
        error.response.data.errorMessage
      )
    })

    it('should return an object with status', () => {
      expect(createNotification(error, 'danger'))
      .to.have.property(
        'status',
        'danger'
      )
    })
  })

  describe('create notification if message is string', () => {
    it('should return an object with message', () => {
      expect(createNotification('this is a message', 'danger'))
      .to.have.property(
        'message',
        'this is a message'
      )
    })

    it('should return an object with status', () => {
      expect(createNotification(error, 'danger'))
      .to.have.property(
        'status',
        'danger'
      )
    })
  })
})
