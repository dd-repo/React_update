import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Field, reduxForm } from 'redux-form';

import { checkValidation } from 'utils/formHelpers';
import { ReduxFormSelect } from 'components/Forms/components';
import fields from 'consts/formFields';
import {
    FormGroup,
    FormControl,
    Col,
    Row,
    Checkbox,
    ControlLabel
} from 'components';

const DROPDOWN_MENU = {
  'group': {
    name: 'group',
    placeHolder: 'Select user group',
    list: [
      { label: 'frontend', value: 'frontend' },
      { label: 'backend', value: 'backend' }
    ]
  },
  'role': {
    name: 'role',
    placeHolder: 'Select user role',
    list: [
      { label: 'client', value: 'client'},
      { label: 'user', value: 'user'},
      { label: 'manager', value: 'manager'},
      { label: 'admin', value: 'admin'},
      { label: 'super admin', value: 'super_admin'},
    ]
  }
}

const roles = [
]

const validate = values => {
  return checkValidation(values, fields)
}

const dropDownSelect = ({ input }) => {
  const { name } = input


  return (
    <Select
      options={ DROPDOWN_MENU[[name]] }
      placeholder={`Select user ${name}`}
      name='role'
      searchable={false}
      clearable={false}
    />
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
          <strong>Opps!</strong> {error}
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
                    {renderField(fields.firstName)}
                  </Col>
                  <Col sm={ 6 }>
                    {renderField(fields.lastName)}
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
                    {renderField(fields.phoneNumber)}
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
                    <ReduxFormSelect
                      field={DROPDOWN_MENU['group']}
                    />
                  </Col>
                  <Col sm={ 6 }>
                    <label>
                      Role
                    </label>
                    <ReduxFormSelect
                      field={DROPDOWN_MENU['role']}
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

export default CreateUserForm;
