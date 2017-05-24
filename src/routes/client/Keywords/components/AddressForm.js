import React from 'react';

import { FormGroup, FormControl } from 'components';
import classes from './keywords.scss';
import states from 'utils/states';

const dropDownSelect = ({ input, meta: { touched, error}, children }) => (
  <FormControl {...input} componentClass='select'>
    <option value=''>Select a state...</option>
    { children }
  </FormControl>
)
const AddressForm = (props) => {
  const {
    Field,
    fields,
    renderField,
    handleSubmit,
    renderNextForm,
    invalid,
    submitting
  } = props

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
          >
            {
              states.map(
                state => <option value={state} key={state}>{state}</option>
                )
            }
          </Field>
        </FormGroup>
        <FormGroup>
        <label>
          Zipcode
        </label>
        {renderField(fields.zipcode)}
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
