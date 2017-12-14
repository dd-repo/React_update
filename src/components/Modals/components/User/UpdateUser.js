import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { ReduxFormSelect, ReduxFormDatePicker } from 'components/Forms/components';
import formFields from 'consts/formFields';
import { updateUser } from 'routes/admin/Users/Client/modules/details';
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

const dropDownSelect = ({ input, title, children }) => (
  <FormControl {...input} componentClass='select'>
    { children }
  </FormControl>
)

const UpdateUser = props => {

  const _onSubmit = (data) => {
    const params = {
      active_until: data.active_until,
      is_active: data.is_active.label ? data.is_active.value : data.is_active,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      id: data.id,
      password: data.password
    }
    props.hideModal()
    props.dispatch(updateUser(params))
  }


  return (
    <Modal show={ true } onHide={props.hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          { 'Edit Subscriber ' }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={props.handleSubmit(_onSubmit)} horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>
              Status
            </Col>
            <Col sm={9}>
              <ReduxFormSelect
                field={formFields.status}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>
              Active Until
            </Col>
            <Col sm={9}>
              <ReduxFormDatePicker
                name='active_until'
              />
            </Col>
          </FormGroup>
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
            <Button onClick={props.hideModal}>Close</Button>
            <Button bsStyle='primary' type='submit'>Save</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

const reduxUserEdit = reduxForm({
  form: 'userEdit',
  enableReinitialize: true
})(UpdateUser)

export default connect()(reduxUserEdit);


