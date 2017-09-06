import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { formatDate } from 'utils';

import {
    Col,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Button
} from 'components';

const STATUS = [
  {
    status: 'Active',
    is_active: true
  },
  {
    status: 'Canceled',
    is_active: false
  }
]

const UpdateSubscriptionForm = props => {

  const dropDownSelect = ({ input, title, children }) => (
    <FormControl className='m-b-1' {...input} componentClass='select'>
      { children }
    </FormControl>
  )

  return (
    <Form onSubmit={props.handleSubmit(props._onSubmit)} horizontal>
      <FormGroup>
        <Col componentClass={ControlLabel} sm={3}>
          Status
        </Col>
        <Col sm={9}>
          <Field
            name='is_active'
            component={dropDownSelect}
            title='status'
          >
            {
              STATUS.map((item, i) => (
                <option value={item.is_active} key={i}>{item.status}</option>
                ))
            }
          </Field>
        </Col>
        <Col className='m-t-1' componentClass={ControlLabel} sm={3}>
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
                <option value={card.id} key={i}>Last 4 - {card.last_4}  Date add - {formatDate(card.created_at)}</option>
                ))
            }
          </Field>
        </Col>
      </FormGroup>
      <Button
        bsStyle='primary'
        type='submit'>
        Save
      </Button>
    </Form>
  )
}

const reduxSubscriptionEdit = reduxForm({
  form: 'subscriptionEdit',
  enableReinitialize: true
})(UpdateSubscriptionForm)

export default reduxSubscriptionEdit;
