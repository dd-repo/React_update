import React, { PropTypes } from 'react';
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

const renderInput = ({ input, type }) => {
  return (
    <FormControl
      {...input}
      type={type}
    />
  )
}

const PhoneEditModal = props => {

  const _onSubmit = (data) => {
    props.submitForm(data, 'phone')
  }

  return (
    props.initialValues ?
      <Modal show={ props.show } onHide={() => { props.toggleModal('phone', false) }}>
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
                  type='text'
                  component={renderInput}
                />
              </Col>
            </FormGroup>
            <Modal.Footer>
              <Button onClick={() => { props.toggleModal('phone', false) } }>Close</Button>
              <Button bsStyle='primary' type='submit'>Save</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
        :
          <div></div>
  );
}

PhoneEditModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func
};

PhoneEditModal.defaultProps = {
    onClose: () => { }
};

const reduxPhoneEdit = reduxForm({
  form: 'phoneEdit',
  enableReinitialize: true
})(PhoneEditModal)

export default reduxPhoneEdit;

