import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { updateUser } from 'routes/admin/Dashboard/User/modules/user';

import {
    Col,
    Modal,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'components';

const STATUS = [
  {
    status: 'Active',
    is_active: true
  },
  {
    status: 'Inactive',
    is_active: false
  }
]

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
    props.hideModal()
    props.dispatch(updateUser(data))
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
              <Field
                name='is_active'
                component={dropDownSelect}
              >
                {
                  STATUS.map((item, i) => (
                    <option value={item.is_active} key={i}>{item.status}</option>
                    ))
                }
              </Field>
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
