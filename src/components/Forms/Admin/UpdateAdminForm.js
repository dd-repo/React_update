import React, { PropTypes } from 'react';
import { ReduxFormSelect } from 'components/Forms/components';
import { reduxForm, Field } from 'redux-form';
import formFields from 'consts/data/formFields';
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
            field={formFields.status}
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
            field={formFields.role}
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


