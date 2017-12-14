import React from 'react'
import { connect } from 'react-redux'
import { buildCreditCardParams } from 'utils/paramsHelper'

import { PaymentForm } from 'components/Forms'
import { 
  addCard,
  ADD_CARD_SUCCESS
} from 'routes/admin/Users/Client/modules/cards'
import { 
  clearNotification
} from 'routes/admin/Users/Client/modules/notifications'
import { Modal, Alert } from 'components'
import classes from './cardModal.scss'


const CardModal = props => {
  const _onSubmit = (data) => {
    props.notification.message && _clearNotification()
    props.dispatch(addCard(buildCreditCardParams(data), props.user.id))
    .then(res => handleResponse(res))
  }

  const handleModalClose = () => {
    props.hideModal()
    props.notification.message && _clearNotification()
  }

  const handleResponse = res => {
    switch (res.type) {
      case ADD_CARD_SUCCESS:
        handleModalClose()
    }
  }

  const _clearNotification = () => {
    props.dispatch(clearNotification())
  }

  const renderAlertMessage = (
    props.notification.message &&
      <Alert className={classes.alert} bsStyle={props.notification.status}>
        {props.notification.message}
      </Alert>
  )

  return (
    <Modal show onHide={handleModalClose}>
        {renderAlertMessage}
      <Modal.Header closeButton>
        <Modal.Title>
          {'Add Card '}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PaymentForm
          submitForm={_onSubmit}
          buttonLabel='Add Card'
        />
      </Modal.Body>
    </Modal>
  )
}

export default connect()(CardModal)
