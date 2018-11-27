import React from 'react'
import { reduxForm } from 'redux-form'

import {
  Row,
  Col,
  Form,
  FormGroup,
  Button
} from 'components'
import formFields from 'consts/formFields'
import { 
  ReduxFormSelect,
  ReduxFormDatePicker,
  AdminSelect
} from '../components'
import { formatCreditCard } from 'utils'

const UpdateSubscriptionForm = props => {
  const formatSelectCard = {
    name: 'card_id',
    label: 'Cards',
    list: props.cards.map( card => ({
      label: formatCreditCard(card.last_4),
      value: card.id
    }))
  }

  return (
    <Form onSubmit={props.handleSubmit(props._onSubmit)} horizontal>
      <FormGroup controlId='formSizingColumn'>
        <Col lg={12}>
          <Row>
            <Col sm={6}>
              <label>
                Status
              </label>
              <ReduxFormSelect field={formFields.status} />
            </Col>
            <Col sm={6}>
              <label>
                Cards
              </label>
              <ReduxFormSelect field={formatSelectCard} />
            </Col>
          </Row>
          <label>
            Sales Rep
          </label>
          <AdminSelect />
          <label>
            Payment Start Date
          </label>
          <ReduxFormDatePicker
            name='next_payment'
            dateFormat='MM/DD/YYYY'
            placeHolder='Select a start date'
          />
        </Col>
      </FormGroup>
      <Button
        bsStyle='primary'
        type='submit'>
        Save
      </Button>
    </Form>
  )
}

const reduxSubscriptionEdit = reduxForm({
  form: 'subscriptionEdit',
  enableReinitialize: true
})(UpdateSubscriptionForm)

export default reduxSubscriptionEdit
