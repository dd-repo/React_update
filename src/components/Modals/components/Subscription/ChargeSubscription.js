import React from 'react'
import { connect } from 'react-redux'

import { Modal, Button } from 'components'
import { ReduxFormSelect } from 'components/Forms/components'

const ChargeSubscription = props => {
  const transactionTypes = {
    name: 'deal_type',
    label: 'Transaction type',
    list: [
      { label: 'Recurring', value: 'recurring' },
      { label: 'New', value: 'new' }
    ]
  }
  const _onSubmit = data => {
    debugger
    props.hideModal()
  }

  return (
    <Modal show >
      <Modal.Header closeButton>
        <Modal.Title>
        <p>
          Confirmation: You are about to charge the client's credit card for the subscription amount.  Please note, this will not impact next scheduled payment date.
        </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={props.handleSubmit(_onSubmit)}>
          <FormGroup>
            <label>
              Select transaction type
            </label>
            <ReduxFormSelect field={transactionTypes} />
          </FormGroup>
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={_onClick}> Continue </Button>
        <Button onClick={props.hideModal}> Exit </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default connect()(ChargeSubscription)
