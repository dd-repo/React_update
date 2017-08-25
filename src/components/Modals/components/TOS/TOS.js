import React from 'react';
import { Modal, Button } from 'components';
import TermsOfService from 'routes/Pages/TermsOfService/TermsOfService';

const TermsOfServiceModal = props => (
  <Modal
    bsSize='large'
    show={true}
    onHide={ props.hideModal }
  >
    <Modal.Header>
      <Modal.Title>Our Terms Of Service</Modal.Title>
    </Modal.Header>
    <Modal.Body>

      <TermsOfService />

      <Modal.Footer>
        <Button bsStyle='primary' onClick={props.hideModal}>Close</Button>
      </Modal.Footer>

    </Modal.Body>
  </Modal>
)

export default TermsOfServiceModal;

