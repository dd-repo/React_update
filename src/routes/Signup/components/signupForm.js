import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';

import { connect } from 'routes/routedComponent';
import { checkValidation, normalizePhone } from 'utils/formHelpers';
import {
    Form,
    FormGroup,
    FormControl,
    Checkbox,
    Alert
} from 'components';

const fields = {
  first_name: {
    name: 'first_name',
    type: 'text',
    label: 'First name',
    placeHolder: 'Enter your first name...',
    klass: 'form-control input-group-lg reg_name'
  },
  last_name: {
    name: 'last_name',
    type: 'text',
    label: 'Last name',
    placeHolder: 'Enter your last name',
    klass: 'form-control input-group-lg reg_name'
  },
  email: {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeHolder: 'Enter your email...',
    klass: 'form-control'
  },
  phoneNumber: {
    name: 'phone_number',
    type: 'tel',
    label: 'Phone number',
    placeHolder: 'Enter your phone number...',
    klass: 'form-control',
    normalize: normalizePhone
  },
  password: {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeHolder: 'Enter a password...',
    klass: 'form-control',
    maxLength: '25',
  }
}
const validate = values => {
  return checkValidation(values, fields)
}

const renderInput = ({ label, input, placeHolder, type, maxLength, field, meta: { touched, error, warning } }) => {

  let message = touched && (error && <span className='text-danger'><strong>Opps!</strong> {error}</span>)
  let validationState = touched && ( error && 'error') || ''

  return (
    <div>
      <FormGroup validationState={validationState}>
        <label>
          {label}
        </label>
      <FormControl {...input}
        className={field}
        placeholder={placeHolder}
        maxLength={maxLength}
        type={type} />
      {message}
      </FormGroup>
    </div>
  )
}

const renderCheckbox = ({ type, value, meta: {touched, error, warning} }) => {
  return (
    <Checkbox validationState='error'>
      Accept Terms & Privacy Policy
    </Checkbox>
  )
}

let SignupForm = ({ planType, price, errorMessage, submitForm, handleSubmit, invalid, submitting }) => {
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      { Object.keys(fields).map(function(key) {
        const { klass, name, type, placeHolder, label, maxLength, normalize } = fields[key]
        return <Field
          field={klass}
          name={name}
          type={type}
          component={renderInput}
          placeHolder={placeHolder}
          label={label}
          normalize={normalize}
        />
        })
      }
      { /* <Checkbox validationState='error'>
           Accept Terms & Privacy Policy
           </Checkbox> */ }
           <Field name='terms'
             type="checkbox"
        component={renderCheckbox}
      />
      <button
        className='btn btn-primary m-b-2'
        disabled={invalid || submitting}
        action="submit"
      >
        Register
      </button>
    </form>
  )
}

SignupForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  planType: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  errorMessage: PropTypes.string
}

SignupForm = reduxForm({
  form: 'signupForm',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(SignupForm)

SignupForm = connect(
  state => ({
    initialValues: state.currentUser
  })
)(SignupForm)

export default SignupForm;
