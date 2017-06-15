import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import { connect } from 'routes/routedComponent';
import { checkValidation } from 'utils/formHelpers';
import {
    FormGroup,
    FormControl,
    Col,
    Row,
    ControlLabel
} from 'components';

import formFields from 'consts/data/formFields';


const fieldsToOmit = [
  //'kw_first_name',
  //'kw_last_name',
  'authnet_id'
]

const validate = values => {
  return checkValidation(values, formFields, fieldsToOmit)
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
          <strong> Opps!  </strong> {error}
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

const dropDownSelect = ({ input }) => {
  const { name } = input
  const list = formFields[[name]].list

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

let ClientRegistrationForm = (props) => {

  const {
    isFetching,
    submitForm,
    type,
    handleSubmit,
    invalid,
    submitting,
    initialValues
  } = props

  const renderbuttonLabel = (
    !isFetching ?
      'Registar Client'
        :
          'Registering Client...'
  )

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
                  {renderField(formFields.first_name)}
                </Col>
                <Col sm={ 6 }>
                  {renderField(formFields.last_name)}
                </Col>
              </Row>
            </Col>
          </FormGroup>
          <FormGroup controlId="formSizingColumn">
            <Col sm={12}>
              <Row>
                <Col sm={ 6 }>
                  {renderField(formFields.email)}
                </Col>
                <Col sm={ 6 }>
                  {renderField(formFields.phone_number)}
                </Col>
              </Row>
            </Col>
          </FormGroup>
          <FormGroup controlId="formSizingColumn">
            <Col sm={12}>
              <Row>
                <Col sm={6}>
                  {renderField(formFields.authnet_id)}
                </Col>
              </Row>
            </Col>
          </FormGroup>
        </Row>
        <Row>
          <h4 className="m-l-2">
            Plan
          </h4>
          <FormGroup controlId="formSizingColumn">
            <Col sm={12}>
              <Row>
                <Col sm={ 4 }>
                  <Field
                    name='plan'
                    component={dropDownSelect}
                  />
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
                  {renderField(formFields.cc_first_name)}
                </Col>
                <Col sm={ 6 }>
                  {renderField(formFields.cc_last_name)}
                </Col>
              </Row>
            </Col>
          </FormGroup>
          <FormGroup controlId="formSizingColumn">
            <Col sm={12}>
              <Row>
                <Col sm={ 4 }>
                  {renderField(formFields.creditCardNumber)}
                </Col>
                <Col sm={ 4 }>
                  {renderField(formFields.expirationDate)}
                </Col>
                <Col sm={ 4 }>
                  {renderField(formFields.cvCode)}
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
                  {renderField(formFields.kw_first_name)}
                </Col>
                <Col sm={ 6 }>
                  {renderField(formFields.kw_last_name)}
                </Col>
              </Row>
            </Col>
          </FormGroup>
          <FormGroup controlId="formSizingColumn">
            <Col sm={12}>
              <Row>
                <Col sm={ 6 }>
                  {renderField(formFields.address)}
                </Col>
                <Col sm={ 6 }>
                  {renderField(formFields.city)}
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
                  {renderField(formFields.zipcode)}
                </Col>
                <Col sm={ 4 }>
                  {renderField(formFields.dob)}
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
            { renderbuttonLabel }
          </button>
        </form>
      </Col>
    </Row>
  )
}

ClientRegistrationForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
}

ClientRegistrationForm = reduxForm({
  form: 'ClientRegistrationForm',  // a unique identifier for this form
  validate,           // <--- validation function given to redux-form
})(ClientRegistrationForm)

export default ClientRegistrationForm


