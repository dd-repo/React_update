import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form';
import { actions } from 'redux';
console.log('actions', actions)

import { connect } from 'routes/routedComponent';
import { checkValidation } from 'utils/formHelpers';
import {
    Form,
    FormGroup,
} from 'components';

const fields = {
  password: {
    name: 'password',
    type: 'password',
    label: 'password',
    maxLength: '25',
    klass: 'form-control'
  },
  passwordConfirmation: {
    name: 'passwordConfirmation',
    type: 'password',
    label: 'Password Confirmation',
    klass: 'form-control',
  }
}

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

  let message = touched && (error && <span className='text-danger'><strong>Opps!</strong> {error}</span>)
  let validationState = touched && ( error && 'error') || null

  return (
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
}

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

const CreatePasswordForm = (props) => {
  const {
    submitForm,
    handleSubmit,
    submitting,
    invalid,
    passwordErrorMsg,
    disableButton
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
        className='btn btn-primary m-b-2 pull-right'
        disabled={disableButton || invalid || submitting}
        action="submit"
      >
        Create New Password
      </button>
    </form>
  )
}

CreatePasswordForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  passwordErrorMsg: PropTypes.string,
  disableButton: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'CreatePasswordForm',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(CreatePasswordForm)

