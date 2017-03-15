import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
//import { connect } from 'react-redux';
import { connect } from 'routes/routedComponent';
import _ from 'lodash';

import { checkValidation, normalizePhone } from 'utils/formHelpers';

const fields = {
  first_name: {
    name: 'first_name',
    type: 'text',
    label: 'First name',
    klass: 'form-control input-group-lg reg_name'
  },
  last_name: {
    name: 'last_name',
    type: 'text',
    label: 'Last name',
    klass: 'form-control input-group-lg reg_name'
  },
  email: {
    name: 'email',
    type: 'email',
    label: 'Email',
    klass: 'form-control'
  },
  phoneNumber: {
    name: 'phone_number',
    type: 'tel',
    label: 'Phone number',
    klass: 'form-control',
    normalize: normalizePhone
  },
  password: {
    name: 'password',
    type: 'password',
    label: 'Password',
    klass: 'form-control',
    maxLength: '25',
  }
}
const validate = values => {
  return checkValidation(values, fields)
}

const renderInput = ({ input, label, type, maxLength, field, meta: { touched, error, warning } }) => (
  <div>
    <input {...input}
      className={field}
      placeholder={label}
      maxLength={maxLength}
      type={type} />
    {
      touched &&
      (
       (error && <span className='alert-danger'>{error}</span>)
         || (warning && <span>{warning}</span>)
      )
    }
  </div>
)

const renderCheckbox = ({ type, value, meta: {touched, error, warning} }) => (
  <input type={type} required='true' />
)

const renderField = ({ klass, name, type, label, maxLength, normalize }) => (
    <Field
      field={klass}
      name={name}
      type={type}
      component={renderInput}
      label={label}
      normalize={normalize}
    />
)

let SignupForm = ({ planType, price, errorMessage, submitForm, handleSubmit, invalid, submitting }) => {

  const renderErrorMessage = (
    <p className="alert-danger">
      {errorMessage}
    </p>
  )

    return (
      <div className="row">
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="col-xs-12 col-sm-6 col-md-8 pricing-left">

          {renderErrorMessage}

          <p className="textreg">
            <strong>Individual to Protect:</strong>
          </p>

          <div className="row">
            <div className="form-group col-sm-12">
              <div className="col-sm-6">
                {renderField(fields.first_name)}
              </div>

              <div className="col-sm-6">
                {renderField(fields.last_name)}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-sm-12">
              <div className="col-sm-6">
                {renderField(fields.email)}
              </div>

              <div className="col-sm-6">
                {renderField(fields.phoneNumber)}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-sm-12">
              <div className="col-sm-12">
                {renderField(fields.password)}
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="checkbox">
              <label>
                <Field name='terms'
                  type="checkbox"
                  component={renderCheckbox}
                />
                I agree to the above conditions and to the
                <a href="/terms-of-condition/"
                  target="_blank">
                  Terms of Service
                </a>
              </label>
            </div>
          </div>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-4 pricing-right">
          <img src={logoOnly} className="hidden-xs" alt='Marca logo' />
          <p className="info">{planType}</p>
          <p className="price-dollar">
            <strong>$ {price}</strong>/month
          </p>
          <button
            className="btn btn-info"
            disabled={invalid || submitting}
            action="submit">
            Create My Account
          </button>
        </div>
      </form>

      <p className="information"> Your Blitz membership will begin when you click Start Free Trial. To cancel, send an email to help@internetreputation.com. Your membership will automatically end at the completion of the seventh day of service, unless you choose to extend it. See
        <a href="/terms-of-condition/"
          target="_blank">
          Terms of Use
        </a>
        for more details.
      </p>
    </div>
  )
}

SignupForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  planType: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
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
