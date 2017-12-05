import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { formatPrice } from 'utils'
import americanExpress from 'static/creditCards/American-Express.png'
import discover from 'static/creditCards/discover.png'
import masterCard from 'static/creditCards/mastercard.png'
import visa from 'static/creditCards/visa.png'
import formFields from 'consts/formFields'
import { checkValidation } from 'utils/formHelpers'

import {
  ReduxFormInput,
  ReduxFormSelect
} from '../components'
import {
  FormGroup,
  Col,
  Row,
  Alert,
  Label,
  Divider
} from 'components'
import classes from './paymentForm.scss'

const validate = values => {
  return checkValidation(values, formFields)
}

let PaymentForm = (props) => {
  const {
    submitForm,
    planPrice,
    invalid,
    handleSubmit,
    submitting,
    scrollTop,
    isFetching
  } = props

  const _onClick = () => {
    invalid && scrollTop()
  }

  const renderButtonLabel = isFetching
    ? 'Submitting payment...'
    : 'Start your free trial'

  return (
    <Row>
      <Col md={10}>
        <form
          onSubmit={handleSubmit(submitForm)}>
          <Row>
            <h4 className={classes.sectionTitle}>
              Credit Card
            </h4>
            <FormGroup controlId='formSizingColumn'>
              <Col lg={12}>
                <div className='m-b-1 text-center'>
                  <h5 className={classes.paymentIcons}>
                    Accepted Cards
                  </h5>
                  <div>
                    <img className={classes.creditCardImg} src={visa} />
                    <img className={classes.creditCardImg} src={masterCard} />
                    <img className={classes.creditCardImg} src={discover} />
                    <img className={classes.creditCardImg} src={americanExpress} />
                  </div>
                </div>
                <ReduxFormInput field={formFields.ccFullName} />
                <ReduxFormInput field={formFields.creditCardNumber} />
              </Col>
            </FormGroup>
            <FormGroup controlId='formSizingColumn'>
              <Col lg={12}>
                <Row>
                  <Col sm={6}>
                    <label>
                      Expiration
                    </label>
                    <div className={classes.inlineInputs}>
                      <ReduxFormSelect
                        className={classes.customSelect}
                        field={formFields.expirationMonth}
                      />
                      <ReduxFormSelect
                        className={classes.customSelect}
                        field={formFields.expirationYear} 
                      />
                    </div>
                  </Col>
                  <Col sm={6}>
                    <ReduxFormInput field={formFields.cvCode} />
                  </Col>
                </Row>
              </Col>
            </FormGroup>
          </Row>
          <Row className='m-b-3'>
            <h4 className={classes.sectionTitle}>
              Billing Address
            </h4>
            <Divider className='m-l-2'></Divider>
            <FormGroup controlId='formSizingColumn'>
              <Col lg={12}>
                <ReduxFormInput field={formFields.address} />
                <ReduxFormInput field={formFields.city} />
              </Col>
            </FormGroup>
            <FormGroup controlId='formSizingColumn'>
              <Col lg={12}>
                <Row>
                  <Col sm={6}>
                    <ReduxFormInput field={formFields.zipcode} />
                  </Col>
                  <Col sm={6}>
                    <label>
                      State
                    </label>
                    <ReduxFormSelect
                      className={classes.customSelect}
                      field={formFields.state}
                    />
                  </Col>
                </Row>
              </Col>
            </FormGroup>
          </Row>
          <span className='m-r-1'>
            <button className="btn btn-primary m-b-2"
              disabled={submitting}
              onClick={_onClick}
              action="submit"
            >
              {renderButtonLabel}
            </button>
          </span>
          <i className='fa fa-lock m-r-1' />
          Secure Server
        </form>
      </Col>
    </Row>
  )
}

PaymentForm.propTypes = {
  submitForm: PropTypes.func,
  planPrice: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  buttonLabel: PropTypes.string,
  scrollTop: PropTypes.func,
  isFetching: PropTypes.bool
}

PaymentForm.defaultProps = {
  buttonLabel: 'Start Subscription',
  submitForm: () => {}
}

PaymentForm = reduxForm({
  form: 'payment',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(PaymentForm)

export default PaymentForm
