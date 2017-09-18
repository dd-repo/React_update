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
    type: 'text',
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
    placeHolder: 'Enter Name On Card...',
    errorMessage: 'Please enter the full name...',
    label: 'Name on Card',
  },
  creditCardNumber: {
    name: 'creditCardNumber',
    type: 'text',
    label: 'Credit Card Number',
    placeHolder: 'Enter Your Credit Card Number...',
    errorMessage: 'Please enter your Credit Card Number',
    normalize: normalizeCreditCard
  },
  expirationMonth: {
    name: 'expirationMonth',
    type: 'select',
    label: 'Expiration',
    placeHolder: 'Select Month...',
    list: Array.from((function*(){
      for(let i = 1; i <= 12; i++)
      yield { value: i, label: i };
    }) ()),
    errorMessage: 'Please enter Expiration Month',
    normalize: normalizeExDate
  },
  expirationYear: {
    name: 'expirationYear',
    type: 'select',
    placeHolder: 'Select Year...',
    errorMessage: 'Please enter Expiration Year',
    list: Array.from((function*(){
      for(let i = 0; i < 10; i++) {
        let date = new Date().getFullYear() + i
        yield {value: date, label: date};
      }
    }) ())
  },
  cvCode: {
    name: 'cvCode',
    type: 'text',
    label: 'CVC',
    placeHolder: 'Enter CVC Code...',
    errorMessage: 'Please enter your Credit Card CVC Number',
    maxLength: '4',
    normalize: normalizeNums
  },
  address: {
    name: 'address',
    type: 'text',
    label: 'Street Address',
    placeHolder: 'Enter Billing Street Address...',
    errorMessage: 'Please enter a Street Address'
  },
  state: {
    name: 'state',
    placeHolder: 'Select State...',
    errorMessage: 'Please select a State',
    list: states
  },
  city: {
    name: 'city',
    type: 'text',
    label: 'City / Town',
    placeHolder: 'Enter Billing City/Town...',
    errorMessage: 'Please enter a City or Town'
  },
  zipcode: {
    name: 'zipcode',
    type: 'text',
    label: 'Zipcode',
    normalize: normalizeNums,
    placeHolder: 'Enter Your Billing Zipcode...',
    errorMessage: 'Please enter a Zipcode',
    maxLength: 5
  },
  kwFirstName: {
    name: 'kwFirstName',
    type: 'text',
    placeHolder: 'Enter First Name...',
    label: 'First Name',
    errorMessage: 'Please enter a First Name'
  },
  kwLastName: {
    name: 'kwLastName',
    type: 'text',
    placeHolder: 'Enter Last Name...',
    label: 'Last Name',
    errorMessage: 'Please enter a Last Name'
  },
  kwAddress: {
    name: 'kwAddress',
    type: 'text',
    placeHolder: 'Enter Street Address...',
    label: 'Street Address',
    errorMessage: 'Please enter a Street Address'
  },
  kwCity: {
    name: 'kwCity',
    type: 'text',
    placeHolder: 'Enter City/State...',
    label: 'City / Town',
    errorMessage: 'Please enter a City or Town'
  },
  kwZipcode: {
    name: 'kwZipcode',
    type: 'text',
    label: 'Zipcode',
    placeHolder: 'Enter Zipcode...',
    normalize: normalizeNums,
    errorMessage: 'Please enter a Zipcode',
    maxLength: 5
  },
  dob: {
    name: 'dob',
    type: 'text',
    label: 'Date of Birth',
    placeHolder: 'Enter DOB...',
    errorMessage: 'Please enter a Date of Birth',
    normalize: normalizeDate
  },
  kwState: {
    name: 'kwState',
    list: states,
    placeHolder: 'Select State...',
    errorMessage: 'Please select a State'
  },
  plan: {
    name: 'plan',
    list: [{value: 'individual', label: 'individual'}, {value: '6-months', label: '6-months'}, {value: '1-year', label: '1-year' }, {value: 'testing', label: 'testing'}]
  },
  status: {
    name: 'is_active',
    list: [
      { label: 'Active', value: true },
      { label: 'Inactive', value: false }
    ]
  },
  role: {
    name: 'role',
    list: [
      { label: 'user', value: 'user'},
      { label: 'manager', value: 'manager'},
      { label: 'admin', value: 'admin'},
      { label: 'super admin', value: 'super_admin'},
    ]
  }
}

export default fields;
