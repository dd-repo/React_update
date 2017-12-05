import React, { PropTypes } from 'react'
import Select from 'react-select'

import { Field } from 'redux-form'

const ReduxFormSelect = ({ field, searchable, clearable, customStyle }) => {
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
      customStyle={customStyle}
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
    customStyle,
    meta: { touched, error }
  } = props

  let message = touched &&
    (
      error && <span className='text-danger'>
        <strong>Opps!</strong> {error}
    </span>
    )

  return (
    <div style={{width: '100%'}}>
      <Select
        options={list}
        value={value}
        placeholder={placeholder}
        inputProps={{readOnly: true}}
        onChange={val => onChange(val)}
        name={name}
        searchable={searchable}
        clearable={clearable}
        style={customStyle}
      />
      {message}
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

export default ReduxFormSelect
