import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import { connect } from 'routes/routedComponent';
import { checkValidation, normalizePhone } from 'utils/formHelpers';
import {
    Form,
    FormGroup,
    Checkbox
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

const renderInput = ({ input, placeHolder, type, maxLength, field, meta: { touched, error, warning } }) => (
  <div>
    <input {...input}
      className={field}
      placeholder={placeHolder}
      maxLength={maxLength}
      type={type} />
    {
      touched &&
      (
       (error && <span className='alert-danger'>{error}</span>)
         || (warning && <span>{warning}</span>)
      )
    }
  </div>
)

const renderCheckbox = ({ type, value, meta: {touched, error, warning} }) => (
  <input type={type} required='true' />
)

const renderField = ({ klass, name, type, placeHolder, label, maxLength, normalize }) => (
    <Field
      field={klass}
      name={name}
      type={type}
      component={renderInput}
      placeHolder={placeHolder}
      label={label}
      normalize={normalize}
    />
)

let SignupForm = ({ planType, price, errorMessage, submitForm, handleSubmit, invalid, submitting }) => {


  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <FormGroup>
        <label>
          First Name
        </label>
        {renderField(fields.first_name)}
      </FormGroup>
      <FormGroup>
        <label>
          Last Name
        </label>
        {renderField(fields.last_name)}
      </FormGroup>
      <FormGroup>
        <label>
          Email
        </label>
        {renderField(fields.email)}
      </FormGroup>
      <FormGroup>
        <label>
          Phone Number
        </label>
        {renderField(fields.phoneNumber)}
      </FormGroup>
      <FormGroup>
        <label>
          Password
        </label>
        {renderField(fields.password)}
      </FormGroup>
      <Checkbox>
        Accept Terms & Privacy Policy
      </Checkbox>
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
