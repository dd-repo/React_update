import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import { checkValidation } from 'utils/formHelpers';
import formFields from 'consts/data/formFields';
import { ReduxFormSelect, ReduxFormDatePicker } from '../components';
import { fullName, formatDate, formatCreditCard } from 'utils';

import {
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'components';

const validate = values => {
  return checkValidation(values)
}

const NewSubscriptionForm = props => {
  const formatedCards = {
    name: 'card',
    list: props.cards.map( card => ({
      value: card.id, label: formatCreditCard(card.last_4)
    }))
  }

  const formatedSalesReps = {
    name: 'salesRep',
    list: props.salesReps.map( rep => ({
      value: rep.id, label: fullName(rep)
    }))
  }

  return (
    <Form onSubmit={props.handleSubmit(props._onSubmit)} horizontal>
      <FormGroup>
        <Row>
          <Col componentClass={ControlLabel} sm={3}>
            Plan
          </Col>
          <Col sm={8}>
            <ReduxFormSelect field={formFields.plan} />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col componentClass={ControlLabel} sm={3}>
            Sales Rep
          </Col>
          <Col sm={8}>
            <ReduxFormSelect field={formatedSalesReps} />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col componentClass={ControlLabel} sm={3}>
            Cards
          </Col>
          <Col sm={8}>
            <ReduxFormSelect field={formatedCards} />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col componentClass={ControlLabel} sm={3}>
            Payment Start Date
          </Col>
          <Col sm={8}>
            <ReduxFormDatePicker
              name='next_payment'
              dateFormat='MM/DD/YYYY'
              placeHolder='Select a start date'
            />
          </Col>
        </Row>
      </FormGroup>
      <Button
        bsStyle='primary'
        disabled={props.pristine || props.invalid || props.submitting}
        type='submit'>
        Save
      </Button>
    </Form>
  )
}

const reduxSubscriptionNew = reduxForm({
  form: 'subscriptionNew',
	validate
})(NewSubscriptionForm)

export default reduxSubscriptionNew;
