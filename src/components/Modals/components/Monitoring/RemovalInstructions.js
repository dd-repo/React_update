import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  Button
} from 'components';

const RemovalInstructions = ({ hideModal }) => (
  <Modal  show={true} onHide={hideModal}>
    <Modal.Header>
      <Modal.Title>
        Requesting a Removal
      </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      To request a removal click on the Request Removal button next to the site you would like to have your information removed from.
      You can only have up to 3 Requests In Progress. You can queue up all other requests and when we successfully complete a removal we will automatically
      move a queued request to In Progress.
    </Modal.Body>

    <Modal.Footer>
      <Button onClick={hideModal}>Get Started!</Button>
    </Modal.Footer>
  </Modal>
)

RemovalInstructions.propTypes = {
  hideModal: PropTypes.func
}

export default connect()(RemovalInstructions);


