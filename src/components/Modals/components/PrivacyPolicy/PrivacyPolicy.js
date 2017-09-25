import React from 'react';
import { Modal, Button, ScrollBarContainer } from 'components';
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
      <ScrollBarContainer
        style={{ maxHeight: '600px' }}
      >
      <PrivacyPolicy />
    </ScrollBarContainer>
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle='primary' onClick={props.hideModal}>Close</Button>
    </Modal.Footer>
  </Modal>
)

export default PrivacyPolicyModal;

