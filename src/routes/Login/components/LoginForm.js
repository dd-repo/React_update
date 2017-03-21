import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import { connect } from 'routes/routedComponent';
import { checkValidation } from 'utils/formHelpers';
import {
    Form,
    FormGroup,
    Checkbox
} from 'components';
import logo from 'static/spin-logo-inverted.png';

const fields = {
  email: {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeHolder: 'Enter your email...',
    klass: 'form-control'
  },
  password: {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeHolder: 'Enter your password...',
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

let LoginForm = ({ submitForm, handleSubmit, invalid, submitting }) => {

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <FormGroup>
        <label>
          Email
        </label>
        {renderField(fields.email)}
      </FormGroup>
      <FormGroup>
        <label>
          Password
        </label>
        {renderField(fields.password)}
      </FormGroup>
      <button
        className='btn btn-primary m-b-2'
        disabled={invalid || submitting}
        action="submit"
      >
        Login
      </button>
    </form>

  )
}

LoginForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
}

LoginForm = reduxForm({
  form: 'loginForm',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(LoginForm)

LoginForm = connect(
  state => ({
    initialValues: state.loggedInUser
  })
)(LoginForm)

export default LoginForm;
