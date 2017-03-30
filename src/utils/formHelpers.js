import _ from 'lodash';

const onlyNums = value => value.replace(/[^\d]/g, '')

export const checkValidation = (values, fields) => {
  const errors = {}
  _.each(fields, (type, field) => {
    if(!values[field]) {
      errors[field] = `Please enter your ${type.label}`
    }
  })
  if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if(values.password && values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  } else if(values.password && !/^(?=.*\d)(?=.*[a-z]).{8,}$/.test(values.password)) {
    errors.password = 'Password should contain atleast one number and one capital letter'
  }
  if (values.creditCardNumber && values.creditCardNumber.length < 16) {
    errors.creditCardNumber = 'Credit card number must be 16 digits long'
  }
  if (values.expirationDate && values.expirationDate.length < 7) {
    errors.expirationDate = 'Invalid expiration date'
  }
  if (values.cvCode && values.cvCode.length < 3) {
    errors.cvCode = 'Invalide CVC'
  }
  if (values.zipcode && values.zipcode.length < 5) {
    errors.zipcode = 'Zipcode must be 6 digits'
  }
  return errors;

}

export const normalizePhone = (value, previousValue) => {
  if (!value) {
    return value
  }
  const phoneNumber = onlyNums(value)
  if (!previousValue || value.length > previousValue.length) {
    if (phoneNumber.length === 3) {
      return phoneNumber + '-'
    }
    if (phoneNumber.length === 6) {
      return phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3) + '-'
    }
  }
  if (phoneNumber.length <= 3) {
    return phoneNumber
  }
  if (phoneNumber.length <= 6) {
    return phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3)
  }
  return phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3, 6) + '-' + phoneNumber.slice(6, 10)
}

export const normalizeDate = (value, previousValue) => {
  if (!value) {
    return value
  }
  const date = onlyNums(value)
  if (!previousValue || value.length > previousValue.length) {
    if (date.length === 2) {
      return date + '/'
    }
    if (date.length === 4) {
      return date.slice(0, 2) + '/' + date.slice(2) + '/'
    }
  }
  if (date.length <= 2) {
    return date
  }
  if (date.length <= 4) {
    return date.slice(0, 2) + '/' + date.slice(2)
  }
  return date.slice(0, 2) + '/' + date.slice(2, 4) + '/' + date.slice(4, 8)
}

export const normalizeCreditCard = (value, previousValue) => {
  if(!value) {
    return value
  }
  const cc = onlyNums(value)
  if (!previousValue || value.length > previousValue.length) {
    if (cc.length === 4) {
      return cc + '-'
    }
    if (cc.length === 8) {
      return cc.slice(0, 4) + '-' + cc.slice(4) + '-'
    }
    if (cc.length === 12) {
      return cc.slice(0, 4) + '-' + cc.slice(4, 8) + '-' + cc.slice(8) + '-'
    }
    if (cc.length === 16) {
      return cc.slice(0, 4) + '-' + cc.slice(4, 8) + '-' + cc.slice(8, 12) + '-' + cc.slice(12)
    }
  }
  if (cc.length <= 4) {
    return cc
  }
  if (cc.length <= 8) {
    return cc.slice(0, 4) + '-' + cc.slice(4)
  }
  if (cc.length <= 12) {
    return cc.slice(0, 4) + '-' + cc.slice(4, 8) + '-' + cc.slice(8)
  }
  return cc.slice(0, 4) + '-' + cc.slice(4, 8) + '-' + cc.slice(8, 12) + '-' + cc.slice(12, 16)
}

export const normalizeExDate = (value, previousValue) => {
  if(!value) {
    return value
  }
  const exDate = onlyNums(value)
  if (!previousValue || value.length > previousValue.length) {
    if (exDate.length === 2) {
      return exDate + '/'
    }
    if (exDate.length === 6) {
      return exDate.slice(0,2) + '/' + exDate.slice(2)
    }
  }
  if (exDate.length <= 2) {
    return exDate
  }
  if (exDate.length <= 6) {
    return exDate.slice(0,2) + '/' + exDate.slice(2)
  }
  return exDate.slice(0,2) + '/' + exDate.slice(2,6)
}

export const normalizeNums = (value) => {
  if(!value) {
    return value
  }
  return onlyNums(value)
}
