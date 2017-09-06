import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { formatPrice } from 'utils';

import formFields from 'consts/data/formFields';
import { checkValidation } from 'utils/formHelpers';
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
} from 'components';
import classes from './paymentForm.scss';

const validate = values => {
  return checkValidation(values, formFields)
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

  const renderErrorMessage = (
    errorMessage &&
      <Alert className='m-r-2 m-l-2 text-center' bsStyle='danger'>
        <i className="fa fa-fw text-danger"></i>
        <strong>Transaction Failed:</strong> {errorMessage} - If you need help, please call us at (844) 641-7829
      </Alert>
  )

  return(
    <form
      onSubmit={handleSubmit(submitForm)}>
      <Row>
        { renderErrorMessage }
        {
          props.planType && <div className='text-center'>
            <Label outline bsStyle='primary'>
              { props.planType }
            </Label>
            <div>
              <p className={ classes.price }>
                { formatPrice(props.planPrice) }
              </p>
              <p>
                / Month
              </p>
            </div>
          </div>
          }
          <Divider>
            <h4 className='m-l-2'>
              Credit Card
            </h4>
          </Divider>

          <FormGroup controlId='formSizingColumn'>
            <Col lg={12}>
              <div className='m-b-1 text-center'>
                <h5 className={ classes.paymentOtherLabel }>
                  Accepted Cards
                </h5>
                <div>
                  <i className="fa fa-fw fa-cc-visa fa-2x m-r-1 text-white"></i>
                  <i className="fa fa-fw fa-cc-mastercard fa-2x m-r-1 text-white"></i>
                  <i className="fa fa-fw fa-cc-discover fa-2x m-r-1 text-white"></i>
                  <i className="fa fa-fw fa-cc-amex fa-2x m-r-1 text-white"></i>
                </div>
              </div>
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
          <FormGroup controlId='formSizingColumn'>
            <Col lg={12}>
              <Row>
                <Col sm={6}>
                  <label>
                    Expiration
                  </label>
                  <div className={ classes.inlineInputs }>
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
            <h4 className='m-l-2'>
              Billing Address
            </h4>
          </Divider>
          <FormGroup controlId='formSizingColumn'>
            <Col lg={12}>
              <Row>
                <Col sm={8}>
                  <ReduxFormInput field={formFields.address} />
                </Col>
                <Col sm={4}>
                  <ReduxFormInput field={formFields.city} />
                </Col>
              </Row>
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
                  <ReduxFormSelect field={formFields.state} />
                </Col>
              </Row>
            </Col>
          </FormGroup>
        </Row>
        <p>
          All major credit cards are accepted through a secure payment process
        </p>
        <button className="full-width btn btn-success"
          disabled={submitting}
          action="submit">
          { renderButtonLabel }
        </button>
      </form>
  )
}

PaymentForm.propTypes = {
  submitForm: PropTypes.func
}

PaymentForm.defaultProps = {
  buttonLabel: 'Start Subscription',
  submitForm: () => {}
}

PaymentForm = reduxForm({
  form: 'payment',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(PaymentForm);

export default PaymentForm;
