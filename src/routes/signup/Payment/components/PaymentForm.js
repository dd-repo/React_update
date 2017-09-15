import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Loading from 'react-loading';

import fields from 'consts/formFields';
import { checkValidation } from 'utils/formHelpers';
import {
  FormGroup,
  FormControl,
  Col,
  Row,
  Divider
} from 'components';

const validate = values => {
  return checkValidation(values, fields)
}
const renderInput = (props) => {
  const {
    input,
    label,
    placeHolder,
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
          {label}
        </label>
      <FormControl {...input}
        placeholder={placeHolder}
        maxLength={maxLength}
        type={type} />
      {message}
      </FormGroup>
  )
}


const renderField = (props) => {
  const { name, type, placeHolder, label, maxLength, normalize } = props
  return (
    <Field
      name={name}
      type={type}
      maxLength={maxLength}
      component={renderInput}
      label={label}
      normalize={normalize}
    />
  )
}


const renderErrorMessage = (error) => (
  <p className="alert-danger">
    {error}
  </p>
)

const dropDownSelect = ({ input }) => {
  const { name } = input
  const list = fields[[name]].list

  return (
    <FormControl {...input} componentClass='select'>
      <option value=''>Select a {name}...</option>
      {list.map(state =>
                <option value={state} key={state}>{state}</option>
                )
      }
    </FormControl>
  )
}

let PaymentForm = (props) => {
  const {
    submitForm,
    errorMessage,
    planType,
    price,
    handleSubmit,
    invalid,
    submitting,
    isFetching
  } = props

  const renderButtonLabel = (
    isFetching ?
      "Submitting Subscription..."
        :
          props.buttonLabel
  )

 return(
    <form onSubmit={handleSubmit(submitForm)}>
      <Row>
      <Divider>
        <h4 className='m-l-2'>
          Credit Card
        </h4>
      </Divider>
        <FormGroup controlId='formSizingColumn'>
          <Col lg={12}>
            <Row>
              <Col sm={6}>
                {renderField(fields.fullName)}
              </Col>
              <Col sm={6}>
                {renderField(fields.creditCardNumber)}
              </Col>
            </Row>
          </Col>
        </FormGroup>
        <FormGroup controlId='formSizingColumn'>
          <Col lg={12}>
            <Row>
              <Col sm={6}>
                {renderField(fields.expirationDate)}
              </Col>
              <Col sm={6}>
                {renderField(fields.cvCode)}
              </Col>
            </Row>
          </Col>
        </FormGroup>
      </Row>
      <Row>
      <Divider>
        <h4 className='m-l-2'>
          Billing Address
        </h4>
      </Divider>
        <FormGroup controlId='formSizingColumn'>
          <Col lg={12}>
            <Row>
              <Col sm={8}>
                {renderField(fields.address)}
              </Col>
              <Col sm={4}>
                {renderField(fields.city)}
              </Col>
            </Row>
          </Col>
        </FormGroup>
        <FormGroup controlId='formSizingColumn'>
          <Col lg={12}>
            <Row>
              <Col sm={6}>
                {renderField(fields.zipcode)}
              </Col>
                <Col sm={6}>
                  <label>
                    State
                  </label>
                  <Field
                    name='state'
                    component={dropDownSelect}
                  />
                </Col>
            </Row>
          </Col>
        </FormGroup>
      </Row>
      <p>
        All major credit cards are accepted through a secure payment process
      </p>
      <button className="full-width btn btn-success"
        disabled={invalid || submitting}
        action="submit">
          { renderButtonLabel }
      </button>
    </form>
  )
}

PaymentForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
}

PaymentForm.defaultProps = {
  buttonLabel: 'Start Subscription',
}

PaymentForm = reduxForm({
  form: 'payment',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(PaymentForm);

export default PaymentForm;
