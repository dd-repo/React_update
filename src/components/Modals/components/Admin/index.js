import React from 'react';
import PropTypes from 'prop-types';
import { UpdateAdminForm } from 'components/Forms';
import { Modal } from 'components';

const UpdateAdminModal = props => (
  <Modal show={ true } onHide={props.hideModal}>
    <Modal.Header closeButton>
      <Modal.Title>
        { 'Edit Admin ' }
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <UpdateAdminForm
        hideModal={props.hideModal}
        onSubmit={props.onSubmit}
        initialValues={props.initialValues}
      />
    </Modal.Body>
  </Modal>
)

export default UpdateAdminModal;
