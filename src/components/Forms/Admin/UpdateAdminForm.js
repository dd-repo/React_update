import React, { PropTypes } from 'react';
import { ReduxFormSelect } from 'components/Forms/components';
import { reduxForm, Field } from 'redux-form';
import {
  Row,
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

const status = {
  name: 'is_active',
  list: [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false }
  ]
}

const role = {
  name: 'role',
  list: [
    { label: 'user', value: 'user'},
    { label: 'manager', value: 'manager'},
    { label: 'admin', value: 'admin'},
    { label: 'super admin', value: 'super_admin'},
  ]
}

const renderInput = ({ input, type }) => {
  return (
    <FormControl
      {...input}
      type={type}
    />
  )
}

const AdminUpdateForm = props => (
  <Form onSubmit={props.handleSubmit(props.onSubmit)}>
    <FormGroup>
      <Row>
        <Col componentClass={ControlLabel} sm={3}>
          Status
        </Col>
        <Col sm={9}>
          <ReduxFormSelect
            field={status}
          />
        </Col>
      </Row>
    </FormGroup>
    <FormGroup>
      <Row>
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
      </Row>
    </FormGroup>
    <FormGroup>
      <Row>
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
      </Row>
    </FormGroup>
    <FormGroup>
      <Row>
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
      </Row>
    </FormGroup>
    <FormGroup>
      <Row>
        <Col componentClass={ControlLabel} sm={3}>
          Role
        </Col>
        <Col sm={9}>
          <ReduxFormSelect
            field={role}
          />
        </Col>
      </Row>
    </FormGroup>
    <FormGroup>
      <Row>
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
      </Row>
    </FormGroup>
    <Modal.Footer>
      <Button onClick={props.hideModal}>Close</Button>
      <Button bsStyle='primary' type='submit'>Save</Button>
    </Modal.Footer>
  </Form>
)

const reduxAdminEdit = reduxForm({
  form: 'adminEdit',
  enableReinitialize: true
})(AdminUpdateForm)

export default reduxAdminEdit;


