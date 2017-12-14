import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'

import { ReduxFormInput } from 'components/Forms/components'
import { checkValidation } from 'utils/formHelpers'
import formFields from 'consts/formFields'

const validate = values => {
  return checkValidation(values, formFields)
}

const LoginForm = ({ submitForm, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <ReduxFormInput field={formFields.email} />
      <ReduxFormInput field={formFields.password} />
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

export default reduxForm({
  form: 'loginForm',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(LoginForm)
