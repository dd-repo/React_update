import React from 'react'
import { connect } from 'react-redux'
import { buildCreditCardParams } from 'utils/paramsHelper'

import { PaymentForm } from 'components/Forms'
import { 
  addCard,
  ADD_CARD_SUCCESS
} from 'routes/admin/Dashboard/Users/Client/modules/cards'
import { 
  clearNotification
} from 'routes/admin/Dashboard/Users/Client/modules/notifications'
import { Modal, Alert } from 'components'

const CardModal = props => {
  const _onSubmit = (data) => {
    props.dispatch(addCard(buildCreditCardParams(data), props.user.id))
    .then(res => handleResponse(res))
  }

  const handleModalClose = () => {
    props.hideModal()
    props.notification.message &&
      props.dispatch(clearNotification())
  }

  const handleResponse = res => {
    switch (res.type) {
      case ADD_CARD_SUCCESS:
        handleModalClose()
    }
  }

  const renderAlertMessage = (
    props.notification.message &&
      <Alert bsStyle={props.notification.status}>
        {props.notification.message}
      </Alert>
  )

  return (
    <Modal show onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {'Add Card '}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderAlertMessage}
        <PaymentForm
          submitForm={_onSubmit}
          buttonLabel='Add Card'
        />
      </Modal.Body>
    </Modal>
  )
}

export default connect()(CardModal)
