import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form';

import { checkValidation } from 'utils/formHelpers';
import fields from 'consts/formFields';
import {
    Form,
    FormGroup,
    FormControl
} from 'components';

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
      <FormControl {...input}
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
        className='full-width btn btn-primary m-b-2'
        disabled={disableButton || disableButton && invalid || submitting}
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

