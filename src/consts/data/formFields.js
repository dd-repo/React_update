import states from 'consts/data/states';
import {
  onlyNums,
  checkValidation,
  normalizePhone,
  normalizeDate,
  normalizeCreditCard,
  normalizeExDate,
  normalizeNums
} from 'utils/formHelpers';

const fields = {
  first_name: {
    name: 'first_name',
    type: 'text',
    label: 'First Name',
    placeHolder: 'Enter your first name...',
  },
  last_name: {
    name: 'last_name',
    type: 'text',
    label: 'Last Name',
    placeHolder: 'Enter your last name',
  },
  email: {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeHolder: 'Enter your email...',
  },
  phone_number: {
    name: 'phone_number',
    type: 'tel',
    label: 'Phone Number',
    placeHolder: 'Enter your phone number...',
    normalize: normalizePhone
  },
  authnet_id: {
    name: 'authnet_id',
    type: 'text',
    label: 'Authnet Id',
    placeHolder: 'Enter clients authroize.net id...'
  },
  cc_first_name: {
    name: 'cc_first_name',
    type: 'text',
    label: 'First Name',
  },
  cc_last_name: {
    name: 'cc_last_name',
    type: 'text',
    label: 'Last Name',
  },
  creditCardNumber: {
    name: 'creditCardNumber',
    type: 'text',
    label: 'Valid Card Number',
    normalize: normalizeCreditCard
  },
  expirationDate: {
    name: 'expirationDate',
    type: 'text',
    label: 'MM/YYY',
    normalize: normalizeExDate
  },
  cvCode: {
    name: 'cvCode',
    type: 'text',
    label: 'CVC',
    maxLength: '4',
    normalize: normalizeNums
  },
  kw_first_name: {
    name: 'kw_first_name',
    type: 'text',
    label: 'First Name'
  },
  kw_last_name: {
    name: 'kw_last_name',
    type: 'text',
    label: 'Last Name'
  },
  address: {
    name: 'address',
    type: 'text',
    label: 'Street Address',
  },
  city: {
    name: 'city',
    type: 'text',
    label: 'City / Town',
  },
  zipcode: {
    name: 'zipcode',
    type: 'text',
    label: 'Zipcode',
    normalize: normalizeNums,
    maxLength: 5
  },
  dob: {
    name: 'dob',
    type: 'text',
    label: 'MM / DD / YYYY',
    normalize: normalizeDate
  },
  state: {
    list: states
  },
  plan: {
    list: ['individual']
  }
}

export default fields;
