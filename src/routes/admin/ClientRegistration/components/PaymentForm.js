import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'

import { checkValidation } from 'utils/formHelpers'
import formFields from 'consts/formFields'
import { ReduxFormSelect, ReduxFormInput, PlanSelect } from 'components/Forms/components'
import classes from './clientRegistration.scss'
import {
  FormGroup,
  Col,
  Row,
  Button,
  Divider
} from 'components'

const validate = values => {
  return checkValidation(values, formFields)
}

const PaymentForm = props => {
  return (
    <Row>
      <Col lg={12}>
        <form
          onSubmit={props.handleSubmit(props.handlePayment)}
        >
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
                    <PlanSelect name='plan' placeholder='Select plan...' />
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
          
          <Button
            bsStyle='primary'
            className='btn btn-primary btn-lg pull-right m-b-2'
            disabled={props.invalid || props.isFetching}
            type="submit"
          >
            Next
          </Button>
        </form>
      </Col>
    </Row>
  )
}

PaymentForm.propTypes = {
  handlePayment: PropTypes.func.isRequired,
  isFetching: PropTypes.bool
}

export default reduxForm({
  form: 'PaymentForm',
  validate
})(PaymentForm)
