import React from 'react';

import { FormGroup } from 'components';
import classes from './keywords.scss';

const DateOfBirthForm = (props) => {
  const {
    fields,
    renderField,
    handleSubmit,
    submitForm,
    invalid,
    submitting
  } = props

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <FormGroup>
        <label>
          Date of Birth
        </label>
        {renderField(fields.dob)}
      </FormGroup>
      <button
        className="full-width btn btn-success"
        disabled={invalid || submitting}
        action="submit">
        Protect Date of Birth
      </button>
    </form>
  )
}

export default DateOfBirthForm;

