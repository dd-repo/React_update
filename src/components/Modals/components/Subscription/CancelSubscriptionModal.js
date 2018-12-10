import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Button,
  Modal
} from 'components'

const CancelSubscription = props => {
  return (
    <Modal  show={true} onHide={props.hideModal}>
      <Modal.Header>
        <Modal.Title>Cancel Subscription</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to cancel your subscription?</p>
        <p>
          Once you cancel your subscription you can re-activate at any time by giving us a call
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.hideModal}>Close</Button>
        <Button bsStyle="danger" onClick={props.onSubmit}>Cancel Subscription</Button>
      </Modal.Footer>
    </Modal>
  )
}

CancelSubscription.propTypes = {
  hideModal: PropTypes.func.isRequired,
  cancelSubscription: PropTypes.func
}

export default CancelSubscription;


