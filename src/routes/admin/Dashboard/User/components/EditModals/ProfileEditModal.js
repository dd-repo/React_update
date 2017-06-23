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

const ProfileEditModal = props => {
  return (
    props.initialValues ?
      <Modal show={ props.show } onHide={() => { props.toggleModal('profile', false) }}>
        <Modal.Header closeButton>
          <Modal.Title>
            { 'Edit Profile ' }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={props.handleSubmit(props.submitForm)} horizontal>
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
              <Button onClick={() => { props.toggleModal('profile', false) } }>Close</Button>
              <Button bsStyle='primary' type='submit'>Save</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      :
        <div></div>
);
}

ProfileEditModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func
};

ProfileEditModal.defaultProps = {
    onClose: () => { }
};

const reduxUserEdit = reduxForm({
  form: 'profileEdit',
  enableReinitialize: true
})(ProfileEditModal)

export default reduxUserEdit;

