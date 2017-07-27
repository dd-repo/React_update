import React from 'react'

import {
  FormGroup,
  FormControl,
} from 'components';
import './feedback.scss'

const ReduxFormInput = (props) => {
  const {
    label,
    input,
    placeHolder,
    type,
    maxLength,
    componentClass,
    className,
    height,
    meta: { touched, error, warning }
  } = props

  let message = touched && (error && <span className='text-danger'><strong>Opps!</strong> {error}</span>)
  let validationState = touched && ( error && 'error') || null
  return (
    <FormGroup validationState={validationState}>
      <label>
        {label}
      </label>
      <FormControl {...input}
        style={{height}}
        componentClass={componentClass}
        placeholder={placeHolder}
        maxLength={maxLength}
        type={type}
      />
      {message}
    </FormGroup>
  )
}

export default ReduxFormInput;

