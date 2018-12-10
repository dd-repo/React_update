import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select'
import { Field } from 'redux-form'
import classes from './classes.scss'

const ReduxFormSelect = ({ field, searchable, clearable, className, customStyle }) => {
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
      className={className}
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
    className,
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
        className={className}
        options={list}
        value={value}
        placeholder={placeholder}
        onChange={val => onChange(val)}
        name={name}
        searchable={searchable}
        clearable={clearable}
        style={{}}
        menuStyle={{}}
        menuContainerStyle={{'background': 'white'}}
      />
      {message}
    </div>
  )
}

ReduxFormSelect.defaultProps = {
  searchable: true,
  clearable: false,
  list: [],
  className: classes.defaultStyles
}

ReduxFormSelect.propTypes = {
  field: PropTypes.object.isRequired
}

export default ReduxFormSelect
