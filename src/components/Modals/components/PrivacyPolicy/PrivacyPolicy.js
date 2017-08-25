import React from 'react';
import { Modal, Button } from 'components';
import PrivacyPolicy from 'routes/Pages/PrivacyPolicy/PrivacyPolicy';

const PrivacyPolicyModal = props => (
  <Modal
    bsSize='large'
    show={true}
    onHide={ props.hideModal }
  >
    <Modal.Header>
      <Modal.Title>Privacy Policy</Modal.Title>
    </Modal.Header>
    <Modal.Body>

      <PrivacyPolicy />

      <Modal.Footer>
        <Button bsStyle='primary' onClick={props.hideModal}>Close</Button>
      </Modal.Footer>

    </Modal.Body>
  </Modal>
)

export default PrivacyPolicyModal;

