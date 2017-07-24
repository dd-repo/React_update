import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import DatePicker from 'react-bootstrap-date-picker';

import { checkValidation } from 'utils/formHelpers';
import { formatDate } from 'utils/dateHelper';

import {
    Col,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'components';

const validate = values => {
  return checkValidation(values)
}

const startDate = new Date().toISOString();

const plan = [
  {
    type: 'individual',
    id: 2
  }
]

const dropDownSelect = ({ input, title, children, meta: {touched, error} }) => (
  <FormControl className='m-b-1' {...input} componentClass='select'>
    <option value=''>Select a {title}...</option>
    { children }
    {touched && error && <span>{error}</span>}
  </FormControl>
)

const renderDatePicker = ({input, placeHolder, meta: {touched, error} }) => (
  <div>
    <DatePicker
      {...input}
      minDate={startDate}
      dateFormat='MM/DD/YYYY'
      placeHolder='Select a start date'
    />
    {touched && error && <span>{error}</span>}
  </div>
)

const NewSubscriptionForm = props => {


  return (
    <Form onSubmit={props.handleSubmit(props._onSubmit)} horizontal>
      <FormGroup>
        <Col componentClass={ControlLabel} sm={3}>
          Plan
        </Col>
        <Col sm={9}>
          <Field
            name='plan_id'
            component={dropDownSelect}
            title='plan'
          >
            {
              plan.map((plan, i) => (
                <option value={plan.id} key={i}>{plan.type}</option>
                ))
            }
          </Field>
        </Col>
        <Col componentClass={ControlLabel} sm={3}>
          Sales Rep
        </Col>
        <Col sm={9}>
          <Field
            name='sales_rep_id'
            component={dropDownSelect}
            title='Sale Rep'
          >
            {
              props.salesRep.map(user => (
                <option value={user.id} key={user.id}>{user.first_name} {user.last_name}</option>
                ))
            }
          </Field>
        </Col>
        <Col componentClass={ControlLabel} sm={3}>
          Cards
        </Col>
        <Col sm={9}>
          <Field
            name='card_id'
            component={dropDownSelect}
            title='card'
          >
            {
              props.cards.map((card, i) => (
                <option value={card.id} key={i}>Last 4 - {card.last_4}  Date added - {formatDate(card.created_at)}</option>
                ))
            }
          </Field>
        </Col>
        <Col componentClass={ControlLabel} sm={3}>
          Payment Date
        </Col>
        <Col sm={9}>
          <Field
            name='next_payment'
            component={renderDatePicker}
          />
        </Col>
      </FormGroup>
      <Button
        bsStyle='primary'
        disabled={props.pristine || props.invalid || props.submitting}
        type='submit'>
        Save
      </Button>
    </Form>
  )
}

const reduxSubscriptionNew = reduxForm({
  form: 'subscriptionNew',
	validate
})(NewSubscriptionForm)

export default reduxSubscriptionNew;

