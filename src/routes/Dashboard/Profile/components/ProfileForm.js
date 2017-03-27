import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import { connect } from 'routes/routedComponent';
import  Upload  from './Upload';
import { checkValidation, normalizePhone } from 'utils/formHelpers';
import {
  FormGroup,
  Form,
  Col,
  ControlLabel,
  FormControl
} from 'components';

const validate = values => {
  return checkValidation(values, fields)
}


const renderInput = ({ input, type }) => {
  return (
    <FormControl
      {...input}
      type={type}
      />
  )
  }

const ProfileForm = ({ submitForm, handleSubmit, onImageUpload, avatar }) => {
  return (
    <Form onSubmit={handleSubmit(submitForm)} horizontal>
      <FormGroup>
        <Col componentClass={ControlLabel} sm={3}>
          Avatar
        </Col>
        <Col sm={6}>
          <Field
            name='avatar'
            component={Upload}
            avatar={avatar}
            onImageUpload={onImageUpload}
          />
        </Col>
      </FormGroup>
      <FormGroup>
        <Col componentClass={ControlLabel} sm={3}>
          <span className='text-danger'> * </span>
          First Name
        </Col>
        <Col sm={6}>
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
        <Col sm={6}>
          <Field
            name='last_name'
            type='text'
            component={renderInput}
          />
        </Col>
      </FormGroup>
      <button className='btn btn-primary pull-right'>Update Profile</button>
    </Form>
  )
}

const reduxProfileForm = reduxForm({
  form: 'profileForm',
})(ProfileForm);

export default connect(
  state => ({
    initialValues: state.currentUser
  })
)(reduxProfileForm)
