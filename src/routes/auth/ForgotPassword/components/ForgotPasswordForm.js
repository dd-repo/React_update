import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form';


import { connect } from 'routes/routedComponent';
import { checkValidation } from 'utils/formHelpers';
import {
    Form,
    FormGroup,
} from 'components';

const fields = {
  email: {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeHolder: 'Enter your email...',
    klass: 'form-control'
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
       (error && <span className='text-danger'>{error}</span>)
         || (warning && <span>{warning}</span>)
      )
    }
  </div>
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

const ForgotPasswordForm = ({ submitForm, handleSubmit, invalid, submitting }) => {
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <FormGroup>
        <label>
         Email
        </label>
        {renderField(fields.email)}
      </FormGroup>
      <button
        className='btn btn-primary m-b-2 pull-right'
        disabled={invalid || submitting}
        action="submit"
      >
        Reset Your Password
      </button>
    </form>
  )
}

ForgotPasswordForm.propTypes = {
  submitForm: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'signupForm',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(ForgotPasswordForm)
