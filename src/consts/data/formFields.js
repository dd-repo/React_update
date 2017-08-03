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
  firstName: {
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    errorMessage: 'Please enter your First Name',
    placeHolder: 'Enter your first name...',
  },
  lastName: {
    name: 'lastName',
    type: 'text',
    label: 'Last Name',
    errorMessage: 'Please enter your Last Name',
    placeHolder: 'Enter your last name',
  },
  email: {
    name: 'email',
    type: 'email',
    label: 'Email',
    errorMessage: 'Please enter your Email Address',
    placeHolder: 'Enter your email...',
  },
  password: {
    name: 'password',
    type: 'password',
    label: 'Password',
    errorMessage: 'Please enter a Password',
    placeHolder: 'Enter a password...',
    maxLength: '25',
  },
  passwordConfirmation: {
    name: 'passwordConfirmation',
    type: 'password',
    label: 'Password Confirmation',
    errorMessage: 'Please confirm your Password',
    placeHolder: 'Re-enter password...',
  },
  phoneNumber: {
    name: 'phoneNumber',
    type: 'tel',
    label: 'Phone Number',
    errorMessage: 'Please enter your Phone Number',
    placeHolder: 'Enter your phone number...',
    normalize: normalizePhone
  },
  authnetId: {
    name: 'authnetId',
    type: 'text',
    label: 'Authnet Id',
    placeHolder: 'Enter clients authroize.net id...'
  },
  fullName: {
    name: 'fullName',
    type: 'text',
    errorMessage: 'Please enter the full name...',
    label: 'Name on Card',
  },
  creditCardNumber: {
    name: 'creditCardNumber',
    type: 'text',
    label: 'Credit Card Number',
    errorMessage: 'Please enter your Credit Card Number',
    normalize: normalizeCreditCard
  },
  expirationDate: {
    name: 'expirationDate',
    type: 'text',
    label: 'Expiration',
    errorMessage: 'Please enter your Credit Card Expiration Date',
    normalize: normalizeExDate
  },
  cvCode: {
    name: 'cvCode',
    type: 'text',
    label: 'CVC',
    errorMessage: 'Please enter your Credit Card CVC Number',
    maxLength: '4',
    normalize: normalizeNums
  },
  address: {
    name: 'address',
    type: 'text',
    label: 'Street Address',
    errorMessage: 'Please enter a Street Address'
  },
  state: {
    list: states
  },
  city: {
    name: 'city',
    type: 'text',
    label: 'City / Town',
    errorMessage: 'Please enter a City or Town'
  },
  zipcode: {
    name: 'zipcode',
    type: 'text',
    label: 'Zipcode',
    normalize: normalizeNums,
    errorMessage: 'Please enter a Zipcode',
    maxLength: 5
  },
  kwFirstName: {
    name: 'kwFirstName',
    type: 'text',
    label: 'First Name',
    errorMessage: 'Please enter a First Name'
  },
  kwLastName: {
    name: 'kwLastName',
    type: 'text',
    label: 'Last Name',
    errorMessage: 'Please enter a Last Name'
  },
  kwAddress: {
    name: 'kwAddress',
    type: 'text',
    label: 'Street Address',
    errorMessage: 'Please enter a Street Address'
  },
  kwCity: {
    name: 'kwCity',
    type: 'text',
    label: 'City / Town',
    errorMessage: 'Please enter a City or Town'
  },
  kwZipcode: {
    name: 'kwZipcode',
    type: 'text',
    label: 'Zipcode',
    normalize: normalizeNums,
    errorMessage: 'Please enter a Zipcode',
    maxLength: 5
  },
  dob: {
    name: 'dob',
    type: 'text',
    label: 'Date of Birth',
    errorMessage: 'Please enter a Date of Birth',
    normalize: normalizeDate
  },
  kwState: {
    list: states
  },
  plan: {
    list: ['individual', '6-months', '1-year', 'testing']
  }
}

export default fields;
