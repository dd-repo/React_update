import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { updateAccount } from 'routes/admin/Dashboard/User/modules/account';

import {
    Col,
    Modal,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'components';

const renderInput = ({ input, type }) => {
  return (
    <FormControl
      {...input}
      type={type}
    />
  )
}

const UpdateAccount = props => {

  const _onSubmit = (data) => {
    props.hideModal()
    props.dispatch(updateAccount(data))
  }

  return (
    <Modal show={ true } onHide={props.hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          { 'Edit Account ' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={props.handleSubmit(_onSubmit)} horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>
              First Name
            </Col>
            <Col sm={9}>
              <Field
                name='first_name'
                type='text'
                component={renderInput}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>
              Last Name
            </Col>
            <Col sm={9}>
              <Field
                name='last_name'
                type='text'
                component={renderInput}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>
              Email
            </Col>
            <Col sm={9}>
              <Field
                name='email'
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
  form: 'accountEdit',
  enableReinitialize: true
})(UpdateAccount)

export default connect()(reduxUserEdit);
