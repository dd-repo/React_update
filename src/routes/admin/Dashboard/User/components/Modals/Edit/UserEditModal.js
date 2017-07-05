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

const EditUserModal = props => {

  const _onSubmit = (data) => {
    props.submitForm(data, 'user', 'patch')
  }

  return (
    !props.isFetching &&
      <Modal show={ props.show } onHide={() => { props.toggleModal('userEditModal', false) }}>
        <Modal.Header closeButton>
          <Modal.Title>
            { 'Edit Subscriber ' }
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
            <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>
                Password
              </Col>
              <Col sm={9}>
                <Field
                  name='password'
                  type='text'
                  component={renderInput}
                />
              </Col>
            </FormGroup>
            <Modal.Footer>
              <Button onClick={() => { props.toggleModal('userEditModal', false) } }>Close</Button>
              <Button bsStyle='primary' type='submit'>Save</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
);
}

EditUserModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func
};

EditUserModal.defaultProps = {
    onClose: () => { }
};

const reduxUserEdit = reduxForm({
  form: 'userEdit',
  enableReinitialize: true
})(EditUserModal)

export default reduxUserEdit;
