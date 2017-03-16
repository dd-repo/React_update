import React from 'react';

import { FormGroup } from 'components';
import classes from './keywords.scss';

const DateOfBirthForm = ({ fields, renderField, handleSubmit, submitForm, invalid, submitting}) => {
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <FormGroup>
        <label>
          Address
        </label>
        {renderField(fields.dob)}
      </FormGroup>
      <button
        className="btn btn-success"
        disabled={invalid || submitting}
        action="submit">
        Protect Date of Birth
      </button>
    </form>
  )
}

export default DateOfBirthForm;

