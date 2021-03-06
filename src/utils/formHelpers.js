import _ from 'underscore'

export const onlyNums = value => (value.replace(/[^\d]/g, ''))

export const checkValidation = (values, fields = {}, omittedFields) => {
  const errors = {}
  const validationFields = omittedFields ? _.omit(fields, omittedFields) : fields

  _.each(validationFields, (type, field) => {
    if (!values[field]) {
      errors[field] = type.errorMessage
    }
  })

  if (!values.sales_rep_id) {
    errors.sales_rep_id = 'Required'
  }
  if (!values.plan_id) {
    errors.plan_id = 'Required'
  }
  if (!values.next_payment) {
    errors.next_payment = 'Required'
  }
  if (!values.card_id) {
    errors.card_id = 'Required'
  }
  if (!values.state) {
    errors.state = 'Required'
  }
  if (!values.expirationMonth) {
    errors.expirationMonth = 'Required'
  }
  if (!values.expirationYear) {
    errors.expirationYear = 'Required'
  }
  if (values.email) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
  }
  if (values.password && values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  } else if (values.password && !/^(?=.*\d)(?=.*[a-z]).{8,}$/.test(values.password)) {
    errors.password = 'Password should contain atleast one number'
  }
  if (values.creditCardNumber && values.creditCardNumber.length < 15) {
    errors.creditCardNumber = 'Invalid credit card number'
  }
  if (values.cvCode && values.cvCode.length < 3) {
    errors.cvCode = 'Invalid CVC'
  }
  if (values.zipcode && values.zipcode.length < 5) {
    errors.zipcode = 'Zipcode must be 5 digits'
  }
  if (values.phoneNumber && values.phoneNumber.length < 10) {
    errors.phoneNumber = 'Phone Number must be 10 digits'
  }
  return errors
}

export const normalizePhone = (value, previousValue) => {
  if (!value) {
    return value
  }
  return onlyNums(value)
  // const phoneNumber = onlyNums(value)
  // if(!previousValue || value.length > previousValue.length) {
  //   if(phoneNumber.length === 3) {
  //     return phoneNumber + '-'
  //   }
  //   if(phoneNumber.length === 6) {
  //     return phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3) + '-'
  //   }
  // }
  // if(phoneNumber.length <= 3) {
  //   return phoneNumber
  // }
  // if(phoneNumber.length <= 6) {
  //   return phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3)
  // }
  // return phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3, 6) + '-' + phoneNumber.slice(6, 10)
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
  if (!value) {
    return value
  }
  return onlyNums(value)
  // const cc = onlyNums(value)
  // if(!previousValue || value.length > previousValue.length) {
  //   if(cc.length === 4) {
  //     return cc + '-'
  //   }
  //   if(cc.length === 8) {
  //     return cc.slice(0, 4) + '-' + cc.slice(4) + '-'
  //   }
  //   if(cc.length === 12) {
  //     return cc.slice(0, 4) + '-' + cc.slice(4, 8) + '-' + cc.slice(8) + '-'
  //   }
  //   if(cc.length === 16) {
  //     return cc.slice(0, 4) + '-' + cc.slice(4, 8) + '-' + cc.slice(8, 12) + '-' + cc.slice(12)
  //   }
  // }
  // if(cc.length <= 4) {
  //   return cc
  // }
  // if(cc.length <= 8) {
  //   return cc.slice(0, 4) + '-' + cc.slice(4)
  // }
  // if(cc.length <= 12) {
  //   return cc.slice(0, 4) + '-' + cc.slice(4, 8) + '-' + cc.slice(8)
  // }
  // return cc.slice(0, 4) + '-' + cc.slice(4, 8) + '-' + cc.slice(8, 12) + '-' + cc.slice(12, 16)
}

export const normalizeExDate = (value, previousValue) => {
  if (!value) {
    return value
  }
  const exDate = onlyNums(value)
  if (!previousValue || value.length > previousValue.length) {
    if (exDate.length === 2) {
      return exDate + '/'
    }
    if (exDate.length === 6) {
      return exDate.slice(0, 2) + '/' + exDate.slice(2)
    }
  }
  if (exDate.length <= 2) {
    return exDate
  }
  if (exDate.length <= 6) {
    return exDate.slice(0, 2) + '/' + exDate.slice(2)
  }
  return exDate.slice(0, 2) + '/' + exDate.slice(2, 6)
}

export const normalizeNums = (value) => {
  if (!value) {
    return value
  }
  return onlyNums(value)
}
