import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import { connect } from 'routes/routedComponent';
import { checkValidation, normalizePhone } from 'utils/formHelpers';
import {
    FormGroup,
    FormControl,
    Checkbox
} from 'components';

const fields = {
  first_name: {
    name: 'first_name',
    type: 'text',
    label: 'First name',
    placeHolder: 'Enter your first name...',
  },
  last_name: {
    name: 'last_name',
    type: 'text',
    label: 'Last name',
    placeHolder: 'Enter your last name',
  },
  email: {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeHolder: 'Enter your email...',
  },
  phoneNumber: {
    name: 'phone_number',
    type: 'tel',
    label: 'Phone number',
    placeHolder: 'Enter your phone number...',
    normalize: normalizePhone
  },
  password: {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeHolder: 'Enter a password...',
    maxLength: '25',
  },
  checkbox: {
    name: 'terms',
    type: 'checkbox',
    value: true
  }
}
const validate = values => {
  return checkValidation(values, fields)
}

const renderInput = (props) => {
  const {
    label,
    input,
    placeHolder,
    type,
    maxLength,
    meta: { touched, error, warning }
  } = props

  let message = touched && (error && <span className='text-danger'><strong>Opps!</strong> {error}</span>)
  let validationState = touched && ( error && 'error') || null
  if(type !== 'checkbox') {
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
  }else{
    return (
      <Checkbox required validationState='error'>
        Accept Terms & Privacy Policy
      </Checkbox>
    )
  }
}

const renderFields = () => {
  const fieldKeys = Object.keys(fields)
  return fieldKeys.map(function(key, i) {
    const { name, type, placeHolder, label, maxLength, normalize, value } = fields[key]
    return (
            <Field
              key={i}
              name={name}
              type={type}
              component={renderInput}
              placeHolder={placeHolder}
              label={label}
              value={value}
              normalize={normalize}
            />
           )
  })
}

let SignupForm = (props) => {
  const {
    planType,
    price,
    errorMessage,
    submitForm,
    handleSubmit,
    invalid,
    submitting
  } = props

  return (
    <form onSubmit={handleSubmit(submitForm)}>

      {renderFields()}

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
