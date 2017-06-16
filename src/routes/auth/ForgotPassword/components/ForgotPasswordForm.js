import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form';


import { connect } from 'routes/routedComponent';
import { checkValidation } from 'utils/formHelpers';
import fields from 'consts/data/formFields';
import {
    Form,
    FormGroup,
    FormControl
} from 'components';

const validate = values => {
  return checkValidation(values, fields)
}

const renderInput = ({ input, placeHolder, type, maxLength, field, meta: { touched, error, warning } }) => (
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

const ForgotPasswordForm = (props) => {
  const {
    submitForm,
    handleSubmit,
    invalid,
    submitting
  } = props

  const email = fields.email

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <FormGroup>
        <label>
         Email
        </label>
        <Field
          name={email.name}
          type={email.type}
          component={renderInput}
          placeHolder={email.placeHolder}
          label={email.label}
          normalize={email.normalize}
        />
      </FormGroup>
      <button
        className='full-width btn btn-primary m-b-2'
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
  form: 'forgotPasswordForm',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(ForgotPasswordForm)
