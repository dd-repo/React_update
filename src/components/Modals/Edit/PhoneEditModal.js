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
import formFields from 'consts/data/formFields'

const renderInput = ({ input, type, maxLength }) => {
  return (
    <FormControl
      {...input}
      type={type}
      maxLength={maxLength}
    />
  )
}

const PhoneEditModal = props => {
  const { name, type, label, maxLength, normalize } = formFields.phoneNumber

  const _onSubmit = (data) => {
    props.submitForm(data, 'phone', 'patch')
  }

  return (
    props.initialValues ?
      <Modal show={ props.show } onHide={() => { props.toggleModal('phoneEditModal', false) }}>
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
              <Button onClick={() => { props.toggleModal('phoneEditModal', false) } }>Close</Button>
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

