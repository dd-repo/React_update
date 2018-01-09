import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'

import { checkValidation } from 'utils/formHelpers'
import formFields from 'consts/formFields'
import { ReduxFormSelect, ReduxFormInput } from 'components/Forms/components'
import classes from './clientRegistration.scss'
import {
    FormGroup,
    Col,
    Row,
    Divider
} from 'components'

const fieldsToOmit = [
  'authnetId'
]

const validate = values => {
  return checkValidation(values, formFields, fieldsToOmit)
}

let ClientRegistrationForm = (props) => {
  const {
    isFetching,
    submitForm,
    handleSubmit,
    invalid,
    disableButton,
    initialValues
  } = props

  const renderbuttonLabel = (
    !isFetching 
    ? 'Registar Client'
    : 'Registering Client...'
  )

  return (
    <Row>
      <Col lg={12}>
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
                  <Col sm={6}>
                    <ReduxFormInput field={formFields.firstName} />
                  </Col>
                  <Col sm={6}>
                    <ReduxFormInput field={formFields.lastName} />
                  </Col>
                </Row>
              </Col>
            </FormGroup>
            <FormGroup controlId="formSizingColumn">
              <Col sm={12}>
                <Row>
                  <Col sm={6}>
                    <ReduxFormInput field={formFields.email} />
                  </Col>
                  <Col sm={6}>
                    <ReduxFormInput field={formFields.phoneNumber} />
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
                  <Col sm={4}>
                    <ReduxFormSelect field={formFields.plan} />
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
                  <Col sm={6}>
                    <ReduxFormInput field={formFields.fullName} />
                  </Col>
                  <Col sm={6}>
                    <ReduxFormInput field={formFields.creditCardNumber} />
                  </Col>
                </Row>
              </Col>
            </FormGroup>
            <FormGroup controlId="formSizingColumn">
              <Col sm={12}>
                <Row>
                  <Col sm={6}>
                    <label>
                      Expiration
                    </label>
                    <div className={classes.inlineInputs}>
                      <ReduxFormSelect field={formFields.expirationMonth} />
                      <ReduxFormSelect field={formFields.expirationYear} />
                    </div>
                  </Col>
                  <Col sm={6}>
                    <ReduxFormInput field={formFields.cvCode} />
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
                    <ReduxFormInput field={formFields.address} />
                  </Col>
                </Row>
              </Col>
            </FormGroup>
            <FormGroup controlId='formSizingColumn'>
              <Col lg={12}>
                <Row>
                  <Col sm={6}>
                    <ReduxFormInput field={formFields.city} />
                  </Col>
                  <Col sm={3}>
                    <ReduxFormInput field={formFields.zipcode} />
                  </Col>
                  <Col sm={3}>
                    <FormGroup controlId='formSizingColumn'>
                      <Col className='p-b-3' lg={12}>
                        <Row>
                          <label>
                            State
                          </label>
                          <ReduxFormSelect field={formFields.state} />
                        </Row>
                      </Col>
                    </FormGroup>
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
                  <Col sm={6}>
                    <ReduxFormInput field={formFields.kwFirstName} />
                  </Col>
                  <Col sm={6}>
                    <ReduxFormInput field={formFields.kwLastName} />
                  </Col>
                </Row>
              </Col>
            </FormGroup>
            <FormGroup controlId="formSizingColumn">
              <Col sm={12}>
                <Row>
                  <Col sm={6}>
                    <ReduxFormInput field={formFields.kwAddress} />
                  </Col>
                  <Col sm={6}>
                    <ReduxFormInput field={formFields.kwCity} />
                  </Col>
                </Row>
              </Col>
            </FormGroup>
            <FormGroup controlId="formSizingColumn">
              <Col sm={12}>
                <Row>
                  <Col sm={4}>
                    <label>
                      State
                    </label>
                    <ReduxFormSelect field={formFields.kwState} />
                  </Col>
                  <Col sm={4}>
                    <ReduxFormInput field={formFields.kwZipcode} />
                  </Col>
                  <Col sm={4}>
                    <ReduxFormInput field={formFields.dob} />
                  </Col>
                </Row>
              </Col>
            </FormGroup>
          </Row>
          <button
            className='btn btn-primary btn-lg pull-right m-b-2'
            disabled={invalid || disableButton}
            action="submit"
          >
            {renderbuttonLabel}
          </button>
        </form>
      </Col>
    </Row>
  )
}

ClientRegistrationForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  type: PropTypes.string,
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  initialValues: PropTypes.object
}

ClientRegistrationForm = reduxForm({
  form: 'ClientRegistrationForm',  // a unique identifier for this form
  validate           // <--- validation function given to redux-form
})(ClientRegistrationForm)

export default ClientRegistrationForm
