import React from 'react';
import { Field } from 'redux-form';
import {
  FormGroup,
  FormControl
} from 'components'

const ReduxFormInput = ({ field }) => {
  const {
    name,
    type,
    label,
    placeHolder,
    maxLength,
    normalize
  } = field

  return (
    <Field
      name={name}
      type={type}
      label={label}
      placeholder={placeHolder}
      component={renderInput}
      normalize={normalize}
      maxLength={maxLength}
    />
  )
}

const renderInput = props => {
  const {
    input,
    label,
    placeholder,
    type,
    maxLength,
    meta: { touched, error, warning }
  } = props

  let message = touched &&
    (
      error && <span className='text-danger'>
        <strong>Opps!</strong> {error}
    </span>
    )
  let validationState = touched && ( error && 'error') || null

  return (
    <FormGroup validationState={validationState}>
      <label>
        { label }
      </label>
      <FormControl {...input}
        placeholder={placeholder}
        maxLength={maxLength}
        type={type} />
      {message}
    </FormGroup>
  )
}

export default ReduxFormInput;
