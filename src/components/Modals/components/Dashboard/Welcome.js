import React from 'react';
import faker from 'faker';

import { Modal, Button } from 'components';

const description = "Your dashboard provides a wealth of information about your online privacy. We’ll walk you through what each piece of data represents and what actions you need to take to secure your online information. To begin the tutorial, click start."

const DashboardWelcomeModal = props => {
  return (
    <Modal
      show={ true }
      onHide={props.hideModal}
      backdrop='static'
    >
        <Modal.Header closeButton>
          <Modal.Title>{ 'Welcome To Your InfoSweep Dashboard' }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { description }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.hideModal}>Skip</Button>
          <Button bsStyle="primary" onClick={props.handleClick}>Start</Button>
        </Modal.Footer>
      </Modal>
  )
}

export default DashboardWelcomeModal;
