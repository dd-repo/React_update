import React from 'react';

import { FormGroup } from 'components';
import classes from './keywords.scss';

const AddressForm = ({ fields, renderField, handleSubmit, renderNextForm, invalid, submitting}) => {
  return (
    <form onSubmit={handleSubmit(renderNextForm)}>
      <FormGroup>
        <label>
          Address
        </label>
        {renderField(fields.address)}
      </FormGroup>
      <FormGroup>
        <label>
          City
        </label>
        {renderField(fields.city)}
      </FormGroup>
      <FormGroup>
        <label>
          State
        </label>
        {renderField(fields.state)}
      </FormGroup>
      <FormGroup>
        <label>
          Zipcode
        </label>
        {renderField(fields.zipcode)}
      </FormGroup>
      <button
        className="btn btn-success"
        disabled={invalid || submitting}
        action="submit">
        Protect Address
      </button>
    </form>
  )
}

export default AddressForm;
