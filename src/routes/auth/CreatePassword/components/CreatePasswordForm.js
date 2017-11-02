import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import { checkValidation } from 'utils/formHelpers'
import fields from 'consts/formFields'
import {
    FormGroup,
    FormControl
} from 'components'

const validate = values => {
  return checkValidation(values, fields)
}

const renderInput = (props) => {
  const {
    input,
    placeHolder,
    type,
    maxLength,
    field,
    meta: { touched, error, warning }
  } = props

  return (
    <div>
      <FormControl {...input}
        className={field}
        placeholder={placeHolder}
        maxLength={maxLength}
        type={type} />
      {
        touched &&
          (
            (error && <span className='text-danger'>{error}</span>) ||
            (warning && <span>{warning}</span>)
          )
      }
    </div>
  )
}

const renderField = ({ name, type, placeHolder, label, maxLength, normalize }) => (
  <Field
    name={name}
    type={type}
    component={renderInput}
    placeHolder={placeHolder}
    label={label}
    normalize={normalize}
  />
)

const CreatePasswordForm = (props) => {
  const {
    submitForm,
    passwordErrorMsg,
    handleSubmit,
    submitting,
    invalid
  } = props

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <FormGroup>
        <label>
          Password
        </label>
        {renderField(fields.password)}
      </FormGroup>
      <FormGroup>
        <label>
          Password Confirmation
        </label>
        {renderField(fields.passwordConfirmation)}
        <span className='text-danger'>{passwordErrorMsg}</span>
      </FormGroup>
      <button
        className='full-width btn btn-primary m-b-2'
        disabled={invalid || submitting}
        action="submit"
      >
        Create New Password
      </button>
    </form>
  )
}

CreatePasswordForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  passwordErrorMsg: PropTypes.string
}

export default reduxForm({
  form: 'CreatePasswordForm',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(CreatePasswordForm)
