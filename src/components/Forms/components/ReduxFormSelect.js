import React, { PropTypes } from 'react';
import Select from 'react-select';

import { Field } from 'redux-form';
import {
  FormGroup,
  FormControl
} from 'components'

const ReduxFormSelect = ({ field, searchable, clearable }) => {
  const {
    name,
    type,
    label,
    placeHolder,
    maxLength,
    list,
    normalize
  } = field

  return (
    <Field
      name={name}
      type={type}
      list={list}
      label={label}
      placeholder={placeHolder}
      component={renderSelect}
      seachable={searchable}
      clearable={clearable}
    />
  )
}

const renderSelect = props => {
  const {
    input: { name, onBlur, onChange, value },
    list,
    searchable,
    clearable,
    placeholder,
    meta: { touched, error }
  } = props

  let message = touched &&
    (
      error && <span className='text-danger'>
        <strong>Opps!</strong> {error}
    </span>
    )

  return (
    <div style={{width:'100%'}}>
      <Select
        options={list}
        value={value}
        placeholder={placeholder}
        onBlur={() => onBlur(value)}
        onChange={ val => onChange(val)}
        name={name}
        searchable={searchable}
        clearable={clearable}
      />
      { message }
    </div>
  )
}

ReduxFormSelect.defaultProps = {
  searchable: true,
  clearable: false,
  list: []
}

ReduxFormSelect.propTypes = {
  field: PropTypes.object.isRequired
}

export default ReduxFormSelect;
