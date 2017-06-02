import React, { PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { reduxForm, Field } from 'redux-form';

import { checkValidation, confirmPassword } from 'utils/formHelpers';
import {
  FormGroup,
  Form,
  Col,
  ControlLabel,
  FormControl,
  Button
} from 'components';

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

const UpdatePasswordForm = ({
  submitForm,
  handleSubmit,
  submitting,
  invalid,
  passwordErrorMsg,
}) => {

  return (
    <div>
      <Form onSubmit={handleSubmit(submitForm)} horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            New Password
          </Col>
          <Col sm={6}>
            {renderField(fields.newPassword)}
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            Confirm New Password
          </Col>
          <Col sm={6}>
            {renderField(fields.passwordConfirmation)}
          <span className='text-danger'>{passwordErrorMsg}</span>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={3} sm={6}>
            <button
              className='m-r-1'
              disabled={invalid || submitting}
              action='submit'
            >
              Update Password
            </button>

            {/* <LinkContainer to='/forgot-password'>
              <Button bsStyle='link'>
                Forgot Password?
              </Button>
              </LinkContainer> */}
          </Col>
        </FormGroup>
      </Form>
    </div>
  )
}

UpdatePasswordForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  passwordErrorMsg: PropTypes.string,
}

export default reduxForm({
  form: 'updatePasswordForm',
  validate
})(UpdatePasswordForm);
