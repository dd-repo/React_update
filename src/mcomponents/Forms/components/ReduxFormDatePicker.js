import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import DatePicker from 'react-bootstrap-date-picker';

const ReduxFormDatePicker = ({
  input,
  placeHolder,
  name,
  dateFormat,
}) => (
  <Field
    name={name}
    component={renderDatePicker}
    dateFormat={dateFormat}
    placeHolder={placeHolder}
  />
)

const renderDatePicker = ({
  input,
  dateFormat,
  placeHolder,
  meta: { touched, error }
}) => (
  <div>
    <DatePicker
      {...input}
      dateFormat={dateFormat}
      placeHolder={placeHolder}
    />
    {touched && error && <span>{error}</span>}
  </div>
)

ReduxFormDatePicker.defaultProps = {
  placeHolder: 'Select a date',
  dateFormat: 'MM/DD/YYYY'
}

ReduxFormDatePicker.propTypes = {
  placeHolder: PropTypes.string,
  dateFormat: PropTypes.string
}

export default ReduxFormDatePicker
