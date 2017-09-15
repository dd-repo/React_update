import React from 'react';

import { FormGroup, FormControl } from 'components';
import classes from './keywords.scss';
import { ReduxFormInput, ReduxFormSelect } from 'components/Forms/components';
import formFields from 'consts/formFields'

const AddressForm = (props) => {
  const {
    Field,
    renderField,
    handleSubmit,
    renderNextForm,
    invalid,
    submitting
  } = props

  return (
    <form onSubmit={handleSubmit(renderNextForm)}>
      <FormGroup>
        <ReduxFormInput field={formFields.address} />
      </FormGroup>
      <FormGroup>
        <ReduxFormInput field={formFields.city} />
      </FormGroup>
      <FormGroup>
        <label>
          State
        </label>
        <ReduxFormSelect field={formFields.state} />
        </FormGroup>
        <FormGroup>
          <ReduxFormInput field={formFields.zipcode} />
      </FormGroup>
      <button
        className="full-width btn btn-success"
        disabled={invalid || submitting}
        action="submit">
        Protect Address
      </button>
    </form>
  )
}

export default AddressForm;
