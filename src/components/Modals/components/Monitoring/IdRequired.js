import React from 'react'
import { connect } from 'react-redux';

import { Modal, Button } from 'components'
import Documents from 'routes/client/Account/components/Documents'

const IdRequired = ({ modalProps: potentialRisk, hideModal }) => {
  const styles = {
    marginBottom: '50px'
  }
  return (
    <Modal show={true} onHide={hideModal} backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>
          Removing from {potentialRisk.site} requires a driver license
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={styles}>
          You can upload your driver license here
          <Documents />
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default IdRequired
