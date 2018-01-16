import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { updateUserStatus } from 'routes/admin/Users/Client/modules/details'
import {
    Col,
    Modal,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'components';

const UpdateUserStatus = props => {

  const _onSubmit = () => {
    props.hideModal()
    props.dispatch(updateUserStatus(props.user))
  }

  return (
    <Modal show={ true } onHide={props.hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          { 'Warning' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          Changing this Client's status to in-active will clear all of their monitoring requests back to pending
        </div>
          <Modal.Footer>
            <Button onClick={props.hideModal}>Close</Button>
            <Button onClick={_onSubmit} bsStyle='primary' type='submit'>Continue</Button>
          </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}

export default connect()(UpdateUserStatus)


