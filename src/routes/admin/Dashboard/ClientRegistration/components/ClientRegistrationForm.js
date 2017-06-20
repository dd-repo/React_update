import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import { connect } from 'routes/routedComponent';
import { checkValidation } from 'utils/formHelpers';
import formFields from 'consts/data/formFields';
import {
    FormGroup,
    FormControl,
    Col,
    Row,
    ControlLabel,
    Divider
} from 'components';

const fieldsToOmit = [
  //'kwFirstName',
  //'kwLastName',
  'authnetId'
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
            <Divider>
            <h4 className="m-l-2">
              Client Info
          </h4>
        </Divider>
            <FormGroup controlId="formSizingColumn">
              <Col lg={12}>
                <Row>
                  <Col sm={ 6 }>
                    {renderField(formFields.firstName)}
                  </Col>
                  <Col sm={ 6 }>
                    {renderField(formFields.lastName)}
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
                    {renderField(formFields.phoneNumber)}
                  </Col>
                </Row>
              </Col>
            </FormGroup>
            <FormGroup controlId="formSizingColumn">
              <Col sm={12}>
                <Row>
                  <Col sm={6}>
                    {renderField(formFields.authnetId)}
                  </Col>
                </Row>
              </Col>
            </FormGroup>
          </Row>
        <Row>
          <Divider>
            <h4 className="m-l-2">
              Plan
            </h4>
          </Divider>
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
          <Divider>
            <h4 className="m-l-2">
              Credit Card
            </h4>
          </Divider>
          <FormGroup controlId="formSizingColumn">
            <Col sm={12}>
              <Row>
                <Col sm={ 6 }>
                  {renderField(formFields.fullName)}
                </Col>
                <Col sm={ 6 }>
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
          <Divider>
            <h4 className="m-l-2">
              Billing Address
            </h4>
          </Divider>
          <FormGroup controlId='formSizingColumn'>
            <Col lg={12}>
              <Row>
                <Col sm={12}>
                  {renderField(formFields.address)}
                </Col>
              </Row>
            </Col>
          </FormGroup>
          <FormGroup controlId='formSizingColumn'>
            <Col lg={12}>
              <Row>
                <Col sm={6}>
                  {renderField(formFields.city)}
                </Col>
                <Col sm={6}>
                  {renderField(formFields.zipcode)}
                </Col>
              </Row>
            </Col>
          </FormGroup>
          <FormGroup controlId='formSizingColumn'>
            <Col className='p-b-3' lg={12}>
              <Row>
                <Col sm={6}></Col>
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
        <Row>
          <Divider>
            <h4 className="m-l-2">
              Keywords
            </h4>
          </Divider>
          <FormGroup controlId="formSizingColumn">
            <Col sm={12}>
              <Row>
                <Col sm={ 6 }>
                  {renderField(formFields.kwFirstName)}
                </Col>
                <Col sm={ 6 }>
                  {renderField(formFields.kwLastName)}
                </Col>
              </Row>
            </Col>
          </FormGroup>
          <FormGroup controlId="formSizingColumn">
            <Col sm={12}>
              <Row>
                <Col sm={ 6 }>
                  {renderField(formFields.kwAddress)}
                </Col>
                <Col sm={ 6 }>
                  {renderField(formFields.kwCity)}
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
                    name='kwState'
                    component={dropDownSelect}
                  />
                </Col>
                <Col sm={ 4 }>
                  {renderField(formFields.kwZipcode)}
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


