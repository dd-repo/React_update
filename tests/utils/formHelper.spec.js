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
        const first = {firstName: ''}
        const errors = checkValidation(first, fields)
        expect(errors.firstName).to.eql('Please enter your First Name')
      })

      it('should return no first name error', () => {
        const first = {firstName: 'first name'}
        const errors = checkValidation(first, fields)
        expect(errors.firstName).to.eql(undefined)
      })
    })

    describe('last name', () => {
      it('should return last name error when object is empty', () => {
        const last = {lastName: ''}
        const errors = checkValidation(last, fields)
        expect(errors.lastName).to.eql('Please enter your Last Name')
      })

      it('should return no last name error', () => {
        const last = {lastName: 'last name'}
        const errors = checkValidation(last, fields)
        expect(errors.lastName).to.eql(undefined)
      })
    })

    describe('password', () => {
      it('should return error when password is blank', () => {
        const password = {password: ''}
        const errors = checkValidation(password, fields)
        expect(errors.password).to.eql('Please enter a Password')
      })

      it('should return error when contains no number', () => {
        const password = {password: 'password'}
        const errors = checkValidation(password, fields)
        expect(errors.password).to.eq('Password should contain atleast one number')
      })

      it('should return error when less then 8 charaters', () => {
        const password = {password: 'pass'}
        const errors = checkValidation(password, fields)
        expect(errors.password).to.eq('Password must be at least 8 characters')
      })

      it('should return no errors', () => {
        const password = {password: 'password1'}
        const errors = checkValidation(password, fields)
        expect(errors.password).to.eq(undefined)
      })
    })

    describe('password confirmation', () => {
      it('should return error when password confirmation is blank', () => {
        const passwordConfirmation = {passwordConfirmation: ''}
        const errors = checkValidation(passwordConfirmation, fields)
        expect(errors.passwordConfirmation).to.eql('Please confirm your Password')
      })

      it('should return no errors', () => {
        const passwordConfirmation = {passwordConfirmation: 'password1'}
        const errors = checkValidation(passwordConfirmation, fields)
        expect(errors.passwordConfirmation).to.eq(undefined)
      })
    })

    describe('credit card number', () => {
      it('should return an error when ccn is blank', () => {
        const ccn = {creditCardNumber: ''}
        const errors = checkValidation(ccn, fields)
        expect(errors.creditCardNumber).to.eq('Please enter your Credit Card Number')
      })

      it('should return an error when less then 16 charaters', () => {
        const ccn = {creditCardNumber: '424242424242'}
        const errors = checkValidation(ccn, fields)
        expect(errors.creditCardNumber).to.eq('Credit card number must be 16 digits long')
      })

      it('should return no errors', () => {
        const ccn = {creditCardNumber: '4242424242424242'}
        const errors = checkValidation(ccn, fields)
        expect(errors.creditCardNumber).to.eq(undefined)
      })
    })

    describe('expiration Month', () => {
      it('should return an error when expiration month is blank', () => {
        const exp = {expirationMonth: ''}
        const errors = checkValidation(exp, fields)
        expect(errors.expirationMonth).to.eq('Required')
      })

      it('should return no erros', () => {
        const exp = {expirationMonth: '2'}
        const errors = checkValidation(exp, fields)
        expect(errors.expirationMonth).to.eq(undefined)
      })
    })

    describe('expiration Year', () => {
      it('should return an error when expiration year is blank', () => {
        const exp = {expirationYear: ''}
        const errors = checkValidation(exp, fields)
        expect(errors.expirationYear).to.eq('Required')
      })

      it('should return no erros', () => {
        const exp = {expirationYear: '2020'}
        const errors = checkValidation(exp, fields)
        expect(errors.expirationYear).to.eq(undefined)
      })
    })

    describe('CVC', () => {
      it('should return an error when cvc is blank', () => {
        const cvc = {cvCode: ''}
        const errors = checkValidation(cvc, fields)
        expect(errors.cvCode).to.eql('Please enter your Credit Card CVC Number')
      })

      it('should return an error when cvc is less then 3 numbers', () => {
        const cvc = {cvCode: '12'}
        const errors = checkValidation(cvc, fields)
        expect(errors.cvCode).to.eql('Invalid CVC')
      })

      it('return no errors when cvc is 3 digits', () => {
        const cvc1 = {cvCode: '123'}
        const errors1 = checkValidation(cvc1, fields)
        expect(errors1.cvCode).to.eql(undefined)
      })

      it('return no errors when cvc is 4 digits', () => {
        const cvc2 = {cvCode: '1234'}
        const errors2 = checkValidation(cvc2, fields)
        expect(errors2.cvCode).to.eql(undefined)
      })
    })

    describe('zipcode', () => {
      it('should return error when zipcode is blank', () => {
        const zip = {zipcode: ''}
        const errors = checkValidation(zip, fields)
        expect(errors.zipcode).to.eql('Please enter a Zipcode')
      })

      it('should return error when zipcode is less then 5 digits', () => {
        const zip = {zipcode: '1234'}
        const errors = checkValidation(zip, fields)
        expect(errors.zipcode).to.eql('Zipcode must be 5 digits')
      })

      it('should return no errors', () => {
        const zip = {zipcode: '12345'}
        const errors = checkValidation(zip, fields)
        expect(errors.zipcode).to.eql(undefined)
      })
    })

    describe('phoneNumber', () => {
      it('should return error when phoneNumber is blanck', () => {
        const phone = {phoneNumber: ''}
        const errors = checkValidation(phone, fields)
        expect(errors.phoneNumber).to.eql('Please enter your Phone Number')
      })

      it('should return error when phoneNumber is less then 10 digits', () => {
        const phone = {phoneNumber: '123456789'}
        const errors = checkValidation(phone, fields)
        expect(errors.phoneNumber).to.eql('Phone Number must be 10 digits')
      })

      it('should return no errors', () => {
        const phone = {phoneNumber: '0123456789'}
        const errors = checkValidation(phone, fields)
        expect(errors.phoneNumber).to.eql(undefined)
      })
    })

    it('omit validation if omittedFields array', () => {
      const omittedFields = ['firstName', 'lastName', 'phoneNumber']
      const first = ''
      const last = ''
      const phoneNumber = ''
      const errors = checkValidation(first, fields, omittedFields)
      expect(errors.firstName).to.eql(undefined)
      expect(errors.lastName).to.eql(undefined)
      expect(errors.phoneNumber).to.eql(undefined)
    })
  })

  describe('normalizePhone', () => {
    it('should return a number', () => {
      const value = '1'
      const previousValue = ''
      const result = normalizePhone(value, previousValue)
      expect(result).to.eql('1')
    })

    it('should return empty string if not a number', () => {
      const value = 'a'
      const previousValue = ''
      const result = normalizePhone(value, previousValue)
      expect(result).to.eql('')
    })

    it('should return a dash after 3 digits when typing', () => {
      const value = '123'
      const previousValue = ''
      const result = normalizePhone(value, previousValue)
      expect(result).to.eql('123-')
    })

    it('should return 2 dash after 6 digits when typing', () => {
      const value = '123-456'
      const previousValue = '123-45'
      const result = normalizePhone(value, previousValue)
      expect(result).to.eql('123-456-')
    })

    it('should not return a dash when backspacing', () => {
      const value = '123'
      const previousValue = '123-4'
      const result = normalizePhone(value, previousValue)
      expect(result).to.eql('123')
    })

    it('should not return 2 dash when backspacing', () => {
      const value = '123-456'
      const previousValue = '123-456-7'
      const result = normalizePhone(value, previousValue)
      expect(result).to.eql('123-456')
    })
  })

  describe('normalizeDate', () => {
    it('should return only numbers', () => {
      const value = '1abc'
      const previousValue = '12'
      const result = normalizeDate(value, previousValue)
      expect(result).to.eql('1')
    })

    it('should return 2 numbers with 1 forward slash', () => {
      const value = '12'
      const previousValue = '1'
      const result = normalizeDate(value, previousValue)
      expect(result).to.eql('12/')
    })

    it('should return 4 numbers with 2 forward slash', () => {
      const value = '1201'
      const previousValue = '120'
      const result = normalizeDate(value, previousValue)
      expect(result).to.eql('12/01/')
    })

    it('should return 8 digits', () => {
      const value = '12/01/2000000000'
      const previousValue = '12/01/2000'
      const result = normalizeDate(value, previousValue)
      expect(result).to.eql('12/01/2000')
    })
  })

  describe('normalizeCreditCard', () => {
    it('should return only numbers', () => {
      const value = '123abc'
      const previousValue = '12'
      const result = normalizeCreditCard(value, previousValue)
      expect(result).to.eql('123')
    })

    it('should return 4 digits with hyphen', () => {
      const value = '4242'
      const previousValue = '424'
      const result = normalizeCreditCard(value, previousValue)
      expect(result).to.eql('4242-')
    })

    it('should return hyphen after 8 digits', () => {
      const value = '4242-4242'
      const previousValue = '4242-424'
      const result = normalizeCreditCard(value, previousValue)
      expect(result).to.eql('4242-4242-')
    })

    it('should return hyphen after 12 digits', () => {
      const value = '4242-4242-4242'
      const previousValue = '4242-4242-424'
      const result = normalizeCreditCard(value, previousValue)
      expect(result).to.eql('4242-4242-4242-')
    })

    it('should only return 16 digits', () => {
      const value = '4242-4242-4242-42424242'
      const previousValue = '4242-4242-4242-4242'
      const result = normalizeCreditCard(value, previousValue)
      expect(result).to.eql('4242-4242-4242-4242')
    })
  })

  describe('normalizeExDate', () => {
    it('should return only numbers', () => {
      const value = '1abcdg'
      const previousValue = '1'
      const result = normalizeExDate(value, previousValue)
      expect(result).to.eql('1')
    })

    it('should return forward slash after 2 numbers', () => {
      const value = '12'
      const previousValue = '1'
      const result = normalizeExDate(value, previousValue)
      expect(result).to.eql('12/')
    })

    it('should return only 6 digits', () => {
      const value = '12/2000000000'
      const previousValue = '12/2000'
      const result = normalizeExDate(value, previousValue)
      expect(result).to.eql('12/2000')
    })
  })

  describe('normalizeNums', () => {
    it('should return only numbers', () => {
      const value = '123abc#@%$'
      const result = normalizeNums(value)
      expect(result).to.eql('123')
    })
  })
})
