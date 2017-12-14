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
import formFields from 'consts/formFields'

import { updatePhone } from 'routes/admin/Users/Client/modules/phones';

const renderInput = ({ input, type, maxLength }) => {
  return (
    <FormControl
      {...input}
      type={type}
      maxLength={maxLength}
    />
  )
}

const UpdatePhoneModal = props => {
  const { name, type, label, maxLength, normalize } = formFields.phoneNumber

  const _onSubmit = (data) => {
    props.hideModal()
    props.dispatch(updatePhone(data))
  }

  return (
    <Modal show={true} onHide={props.hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          { 'Edit Phones ' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={props.handleSubmit(_onSubmit)} horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>
              Phone
            </Col>
            <Col sm={9}>
              <Field
                name='phone_number'
                type={type}
                component={renderInput}
                normalize={normalize}
                maxLength={maxLength}
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

const reduxPhoneEdit = reduxForm({
  form: 'phoneEdit',
  enableReinitialize: true
})(UpdatePhoneModal)

export default connect()(reduxPhoneEdit);
