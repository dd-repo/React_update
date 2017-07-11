import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import {
    Col,
    Modal,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button,
    Divider
} from 'components';

const renderInput = ({ input, type }) => {
  return (
    <FormControl
      {...input}
      type={type}
    />
  )
}

const AddressEditModal = props => {

  const _onSubmit = (data) => {
    props.submitForm(data, 'address', 'patch')
  }

  return (
    props.initialValues ?
      <Modal show={ props.show } onHide={() => { props.toggleModal('addressEditModal', false) }}>
        <Modal.Header closeButton>
          <Modal.Title>
            { 'Edit Address' }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={props.handleSubmit(_onSubmit)} horizontal>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Street
              </Col>
              <Col sm={9}>
                <Field
                  name='address1'
                  type='text'
                  component={renderInput}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                City
              </Col>
              <Col sm={9}>
                <Field
                  name='city'
                  type='text'
                  component={renderInput}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                State
              </Col>
              <Col sm={9}>
                <Field
                  name='state'
                  type='text'
                  component={renderInput}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Zip
              </Col>
              <Col sm={9}>
                <Field
                  name='zip'
                  type='text'
                  component={renderInput}
                />
              </Col>
            </FormGroup>
          <Modal.Footer>
            <Button onClick={() => { props.toggleModal('addressEditModal', false) } }>Close</Button>
            <Button bsStyle='primary' type='submit'>Save</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
      :
        <div></div>
  );
}

AddressEditModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func
};

AddressEditModal.defaultProps = {
    onClose: () => { }
};

const reduxUserEdit = reduxForm({
  form: 'addressesEdit',
  enableReinitialize: true
})(AddressEditModal)

export default reduxUserEdit;

