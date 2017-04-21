import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import { connect } from 'routes/routedComponent';
import {
  checkValidation,
  normalizePhone,
  normalizeExDate,
  normalizeCreditCard,
  normalizeDate,
  normalizeNums
} from 'utils/formHelpers';
import {
    FormGroup,
    FormControl,
    Col,
    Row,
    ControlLabel
} from 'components';
import states from 'utils/states';

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
  cc_first_name: {
    name: 'first_name',
    type: 'text',
    label: 'First name',
  },
  cc_last_name: {
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
  },
  address: {
    name: 'address',
    type: 'text',
    label: 'Street Address',
  },
  city: {
    name: 'city',
    type: 'text',
    label: 'City / Town',
  },
  zipcode: {
    name: 'zipcode',
    type: 'text',
    label: 'Zipcode',
    normalize: normalizeNums,
    maxLength: 5
  },
  dob: {
    name: 'dob',
    type: 'text',
    label: 'MM / DD / YYYY',
    normalize: normalizeDate
  },
}

const dropDownSelect = ({ input }) => (
  <FormControl {...input} componentClass='select'>
    <option value=''>Select a state...</option>
    {states.map(state =>
                <option value={state} key={state}>{state}</option>
                )
    }
  </FormControl>
)

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

  let message = touched &&
    (
      error &&
        <span className='text-danger'>
          <strong>
            Opps!
        </strong>
        {error}
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
  const {
    name,
    type,
    label,
    maxLength,
    normalize
  } = props

  return (
    <Field
      name={name}
      type={type}
      label={label}
      component={renderInput}
      normalize={normalize}
      maxLength={maxLength}
    />
  )
}

let ClientSignupForm = (props) => {
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
    <Row>
      <Col lg={ 12 }>

        <form onSubmit={handleSubmit(submitForm)}>

          <Row>
            <h4 className="m-l-2">
              Client Info
            </h4>
          <FormGroup controlId="formSizingColumn">
            <Col lg={12}>
              <Row>
                <Col sm={ 6 }>
                  {renderField(fields.first_name)}
                </Col>
                <Col sm={ 6 }>
                  {renderField(fields.last_name)}
                </Col>
              </Row>
            </Col>
          </FormGroup>
          <FormGroup controlId="formSizingColumn">
            <Col sm={12}>
              <Row>
                <Col sm={ 6 }>
                  {renderField(fields.email)}
                </Col>
                <Col sm={ 6 }>
                  {renderField(fields.phoneNumber)}
                </Col>
              </Row>
            </Col>
          </FormGroup>
        </Row>
        <Row>
            <h4 className="m-l-2">
              Payment Info
            </h4>
          <FormGroup controlId="formSizingColumn">
            <Col sm={12}>
              <Row>
                <Col sm={ 6 }>
                  {renderField(fields.first_name)}
                </Col>
                <Col sm={ 6 }>
                  {renderField(fields.last_name)}
                </Col>
              </Row>
            </Col>
          </FormGroup>
          <FormGroup controlId="formSizingColumn">
            <Col sm={12}>
              <Row>
                <Col sm={ 4 }>
                  {renderField(fields.creditCardNumber)}
                </Col>
                <Col sm={ 4 }>
                  {renderField(fields.expirationDate)}
                </Col>
                <Col sm={ 4 }>
                  {renderField(fields.cvCode)}
                </Col>
              </Row>
            </Col>
          </FormGroup>
        </Row>

        <Row>
          <h4 className="m-l-2">
            Keywords
          </h4>
          <FormGroup controlId="formSizingColumn">
            <Col sm={12}>
              <Row>
                <Col sm={ 6 }>
                  {renderField(fields.address)}
                </Col>
                <Col sm={ 6 }>
                  {renderField(fields.city)}
                </Col>
              </Row>
            </Col>
          </FormGroup>
          <FormGroup controlId="formSizingColumn">
            <Col sm={12}>
              <Row>
                <Col sm={ 4 }>
                  <label>
                    State
                  </label>
                  <Field
                    name='state'
                    component={dropDownSelect}
                  />
                </Col>
                <Col sm={ 4 }>
                  {renderField(fields.zipcode)}
                </Col>
                <Col sm={ 4 }>
                  {renderField(fields.dob)}
                </Col>
              </Row>
            </Col>
          </FormGroup>
        </Row>

          <button
            className='btn btn-primary btn-lg pull-right m-b-2'
            disabled={invalid || submitting}
            action="submit"
          >
            Register Client
          </button>
        </form>
      </Col>
    </Row>
  )
}

ClientSignupForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

ClientSignupForm = reduxForm({
  form: 'ClientSignupForm',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(ClientSignupForm)

export default connect()(ClientSignupForm)


