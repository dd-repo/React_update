import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { ButtonGroup, Button, Label } from 'components';
import { formatDate } from 'utils';

const Subscription = props => {

  const {
    client_name,
    user_id,
    id,
    start_date,
    end_date,
    cancel_date,
    is_active,
    plan_id,
    plan_description,
    card_id,
    sales_rep_name,
    next_payment
  } = props.subscription

  const isActive = is_active ? 'Active' : 'Canceled'

  const _onClick = () => {
    props.handleClick(props.subscription)
  }

  const salesRep = (
    sales_rep_name !== " " ? sales_rep_name : 'Web'
  )

  return (
    <tbody key={id}>
      <tr className='bg-gray-dark' key={id}>
        <td>
          { id }
        </td>
        <td>
          <Link to={`/admin/dashboard/users/client/${user_id}`}>
            { client_name }
          </Link>
        </td>
        <td>
          { user_id }
        </td>
        <td>
          { formatDate(start_date) }
        </td>
        <td>
          { formatDate(end_date) }
        </td>
        <td>
          { plan_id }
        </td>
        <td>
          { plan_description }
        </td>
        <td>
          { salesRep }
        </td>
        <td>
          { card_id }
        </td>
        <td>
          <Label
            outline
            className='text-uppercase'
            bsStyle={is_active ? 'success' : 'danger'}>
            { isActive }
          </Label>
        </td>
        <td>
          { formatDate(next_payment) }
        </td>
        {
          props.buttons.map((button, i) => (
            <td key={i}>
              <Button
                bsSize={button.size}
                bsStyle={button.style}
                onClick={() => button.onClick(props.subscription)}
              >
                { button.label }
              </Button>
            </td>
          ))
        }
      </tr>
    </tbody>
  )
}

Subscription.propTypes = {
  subscription: PropTypes.object,
  handleClick: PropTypes.func,
  button: PropTypes.object
}

export default Subscription
