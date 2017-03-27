import React from 'react';
const { DOM: { select } } = React;

import { FormGroup, FormControl } from 'components';
import classes from './keywords.scss';
import states from 'utils/states';

const dropDownSelect = ({ input }) => (
  <FormControl {...input} componentClass='select'>
    <option value=''>Select a state...</option>
    {states.map(state =>
                <option value={state} key={state}>{state}</option>
                )
    }
  </FormControl>
)
const AddressForm = ({ Field, fields, renderField, handleSubmit, renderNextForm, invalid, submitting}) => {
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
          <Field
            name='state'
            component={dropDownSelect}
          />
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
