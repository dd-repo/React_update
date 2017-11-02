import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import _ from 'lodash'

import fields from 'consts/formFields'
import {
  FormGroup,
  FormControl
} from 'components'

const formFields = [ 'email', 'password' ]
const loginFormFields = _.pick(fields, formFields)

const validate = values => {
  const errors = {}
  _.each(fields, (type, field) => {
    if (!values[field]) {
      errors[field] = `Please enter your ${type.label}`
    }
  })
  return errors
}

const renderInput = ({ label, input, placeHolder, type, maxLength, meta: { touched, error, warning } }) => {
  let message = touched && (error && <span className='text-danger'><strong>Opps!</strong> {error}</span>)
  let validationState = touched && (error && 'error') || null

  return (
    <FormGroup validationState={validationState}>
      <label>
        {label}
      </label>
      <FormControl {...input}
        placeholder={placeHolder}
        maxLength={maxLength}
        type={type} />
      {message}
    </FormGroup>
  )
}

const renderFields = () => {
  const fieldKeys = Object.keys(loginFormFields)
  return fieldKeys.map(function (key, i) {
    const { name, type, placeHolder, label, normalize } = fields[key]
    return (
      <Field
        key={i}
        name={name}
        type={type}
        component={renderInput}
        placeHolder={placeHolder}
        label={label}
        normalize={normalize}
      />
    )
  })
}

let LoginForm = ({ submitForm, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit(submitForm)}>

      {renderFields()}

      <button
        className='full-width btn btn-primary m-b-2'
        action="submit"
      >
        Login
      </button>
    </form>

  )
}

LoginForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func
}

LoginForm = reduxForm({
  form: 'loginForm',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(LoginForm)

export default LoginForm
