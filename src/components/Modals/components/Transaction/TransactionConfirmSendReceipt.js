import React from 'react'
import { Modal, Button } from 'components'
import { connect } from 'react-redux'
import infosweepApi from 'services/infosweepApi'
import {
  SEND_CLIENT_RECEIPT_SUCCESS,
  SEND_CLIENT_RECEIPT_FAILURE,
  CLIENT_RECEIPT_REQUEST
} from 'routes/admin/modules/receiptEmail'

const TransactionConfirmSendReceipt = ({ 
  initialValues: transaction,
  hideModal,
  userId,
  dispatch
}) => {

  const handleSendReceipt = () => {
    const params = {
      user_id: userId,
      transaction_id: transaction.id,
      subscription_id: transaction.subscription_id
    }

    infosweepApi.patch(CLIENT_RECEIPT_REQUEST, params)
      .then( response => dispatch({type: SEND_CLIENT_RECEIPT_SUCCESS} ))
      .catch( error => dispatch({type: SEND_CLIENT_RECEIPT_FAILURE, error} ))

    hideModal()
  }

  return (
    <Modal show={true} onHide={hideModal}>
      <Modal.Header>
        <Modal.Title>
          Please confirm your action to send {transaction.client_name} transaction number {transaction.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={hideModal}>Cancel</Button>
        <Button bsStyle="primary" onClick={handleSendReceipt}>Send Receipt</Button>
      </Modal.Footer>
    </Modal>
  )
}

const mapStateToProps = state => ({
  userId: state.client.details.id
})

export default connect(mapStateToProps)(TransactionConfirmSendReceipt)
