import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import { connect } from 'routes/routedComponent';
import {
  checkValidation,
  normalizePhone,
} from 'utils/formHelpers';

import {
    FormGroup,
    FormControl,
    Col,
    Row,
    ControlLabel
} from 'components';

const fields = {
  first_name: {
    name: 'first_name',
    type: 'text',
    label: 'First name',
    placeHolder: 'Enter your first name...',
  },
  last_name: {
    name: 'last_name',
    type: 'text',
    label: 'Last name',
    placeHolder: 'Enter your last name',
  },
  email: {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeHolder: 'Enter your email...',
  },
  phone_number: {
    name: 'phone_number',
    type: 'tel',
    label: 'Phone number',
    placeHolder: 'Enter your phone number...',
    normalize: normalizePhone
  },
  group: {
    list: ['frontend', 'backend'],
    label: 'Group'
  },
  role: {
    list: ['client', 'admin'],
    label: 'Role'
  }
}

const validate = values => {
  return checkValidation(values, fields)
}

const dropDownSelect = ({ input }) => {
  const { name } = input
  const {
    list,
    label
  } = fields[[name]]


  return (
    <FormControl {...input} componentClass='select'>
      <option value=''>Select a {name}...</option>
      {list.map(item =>
                <option value={item} key={item}>{item}</option>
                )
      }
    </FormControl>
  )
}

const renderInput = (props) => {
  const {
    label,
    input,
    placeHolder,
    type,
    maxLength,
    meta: { touched, error, warning }
  } = props

  let message = touched &&
    (
      error &&
        <span className='text-danger'>
          <strong>
            Opps!
          </strong>
          {error}
        </span>
    )

    let validationState = touched && ( error && 'error') || null

    return (
      <FormGroup validationState={validationState}>
        <label>
          {label}
        </label>
        <FormControl {...input}
          placeholder={placeHolder}
          maxLength={maxLength}
          type={type} />
        {message}
      </FormGroup>
    )
}

const renderField = (props) => {
  const {
    name,
    type,
    label,
    maxLength,
    normalize
  } = props

  return (
    <Field
      name={name}
      type={type}
      label={label}
      component={renderInput}
      normalize={normalize}
      maxLength={maxLength}
    />
  )
}

let CreateUserForm = (props) => {
  const {
    isFetching,
    submitForm,
    handleSubmit,
    invalid,
    submitting
  } = props

  const buttonLabel = (
    isFetching ?
      'Creating User...'
        :
          'Create User'
  )
  return (
    <Row>
      <Col lg={ 12 }>
        <form onSubmit={handleSubmit(submitForm)}>
          <Row>
            <FormGroup controlId='formSizingColumn'>
              <Col lg={12}>
                <Row>
                  <Col sm={ 6 }>
                    {renderField(fields.first_name)}
                  </Col>
                  <Col sm={ 6 }>
                    {renderField(fields.last_name)}
                  </Col>
                </Row>
              </Col>
            </FormGroup>
            <FormGroup controlId="formSizingColumn">
              <Col sm={12}>
                <Row>
                  <Col sm={ 6 }>
                    {renderField(fields.email)}
                  </Col>
                  <Col sm={ 6 }>
                    {renderField(fields.phone_number)}
                  </Col>
                </Row>
              </Col>
            </FormGroup>
            <FormGroup controlId="formSizingColumn">
              <Col sm={12}>
                <Row>
                  <Col sm={ 6 }>
                    <label>
                      Group
                    </label>
                  <Field
                    name='group'
                    component={dropDownSelect}
                  />
                  </Col>
                  <Col sm={ 6 }>
                    <label>
                      Role
                    </label>
                  <Field
                    name='role'
                    component={dropDownSelect}
                  />
                  </Col>
                </Row>
              </Col>
            </FormGroup>
          </Row>
          <button
            className='btn btn-primary btn-lg pull-right m-t-2'
            disabled={invalid || submitting}
            action="submit"
          >
            { buttonLabel }
          </button>
        </form>
      </Col>
    </Row>
  )
}

CreateUserForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

CreateUserForm = reduxForm({
  form: 'createUserForm',
  validate
})(CreateUserForm)

CreateUserForm = connect(
  state => ({
    initialValues: state.createUserForm
  })
)(CreateUserForm)

export default CreateUserForm;
