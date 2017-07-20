import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { Button, Label } from 'components';
import { formatDate } from 'utils/dateHelper';

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
  } = props.subscription

  const isActive = is_active ? 'Active' : 'Canceled'

  const _onClick = () => {
    props.handleClick(props.subscription)
  }

  const renderButton = (
      <Button
        bsSize={props.button.size}
        bsStyle={props.button.style}
        onClick={_onClick}
      >
        { props.button.label }
      </Button>
  )

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
          { renderButton }
        </td>
      </tr>
    </tbody>
  )
}

Subscription.propTypes = {
  subscription: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  button: PropTypes.object
}

export default Subscription
