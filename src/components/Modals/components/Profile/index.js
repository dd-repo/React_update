import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import {
    Col,
    Modal,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'components';
import { updateProfile } from 'routes/admin/Users/Client/modules/profile';

const renderInput = ({ input, type }) => {
  return (
    <FormControl
      {...input}
      type={type}
    />
  )
}

const UpdateProfileModal = props => {

  const _onSubmit = (data) => {
    props.hideModal()
    props.dispatch(updateProfile(data))
  }

  return (
    <Modal show={true} onHide={props.hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          { 'Edit Profile ' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={props.handleSubmit(_onSubmit)} horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>
              Middle Name
            </Col>
            <Col sm={9}>
              <Field
                name='middle_name'
                type='text'
                component={renderInput}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>
              Madien Name
            </Col>
            <Col sm={9}>
              <Field
                name='maiden_name'
                type='text'
                component={renderInput}
              />
            </Col>
          </FormGroup>
          <Modal.Footer>
            <Button onClick={props.hideModal}>Close</Button>
            <Button bsStyle='primary' type='submit'>Save</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

const reduxUserEdit = reduxForm({
  form: 'profileEdit',
  enableReinitialize: true
})(UpdateProfileModal)

export default connect()(reduxUserEdit);
