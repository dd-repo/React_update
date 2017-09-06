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

const ProfileForm = ({
  submitForm,
  handleSubmit,
  onImageUpload,
  avatarPreview,
  driverLicensePreview,
  profile,
  isFetching,
}) => {

  const renderButtonLabel = !isFetching ? 'Update Profile' : 'Updating Profile...'

  return (
    <div>
      <Form onSubmit={handleSubmit(submitForm)} horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            Avatar
          </Col>
          <Col sm={6}>
            <Field
              name='avatar'
              label='Avatar'
              height={ 140 }
              width={ 140 }
              shape='circle'
              component={Upload}
              image={avatarPreview}
              onImageUpload={onImageUpload}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            Driver License
          </Col>
          <Col sm={6}>
            <Field
              name='driverLicense'
              label='Driver license'
              height={ 140 }
              width={ 240 }
              shape='rounded'
              component={Upload}
              image={driverLicensePreview}
              onImageUpload={onImageUpload}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            Middle name
          </Col>
          <Col sm={6}>
            <Field
              name='middle_name'
              type='text'
              component={renderInput}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            Maiden Name
          </Col>
          <Col sm={6}>
            <Field
              name='maiden_name'
              type='text'
              component={renderInput}
            />
          </Col>
        </FormGroup>
        <button className='btn btn-primary pull-right'>{renderButtonLabel}</button>
      </Form>
    </div>
  )
}

const reduxProfileForm = reduxForm({
  form: 'profileForm',
})(ProfileForm);

export default connect(
  state => ({
    initialValues: state.account.profile
  })
)(reduxProfileForm)
