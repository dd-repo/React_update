import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import { connect } from 'routes/routedComponent';
import {
  checkValidation,
  normalizeCreditCard,
  normalizeExDate,
  normalizeNums
} from 'utils/formHelpers.js';
import { FormGroup } from 'components';
import logo from 'static/spin-logo-inverted.png';
import classes from './payment.scss';

const fields = {
  first_name: {
    name: 'first_name',
    type: 'text',
    label: 'First name',
  },
  last_name: {
    name: 'last_name',
    type: 'text',
    label: 'Last name',
  },
  creditCardNumber: {
    name: 'creditCardNumber',
    type: 'text',
    label: 'Valid card number',
    normalize: normalizeCreditCard
  },
  expirationDate: {
    name: 'expirationDate',
    type: 'text',
    label: 'MM/YYY',
    normalize: normalizeExDate
  },
  cvCode: {
    name: 'cvCode',
    type: 'text',
    label: 'CVC',
    maxLength: '3',
    normalize: normalizeNums
  }
}

const validate = values => {
  return checkValidation(values, fields)
}
const renderInput = ({ input, label, type, maxLength, field, meta: { touched, error, warning } }) => {
  return (
    <div>
      <input {...input}
        className='form-control input-group-lg reg_name'
        placeholder={label}
        maxLength={maxLength}
        type={type}/>
      {warning && <span>{warning}</span>}
      {touched && ((error && <span className='alert-danger'>{error}</span>) )}
    </div>
  )
}

const renderField = ({ klass, name, type, label, maxLength, normalize }) => (
    <Field
      field={klass}
      name={name}
      type={type}
      maxLength={maxLength}
      component={renderInput}
      label={label}
      normalize={normalize}
    />
  )
const renderErrorMessage = (error) => (
    <p className="alert-danger">
      {error}
    </p>
)

let PaymentForm = ({ submitForm, errorMessage, planType, price, handleSubmit, invalid, submitting }) => {
 return(
    <form onSubmit={handleSubmit(submitForm)}>
      <FormGroup>
        <label>
          First Name
        </label>
        {renderField(fields.first_name)}
      </FormGroup>
      <FormGroup>
        <label>
          Last Name
        </label>
        {renderField(fields.last_name)}
      </FormGroup>
      <FormGroup>
        <label>
          Credit Card Number
        </label>
        {renderField(fields.creditCardNumber)}
      </FormGroup>
      <FormGroup>
        <label>
          Expiration Date
        </label>
        {renderField(fields.expirationDate)}
      </FormGroup>
      <FormGroup>
        <label>
          CVC
        </label>
        {renderField(fields.cvCode)}
      </FormGroup>
      <p>
        All major credit cards are accepted through a secure payment process
      </p>
      <button className="btn btn-success"
        disabled={invalid || submitting}
        action="submit">
        Start Subscription
      </button>
    </form>
  )
}

PaymentForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  planType: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}

PaymentForm = reduxForm({
  form: 'payment',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(PaymentForm);

PaymentForm = connect(
  state => ({
    initialValues: state.payment
  })
)(PaymentForm);

export default PaymentForm;
