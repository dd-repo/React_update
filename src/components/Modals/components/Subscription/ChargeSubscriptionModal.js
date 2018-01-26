import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { Modal, Button, Form, FormGroup } from 'components'
import { ReduxFormSelect } from 'components/Forms/components'
import { formatDate } from 'utils'
import { createTransaction } from 'routes/admin/Users/Client/modules/transactions'
import { checkValidation } from 'utils/formHelpers'

const validate = values => {
  const errors = {}
  if (!values.type_of_deal) {
    errors.type_of_deal = 'Required'
  }
  return errors
}

const ChargeSubscription = props => {
  const { id, plan_description, next_payment } = props.initialValues

  const transactionTypes = {
    name: 'type_of_deal',
    label: 'Transaction type',
    list: [
      { label: 'Recurring', value: 'recurring' },
      { label: 'New', value: 'new' }
    ]
  }

  const _onSubmit = data => {
    props.hideModal()
    props.dispatch(createTransaction(data))
  }

  return (
    <Modal show >
      <Modal.Header>
        <Modal.Title>
          {'Confirmation'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <p>
            You are about to 
            <strong>charge</strong>
            the client's credit card for the {plan_description}.
            Please note, this will not impact the next scheduled payment
            date which is on {formatDate(next_payment)}.
          </p>
        <Form onSubmit={props.handleSubmit(_onSubmit)}>
          <FormGroup>
            <label>
              Select transaction type
            </label>
            <ReduxFormSelect field={transactionTypes} />
            <Modal.Footer>
              <Button bsStyle='primary' type='submit'>Continue</Button>
              <Button onClick={props.hideModal}>Exit</Button>
            </Modal.Footer>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

const reduxChargeSubscription = reduxForm({
  form: 'chargeSubscription',
  validate                // <--- validation function given to redux-form
})(ChargeSubscription)

export default connect()(reduxChargeSubscription)
