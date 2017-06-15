import fields from 'consts/data/formFields';
import {
  onlyNums,
  checkValidation,
  normalizePhone,
  normalizeDate,
  normalizeCreditCard,
  normalizeExDate,
  normalizeNums
} from 'utils/formHelpers';

describe('formHelper', () => {
  describe('onlyNums()', () => {
    it('should return only numbers', () => {
      const string = '123abc!@#$%^&*()'
      const result = onlyNums(string)
      expect(result).to.eq('123')
    })
  })

  describe('checkValidation()', () => {
    describe('email address', () => {
      it('should return no errors wih valid email format', () => {
        const email = {email: 'test@email.com'}
        const errors = checkValidation(email, fields)
        expect(errors).to.not.have.all.keys('email')
        expect(errors.email).to.eql(undefined)
      })

      it('should return error with invalid email format', () => {
        const invalidEmail = {email: 'test@email'}
        const errors = checkValidation(invalidEmail, fields)
        expect(errors.email).to.eql('Invalid email address')
      })
    })

    describe('first name', () => {
      it('should return first name error when object is empty', () => {
        const first = {first_name: ''}
        const errors = checkValidation(first, fields)
        expect(errors.first_name).to.eql('Please enter your First Name')
      })

      it('should return no first name error', () => {
        const first = {first_name: 'first name'}
        const errors = checkValidation(first, fields)
        expect(errors.first_name).to.eql(undefined)
      })

    })
  })
})
