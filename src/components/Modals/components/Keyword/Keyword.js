import React, { PropTypes } from 'react';

import { KeywordForm } from 'components/Forms';
import {
    Col,
    Modal,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'components';


const KeywordEditModal = props => {

  return (
      <Modal show={ true } onHide={props.hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            { 'Edit Keyword ' }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <KeywordForm
            hideModal={props.hideModal}
            onSubmit={props.onSubmit}
            initialValues={props.initialValues}
          />
        </Modal.Body>
      </Modal>
  );
}

export default KeywordEditModal;
