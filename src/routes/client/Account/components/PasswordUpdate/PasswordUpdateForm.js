import React, { PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { reduxForm, Field } from 'redux-form';

import { checkValidation, confirmPassword } from 'utils/formHelpers';
import {
  Panel,
  FormGroup,
  Form,
  Col,
  ControlLabel,
  FormControl,
  Button
} from 'components';
import classes from './styles.scss';

const fields = {
  oldPassword: {
    name: 'oldPassword',
    type: 'password',
    label: 'Old Password',
    maxLength: '25',
    klass: 'form-control'
  },
  newPassword: {
    name: 'password',
    type: 'password',
    label: 'New Password',
    maxLength: '25',
    klass: 'form-control'
  },
  passwordConfirmation: {
    name: 'passwordConfirmation',
    type: 'password',
    label: 'Password Confirmation',
    klass: 'form-control',
    normalize: confirmPassword
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

const PasswordUpdateForm = ({
  onSubmit,
  handleSubmit,
  submitting,
  invalid,
  passwordErrorMsg,
}) => {

  return (
    <Panel
      className='m-b-2'
      header={
        <h4 className='panel-title'>
          Change Password
        </h4>
        }
        >

        <Form onSubmit={handleSubmit(onSubmit)} horizontal>
          <FormGroup className='m-r-2 m-l-2'>
            <label>
              New Password
            </label>
            {renderField(fields.newPassword)}
          </FormGroup>
          <FormGroup className='m-r-2 m-l-2'>
            <label>
              Confirm New Password
            </label>
            {renderField(fields.passwordConfirmation)}
            <span className='text-danger'>{passwordErrorMsg}</span>
          </FormGroup>
          <FormGroup className='m-r-2 m-l-2'>
            <button
              className={`${classes.buttonClean} m-r-1 btn-primary btn`}
              disabled={invalid || submitting}
              action='submit'
            >
              Update Password
            </button>
          </FormGroup>
        </Form>
      </Panel>
  )
}

PasswordUpdateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  passwordErrorMsg: PropTypes.string,
}

export default reduxForm({
  form: 'updatePasswordForm',
  validate
})(PasswordUpdateForm);
