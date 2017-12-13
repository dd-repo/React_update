import React from 'react';

import { FormGroup } from 'components';
import { ReduxFormInput } from 'components/Forms/components';
import classes from './keywords.scss';

const DateOfBirthForm = (props) => {
  const {
    formFields,
    renderField,
    handleSubmit,
    renderNextFormOrSubmit,
    invalid,
    submitting
  } = props

  return (
    <form onSubmit={handleSubmit(renderNextFormOrSubmit)}>
      <FormGroup>
        <ReduxFormInput field={formFields.dob} />
        <ReduxFormInput field={formFields.phoneNumber} />
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

